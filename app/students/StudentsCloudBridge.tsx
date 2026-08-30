"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useNextState } from "@/lib/state/useNextState";
import { Student } from "@/lib/types";

function fingerprint(students: Student[]) {
  return JSON.stringify(students);
}

export function StudentsCloudBridge({ children }: { children: React.ReactNode }) {
  const { state, replaceStudents } = useNextState();
  const pathname = usePathname();
  const isLoginPage = pathname === "/students/login";
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastSynced = useRef("");

  useEffect(() => {
    if (isLoginPage) {
      setReady(true);
      return;
    }
    let cancelled = false;
    async function hydrate() {
      try {
        const res = await fetch("/api/students", { cache: "no-store" });
        if (res.status === 401) {
          window.location.href = "/students/login";
          return;
        }
        if (!res.ok) throw new Error(await res.text());
        const json = await res.json();
        const cloud: Student[] = json.students || [];
        if (cancelled) return;

        if (cloud.length > 0) {
          lastSynced.current = fingerprint(cloud);
          replaceStudents(cloud);
        } else if (state.students.length > 0) {
          const put = await fetch("/api/students", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ students: state.students }),
          });
          if (!put.ok) throw new Error(await put.text());
          const saved = await put.json();
          const normalized: Student[] = saved.students || state.students;
          lastSynced.current = fingerprint(normalized);
          replaceStudents(normalized);
        } else {
          lastSynced.current = "[]";
        }
        setReady(true);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Cloud sync failed");
          setReady(true);
        }
      }
    }
    hydrate();
    return () => { cancelled = true; };
    // initial bridge hydration only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoginPage]);

  useEffect(() => {
    if (isLoginPage || !ready || error) return;
    const current = fingerprint(state.students);
    if (current === lastSynced.current) return;
    const timer = window.setTimeout(async () => {
      try {
        const res = await fetch("/api/students", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ students: state.students }),
        });
        if (!res.ok) throw new Error(await res.text());
        const saved = await res.json();
        const normalized: Student[] = saved.students || state.students;
        lastSynced.current = fingerprint(normalized);
        if (fingerprint(normalized) !== current) replaceStudents(normalized);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Cloud sync failed");
      }
    }, 500);
    return () => window.clearTimeout(timer);
  }, [state.students, ready, error, replaceStudents, isLoginPage]);

  if (isLoginPage) return <>{children}</>;
  if (!ready) return <div className="py-16 text-center text-muted">מסנכרן תלמידים…</div>;
  return <>{error && <div className="mb-4 rounded-button-sm bg-surface-soft p-3 text-sm">שגיאת סנכרון: {error}</div>}{children}</>;
}
