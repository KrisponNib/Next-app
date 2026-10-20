"use client";

import { usePathname } from "next/navigation";
import { BottomNav } from "./BottomNav";
import { PracticeAtmosphere } from "./PracticeAtmosphere";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Only Omri's private app routes get the app chrome; every public page (and the 404 page) renders bare.
  const appRoutes = ["/dashboard", "/money", "/today", "/profile", "/wins", "/reflect", "/practice", "/lessons", "/students", "/student/"];
  const isApp = appRoutes.some((r) => pathname === r || pathname?.startsWith(r.endsWith("/") ? r : r + "/"));
  if (!isApp) {
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
