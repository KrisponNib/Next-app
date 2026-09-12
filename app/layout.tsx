import type { Metadata } from "next";
import "./globals.css";
import { NextStateProvider } from "@/lib/state/NextStateProvider";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "Next",
  description: "Personal Chief of Staff",
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
