"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { useNextState } from "@/lib/state/useNextState";
import { ReflectionType } from "@/lib/types";

// שש האפשרויות, בדיוק לפי הסדר שהיה ברשימה הנפתחת באב-טיפוס.
const REFLECTION_TYPES: ReflectionType[] = [
  "הופעה",
  "חזרה",
  "שיעור",
  "אימון",
  "סרטון",
  "שיחה מקצועית",
];

export function ReflectionForm() {
  const { addReflection } = useNextState();
  const [type, setType] = useState<ReflectionType>(REFLECTION_TYPES[0]);
  const [wentWell, setWentWell] = useState("");
  const [improve, setImprove] = useState("");

  function handleSave() {
    const trimmedWentWell = wentWell.trim();
    const trimmedImprove = improve.trim();

    // בדיוק כמו באב-טיפוס: אם אין שום טקסט באחד השדות, לא נשמר Reflection ריק.
    if (!trimmedWentWell && !trimmedImprove) return;

    addReflection({ type, wentWell: trimmedWentWell, improve: trimmedImprove });
    setWentWell("");
    setImprove("");
  }

  return (
    <Card>
      <h2 className="text-[27px] mb-3.5 font-extrabold">Reflection מהיר</h2>

      <Select
        value={type}
        onChange={(e) => setType(e.target.value as ReflectionType)}
        className="mb-3"
      >
        {REFLECTION_TYPES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </Select>

      <Textarea
        value={wentWell}
        onChange={(e) => setWentWell(e.target.value)}
        placeholder="מה עבד?"
        className="mb-3"
      />

      <Textarea
        value={improve}
        onChange={(e) => setImprove(e.target.value)}
        placeholder="מה פחות עבד / מה לשפר לפעם הבאה?"
        className="mb-3"
      />

      <Button variant="primary" onClick={handleSave}>
        שמור והוסף ללמידה
      </Button>
    </Card>
  );
}
