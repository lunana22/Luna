"use client";

import { useEffect, useRef, useState } from "react";

export function useAppScrollHide(
  id = "app",
  threshold = 50,
  topThreshold = 200,
  minDelta = 3, // 미세 움직임 무시할 최소 변화값
) {
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const app = document.getElementById(id);
    if (!app) return;

    lastScrollRef.current = app.scrollTop;

    const handleScroll = () => {
      const current = app.scrollTop;
      const lastScroll = lastScrollRef.current;
      const delta = current - lastScroll;

      const maxScroll = app.scrollHeight - app.clientHeight;
      const isBottom = current >= maxScroll - 1;

      // 스크롤 양이 너무 적으면 헤더는 무조건 보이도록 고정
      const hasEnoughScrollArea = maxScroll > topThreshold; // 필요하면 값 조절

      if (!hasEnoughScrollArea) {
        setAtTop(true);
        setHidden(false);
        lastScrollRef.current = current;
        return;
      }

      setAtTop(current <= topThreshold);

      if (Math.abs(delta) < minDelta) {
        lastScrollRef.current = current;
        return;
      }

      if (isBottom) {
        setHidden(true);
        lastScrollRef.current = current;
        return;
      }

      // 아래로 충분히 스크롤 + 일정 이상 내려갔으면 숨김
      if (delta > 0 && current > threshold) {
        setHidden(true);
      }
      // 위로 스크롤하면 다시 보이게
      else if (delta < 0) {
        setHidden(false);
      }

      lastScrollRef.current = current;
    };

    app.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      app.removeEventListener("scroll", handleScroll);
    };
  }, [threshold, topThreshold, minDelta]);

  return { hidden, atTop };
}
