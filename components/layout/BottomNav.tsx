"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// שש הלשוניות, בדיוק לפי הסדר והשמות שהיו בתפריט התחתון של האב-טיפוס.
// מסכים שעדיין לא נבנו (מעבר ל"היום") יחזירו 404 באופן זמני - זה מכוון,
// כדי לא לבנות מסכים ריקים לפני שהגיע תורם.
const NAV_ITEMS = [
  { href: "/today", label: "היום" },
  { href: "/practice", label: "אימון" },
  { href: "/reflect", label: "למידה" },
  { href: "/wins", label: "Wins" },
  { href: "/money", label: "כסף" },
  { href: "/profile", label: "פרופיל" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 bg-bg/[.86] backdrop-blur-2xl border-t border-line py-2 px-2.5 pb-5 z-20">
      <div className="max-w-[760px] mx-auto grid grid-cols-3 sm:grid-cols-6 gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-nav py-2 px-0.5 text-xs font-extrabold text-center ${
                isActive
                  ? "bg-surface text-text shadow-navActive"
                  : "bg-transparent text-muted"
              }`}
            >
              <span className="block text-lg leading-none mb-[3px]">
                {isActive ? "●" : "○"}
              </span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
