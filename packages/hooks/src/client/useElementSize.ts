import { useLayoutEffect, useState } from "react";

export function useElementSize<T extends HTMLElement>(
  ref: React.RefObject<T>,
  bottomOffset?: number,
) {
  // const bottomOffset = 48
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const viewportH = window.visualViewport?.height ?? window.innerHeight;
      const rect = el.getBoundingClientRect();
      const bottom = bottomOffset ? bottomOffset : 0;

      const available = Math.max(0, Math.floor(viewportH - rect.top - bottom));

      setSize({
        width: Math.round(el.clientWidth),
        height: available,
      });
    };

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    if (el.parentElement) ro.observe(el.parentElement);

    const vv = window.visualViewport;
    vv?.addEventListener("resize", measure);
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);

    measure();

    return () => {
      ro.disconnect();
      vv?.removeEventListener("resize", measure);
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
    };
  }, [ref, bottomOffset]);

  return size;
}
