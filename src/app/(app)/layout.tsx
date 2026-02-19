import { BottomNav } from "@/components/bottom-nav";
import { SwipeNavigator } from "@/components/swipe-navigator";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-background pb-20">
      <SwipeNavigator>
        <main>{children}</main>
      </SwipeNavigator>
      <BottomNav />
    </div>
  );
}
