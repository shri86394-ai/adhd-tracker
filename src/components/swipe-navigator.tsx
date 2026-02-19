"use client";

import { useSwipeNavigation } from "@/hooks/use-swipe-navigation";

export function SwipeNavigator({ children }: { children: React.ReactNode }) {
  const { onTouchStart, onTouchEnd } = useSwipeNavigation();

  return (
    <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      {children}
    </div>
  );
}
