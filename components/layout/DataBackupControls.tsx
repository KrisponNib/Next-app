"use client";

import { useRef, useState } from "react";
import { useNextState } from "@/lib/state/useNextState";
import { importStateFromFile } from "@/lib/state/storage";

export function DataBackupControls() {
  const { exportState, importState } = useNextState();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const importedState = await importStateFromFile(file);
      importState(importedState);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "ייבוא נכשל.");
    } finally {
      e.target.value = "";
    }
  }

  return (
    <div>
      <p className="text-muted text-sm mb-3">
        המידע חי כרגע רק בדפדפן הזה. אפשר לייצא עותק, ולייבא אותו בחזרה במכשיר אחר.
      </p>
      <div className="flex gap-4">
        <button onClick={exportState} className="text-accent font-extrabold text-sm">
          ייצוא נתונים
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="text-accent font-extrabold text-sm"
        >
          ייבוא נתונים
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          onChange={handleFileSelected}
          className="hidden"
        />
      </div>
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
}
