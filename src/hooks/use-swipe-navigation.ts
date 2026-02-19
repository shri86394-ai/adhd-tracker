"use client";

import { useCallback, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

const TAB_ORDER = ["/checkin", "/today", "/todos", "/stats"];
const SWIPE_THRESHOLD = 50;
const MAX_SWIPE_TIME = 300;

export function useSwipeNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const touchStart = useRef<{ x: number; y: number; time: number } | null>(
    null
  );

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStart.current) return;

      const touch = e.changedTouches[0];
      const dx = touch.clientX - touchStart.current.x;
      const dy = touch.clientY - touchStart.current.y;
      const elapsed = Date.now() - touchStart.current.time;

      touchStart.current = null;

      // Must be a quick, mostly-horizontal swipe
      if (elapsed > MAX_SWIPE_TIME) return;
      if (Math.abs(dx) < SWIPE_THRESHOLD) return;
      if (Math.abs(dy) > Math.abs(dx)) return;

      const currentIndex = TAB_ORDER.findIndex(
        (tab) => pathname === tab || pathname.startsWith(`${tab}/`)
      );
      if (currentIndex === -1) return;

      const nextIndex = dx < 0 ? currentIndex + 1 : currentIndex - 1;
      if (nextIndex < 0 || nextIndex >= TAB_ORDER.length) return;

      router.push(TAB_ORDER[nextIndex]);
    },
    [pathname, router]
  );

  return { onTouchStart, onTouchEnd };
}
