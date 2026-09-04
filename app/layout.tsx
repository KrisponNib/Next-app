import type { Metadata } from "next";
import "./globals.css";
import { NextStateProvider } from "@/lib/state/NextStateProvider";
import { BottomNav } from "@/components/layout/BottomNav";
import { PracticeAtmosphere } from "@/components/layout/PracticeAtmosphere";

export const metadata: Metadata = {
  title: "Next",
  description: "Personal Chief of Staff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body className="font-assistant">
        <NextStateProvider>
          <PracticeAtmosphere />
          <main className="relative z-10 max-w-[760px] mx-auto px-[18px] pt-7">
            {children}
          </main>
          <BottomNav />
        </NextStateProvider>
      </body>
    </html>
  );
}
