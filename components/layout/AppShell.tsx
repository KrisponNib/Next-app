"use client";

import { usePathname } from "next/navigation";
import { BottomNav } from "./BottomNav";
import { PracticeAtmosphere } from "./PracticeAtmosphere";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (
    pathname === "/" ||
    pathname === "/thank-you" ||
    pathname === "/about" ||
    pathname === "/faq" ||
    pathname.startsWith("/drum-lessons") ||
    pathname === "/blog" ||
    pathname.startsWith("/blog/")
  ) {
    return <>{children}</>;
  }

  return (
    <>
      <PracticeAtmosphere />
      <main className="relative z-10 max-w-[760px] mx-auto px-[18px] pt-7">
        {children}
      </main>
      <BottomNav />
    </>
  );
}
