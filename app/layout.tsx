import type { Metadata } from "next";
import "./globals.css";
import { NextStateProvider } from "@/lib/state/NextStateProvider";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.omriberger.com"),
  title: "עמרי ברגר - שיעורי תופים בתל אביב",
  description:
    "שיעורי תופים אישיים עם עמרי ברגר בסטודיו פרטי במרכז תל אביב. מתחילים משיר, ומתקדמים בקצב שלך.",
  verification: { google: "a35M0VvR537gkRYX2Yx7E6qkWrbjYRVD036_8LbTFeI" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body className="font-assistant">
        <NextStateProvider>
          <AppShell>{children}</AppShell>
        </NextStateProvider>
      </body>
    </html>
  );
}
