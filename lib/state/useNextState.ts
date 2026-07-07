"use client";

import { useContext } from "react";
import { NextStateContext } from "@/lib/state/NextStateProvider";

export function useNextState() {
  const ctx = useContext(NextStateContext);
  if (!ctx) {
    throw new Error("useNextState חייב להיות בתוך NextStateProvider");
  }
  return ctx;
}
