"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LEGACY_ITEMS = [
  { href: "/today", label: "היום" },
  { href: "/practice", label: "אימון" },
  { href: "/reflect", label: "למידה" },
  { href: "/wins", label: "הישגים" },
  { href: "/money", label: "כסף" },
  { href: "/profile", label: "פרופיל" },
];

export function BottomNav() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => setMoreOpen(false), [pathname]);
  if (pathname?.startsWith("/student/")) return null;

  const dashboardActive = pathname === "/";
  const studentsActive = pathname?.startsWith("/students");
  const legacyActive = LEGACY_ITEMS.some((item) => pathname?.startsWith(item.href));

  return (
    <>
      {moreOpen && (
        <div className="fixed inset-0 z-30 bg-black/20 backdrop-blur-[2px]" onClick={() => setMoreOpen(false)}>
          <div className="absolute inset-x-3 bottom-24 max-w-[720px] mx-auto bg-surface rounded-card shadow-card p-4 border border-line" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <div><p className="text-xs text-muted font-bold">כלים נוספים</p><h3 className="font-extrabold text-lg">המסכים הישנים</h3></div>
              <button onClick={() => setMoreOpen(false)} className="text-muted font-bold px-2 py-1">✕</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {LEGACY_ITEMS.map((item) => (
                <Link key={item.href} href={item.href} className="bg-surface-soft rounded-button-sm px-4 py-3 font-extrabold text-center">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <nav className="fixed inset-x-0 bottom-0 bg-bg/[.9] backdrop-blur-2xl border-t border-line py-2 px-3 pb-5 z-40">
        <div className="max-w-[760px] mx-auto grid grid-cols-3 gap-2">
          <Link href="/" className={`rounded-nav py-2.5 text-xs font-extrabold text-center ${dashboardActive ? "bg-surface text-text shadow-navActive" : "text-muted"}`}>
            <span className="block text-lg leading-none mb-1">{dashboardActive ? "●" : "○"}</span>
            דשבורד
          </Link>
          <Link href="/students" className={`rounded-nav py-2.5 text-xs font-extrabold text-center ${studentsActive ? "bg-surface text-text shadow-navActive" : "text-muted"}`}>
            <span className="block text-lg leading-none mb-1">{studentsActive ? "●" : "○"}</span>
            תלמידים
          </Link>
          <button onClick={() => setMoreOpen((v) => !v)} className={`rounded-nav py-2.5 text-xs font-extrabold text-center ${legacyActive || moreOpen ? "bg-surface text-text shadow-navActive" : "text-muted"}`}>
            <span className="block text-lg leading-none mb-1">•••</span>
            עוד
          </button>
        </div>
      </nav>
    </>
  );
}
