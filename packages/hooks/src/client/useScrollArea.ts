import { useEffect, useLayoutEffect, useRef, useState } from "react";

interface useFadeScrollAreaProps {
  deps?: any[];
}
export function useScrollArea({ deps }: useFadeScrollAreaProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [hasScroll, setHasScroll] = useState(false);
  const [atBottom, setAtBottom] = useState(false);

  const [atRight, setAtRight] = useState(false);

  const update = () => {
    const el = ref.current;
    if (!el) return;

    const {
      scrollHeight,
      clientHeight,
      scrollTop,
      scrollLeft,
      scrollWidth,
      clientWidth,
    } = el;

    const scrollExists = scrollHeight > clientHeight;
    setHasScroll(scrollExists);

    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
    setAtBottom(isAtBottom);

    const isAtRight = scrollLeft + clientWidth >= scrollWidth - 1;

    setAtRight(isAtRight);
  };

  useEffect(() => {
    update();
  }, [deps]);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 첫 진입 한 번 더 안전하게
    const raf = requestAnimationFrame(() => {
      update();
    });

    // 스크롤 시마다 갱신
    const onScroll = () => {
      update();
    };
    el.addEventListener("scroll", onScroll);

    // 리사이즈/내용 변화 감지
    const ro = new ResizeObserver(() => {
      update();
    });
    ro.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [update, deps]);

  return {
    hasScroll,
    atBottom,
    atRight,
    ref,
  };
  //   return (
  //     <div className="relative">
  //       <div
  //         ref={ref}
  //         onScroll={update}
  //         style={{ maxHeight }}
  //         className="custom-scroll overflow-y-auto overflow-x-hidden"
  //       >
  //         {children}
  //       </div>

  //       {/* 🔥 스크롤 있을 때만 보여주고, 맨 아래에서는 숨김 */}
  //       <div
  //         className={cn(
  //           "absolute inset-x-0 bottom-0 h-8 fade-bottom transition-opacity duration-200",
  //           hasScroll && !atBottom ? "opacity-100" : "opacity-0"
  //         )}
  //       />
  //     </div>
  //   );
}
