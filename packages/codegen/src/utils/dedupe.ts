/** 중복 이름 방지: Add, Add2, Add3 ... */
export function dedupe(names: string[]) {
  const seen = new Map<string, number>();
  return names.map((n) => {
    const c = seen.get(n) || 0;
    if (c === 0) {
      seen.set(n, 1);
      return n;
    }
    const next = `${n}${c + 1}`;
    seen.set(n, c + 1);
    return next;
  });
}
