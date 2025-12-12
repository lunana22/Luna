import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  // const get = () =>
  //   typeof window !== "undefined" && window.matchMedia(query).matches;

  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query);

    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);

    // 초기값 동기화
    setMatches(mql.matches);

    // 최신 브라우저
    mql.addEventListener?.("change", onChange);
    // 구형 브라우저(사파리 대응)
    mql.addListener?.(onChange);

    return () => {
      mql.removeEventListener?.("change", onChange);
      mql.removeListener?.(onChange);
    };
  }, [query]);

  return matches;
}
