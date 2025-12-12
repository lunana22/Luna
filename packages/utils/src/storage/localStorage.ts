// utils/storage.ts

export type StorageTarget = "local" | "session" | "memory";

type Persisted<T> = {
  v: T; // value
  e?: number; // expiresAt (ms epoch)
};

type Options<T> = {
  /** 항목 기본값 (미존재/만료 시 리턴) */
  defaultValue?: T;
  /** TTL(ms). 설정하면 set 시 만료시간이 기록됨 (예: 7일: 7*24*60*60*1000) */
  ttl?: number;
  /** 커스텀 직렬화/역직렬화 (기본: JSON) */
  serialize?: (data: Persisted<T>) => string;
  deserialize?: (raw: string) => Persisted<T> | undefined;
  /** 다른 탭과 변경사항 동기화 (localStorage ‘storage’ 이벤트/ BroadcastChannel) */
  sync?: boolean;
};

type API<T> = {
  get: () => T | undefined;
  set: (value: T, ttlMs?: number) => void;
  /** 부분 업데이트: 객체/배열에 적합 */
  patch: (partial: Partial<T> | ((prev: T | undefined) => T)) => void;
  remove: () => void;
  exists: () => boolean;
  /** 남은 만료 시간(ms), 없으면 undefined */
  ttlRemaining: () => number | undefined;
  /** 수동 만료 갱신(연장) */
  renew: (ttlMs: number) => void;
  /** 스토리지 변경 구독 (동일 key만) */
  subscribe: (cb: (value: T | undefined) => void) => () => void;
};

const isBrowser = typeof window !== "undefined";
const memStore = new Map<string, string>();

function pickStore(target: StorageTarget) {
  if (!isBrowser) return undefined as unknown as Storage; // SSR에선 직접 접근 금지
  if (target === "local") return window.localStorage;
  if (target === "session") return window.sessionStorage;
  return undefined as unknown as Storage;
}

const defaultSerialize = <T>(data: Persisted<T>) => JSON.stringify(data);
const defaultDeserialize = <T>(raw: string): Persisted<T> | undefined => {
  try {
    const obj = JSON.parse(raw);
    // 최소 형태 보장
    if (obj && "v" in obj) return obj as Persisted<T>;
  } catch {}
  return undefined;
};

function now() {
  return Date.now();
}

function isExpired(e?: number) {
  return typeof e === "number" && e > 0 && e <= now();
}

/**
 * createStorage: 네임스페이스+키로 안전한 스토리지 핸들러 생성
 */
export function createStorage<T>(
  key: string,
  target: StorageTarget = "local",
  opts: Options<T> = {},
): API<T> {
  const {
    defaultValue,
    ttl,
    serialize = defaultSerialize,
    deserialize = defaultDeserialize,
    sync = true,
  } = opts;

  const store = pickStore(target);
  const memKey = `__MEM__:${key}`;
  const bc = isBrowser && sync ? new BroadcastChannel(`storage:${key}`) : null;

  const readRaw = (): string | null => {
    if (!isBrowser || target === "memory") return memStore.get(memKey) ?? null;
    try {
      return store.getItem(key);
    } catch {
      return null;
    }
  };

  const writeRaw = (raw: string | null) => {
    if (!isBrowser || target === "memory") {
      if (raw === null) memStore.delete(memKey);
      else memStore.set(memKey, raw);
      return;
    }
    try {
      if (raw === null) store.removeItem(key);
      else store.setItem(key, raw);
    } catch {
      // quota exceeded 등 무시
    }
  };

  const encode = (v: T, ttlMs?: number) => {
    const record: Persisted<T> = {
      v,
      e: (ttlMs ?? ttl) ? now() + (ttlMs ?? ttl!) : undefined,
    };
    return serialize(record);
  };

  const decode = (): Persisted<T> | undefined => {
    const raw = readRaw();
    if (!raw) return undefined;
    return deserialize(raw);
  };

  const get = (): T | undefined => {
    const rec = decode();
    if (!rec) return defaultValue;
    if (isExpired(rec.e)) {
      remove();
      return defaultValue;
    }
    return rec.v ?? defaultValue;
  };

  const set = (value: T, ttlMs?: number) => {
    writeRaw(encode(value, ttlMs));
    bc?.postMessage({ type: "set" });
  };

  const patch = (partial: Partial<T> | ((prev: T | undefined) => T)) => {
    const prev = get();
    let next: T;
    if (typeof partial === "function") {
      next = (partial as any)(prev);
    } else if (Array.isArray(prev) && Array.isArray(partial)) {
      // 배열은 병합 전략 선택: 여기선 덮어쓰기 대신 합치기
      next = [...prev, ...(partial as any)] as unknown as T;
    } else if (typeof prev === "object" && prev != null) {
      next = { ...(prev as any), ...(partial as any) };
    } else {
      next = partial as T;
    }
    set(next);
  };

  const remove = () => {
    writeRaw(null);
    bc?.postMessage({ type: "remove" });
  };

  const exists = () => {
    const rec = decode();
    return !!rec && !isExpired(rec.e);
  };

  const ttlRemaining = () => {
    const rec = decode();
    if (!rec || !rec.e) return undefined;
    const rem = rec.e - now();
    if (rem <= 0) return 0;
    return rem;
  };

  const renew = (ttlMs: number) => {
    const rec = decode();
    if (!rec) return;
    if (isExpired(rec.e)) {
      remove();
      return;
    }
    writeRaw(serialize({ v: rec.v, e: now() + ttlMs }));
    bc?.postMessage({ type: "renew" });
  };

  const subscribers = new Set<(v: T | undefined) => void>();

  const subscribe = (cb: (v: T | undefined) => void) => {
    subscribers.add(cb);
    // 즉시 현재값 알림
    cb(get());

    // 탭 간 동기화
    const onBc = (e: MessageEvent) => {
      if (!e?.data) return;
      subscribers.forEach((fn) => fn(get()));
    };

    // storage 이벤트(localStorage만)로도 감지
    const onStorage = (e: StorageEvent) => {
      if (e.key !== key) return;
      subscribers.forEach((fn) => fn(get()));
    };

    bc?.addEventListener("message", onBc);
    if (isBrowser && target === "local" && sync) {
      window.addEventListener("storage", onStorage);
    }

    return () => {
      subscribers.delete(cb);
      bc?.removeEventListener("message", onBc);
      if (isBrowser && target === "local" && sync) {
        window.removeEventListener("storage", onStorage);
      }
    };
  };

  return { get, set, patch, remove, exists, ttlRemaining, renew, subscribe };
}

// 4) 사용법
// set/get
// userTokenStore.set("abc123");
// userTokenStore.get(); // "abc123"
// 부분 업데이트
// uiPrefStore.patch({ theme: "dark" });
// TTL 확인/연장
// userTokenStore.ttlRemaining();
// userTokenStore.renew(24*60*60*1000);
// 구독 (다른 탭 변경도 수신)
// const unsub = userTokenStore.subscribe((v) => console.log("changed:", v));
// unsub();
