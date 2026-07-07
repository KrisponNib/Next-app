export interface PracticePlanItem {
  title: string;
  minutes: number;
}

// ארבע תוכניות הבסיס, מועתקות ערך-בערך מהאב-טיפוס. לא נוסף ולא הוסר תרגיל אחד.
export const PRACTICE_TEMPLATES: Record<number, PracticePlanItem[]> = {
  20: [
    { title: "חימום ידיים", minutes: 5 },
    { title: "קריאת תווים", minutes: 7 },
    { title: "גרוב על קליק", minutes: 8 },
  ],
  45: [
    { title: "חימום", minutes: 8 },
    { title: "Reading / Charts", minutes: 12 },
    { title: "Groove", minutes: 15 },
    { title: "שיר אחד", minutes: 10 },
  ],
  90: [
    { title: "חימום", minutes: 10 },
    { title: "טכניקה", minutes: 15 },
    { title: "Reading / Charts", minutes: 20 },
    { title: "Groove", minutes: 20 },
    { title: "שיר / הקלטה", minutes: 25 },
  ],
  120: [
    { title: "חימום", minutes: 10 },
    { title: "טכניקה", minutes: 20 },
    { title: "Reading / Charts", minutes: 25 },
    { title: "Groove", minutes: 25 },
    { title: "רפרטואר", minutes: 25 },
    { title: "הקלטה / סיכום", minutes: 15 },
  ],
};
