# NEXT — Domain Model v0.1

## Purpose

This document defines the core domain objects of NEXT.

NEXT is not built around pages.
NEXT is built around decisions.

The domain model should support the core loop:

**Plan → Do → Reflect → Adapt**

---

## 1. User

The person using NEXT.

In V1, the first user is Omri.

A User has:

- Identity Profile
- Goals
- Tasks
- Events
- Reflections
- Wins
- Income Entries
- Recommendations

---

## 2. Identity Profile

The long-term context NEXT uses to understand the user.

This is not "settings".

It answers:

> Who is this person, and what life are they trying to build?

Fields:

- userId
- identityGoal
- identityTraits
- interests
- constraints
- values
- preferredWorkingStyle

Examples:

- מתופף
- מורה
- יזם
- צמחוני
- אוהב לבשל
- רוצה להתפרנס ממוזיקה
- רוצה פחות רעש ויותר בהירות

Used by:

- Recommendation Engine
- Daily Questions
- Financial Engine
- Future Intelligence Layer

---

## 3. Goal

A meaningful long-term direction.

Goals explain why actions matter.

Initial seed goals:

- First Call
- Mastery
- Academy
- Income Freedom
- Product
- Life

Important:
Goals are not hardcoded forever.

In V1, `GoalId = string`.

Future Goal entity:

- id
- title
- description
- priority
- status
- archived
- createdAt

Used by:

- Tasks
- Wins
- Recommendations
- Reflections
- Income decisions

---

## 4. Task

A concrete action the user can complete.

A Task should be small enough to do.

Examples:

- 20 דקות קריאת תווים
- לבחור שני שירי Portfolio
- לשלוח הודעה לאיש קשר מקצועי
- לעבוד שעה על Next

Fields:

- id
- title
- goalId
- done
- createdAt
- dueDate optional
- source optional

Rules:

- Tasks are user-facing.
- Tasks can be recommended by Next.
- If a Next Action points to a Task, completing it should mark the Task as done.
- Tasks are not the same as Recommendations.

---

## 5. Recommendation / Next Action

A recommendation is what NEXT believes the user should do next.

This is the heart of the product.

A Recommendation is not always a Task.

It can point to:

- Task
- Practice
- Reflection
- Win
- Follow Up
- Event

Type:

```ts
type NextActionRecommendation = {
  id: string;
  type: "task" | "practice" | "reflection" | "win" | "followup" | "event";
  sourceId?: string;
  title: string;
  reason: string;
  goalId: GoalId;
};
```

Rules:

- Must explain why.
- Must connect to a goal.
- Must be actionable.
- Must not be vague.
- If it points to a Task, sourceId = task.id.
- If it is generated dynamically, sourceId may be empty.

Examples:

- "20 דקות קריאת תווים"
- "סכם את החזרה מאתמול"
- "הוסף Win אחד לפני סוף היום"
- "שלח Follow Up לעמית"

---

## 6. Event

Something that happens at a specific time.

Examples:

- שיעור
- חזרה
- הופעה
- הקלטה
- פגישה

Fields:

- id
- title
- type
- date
- time
- relatedPerson optional
- relatedGoalId optional
- completed optional

Rules:

- Events can trigger Reflections.
- Events can affect Next Action.
- Events are not Tasks, but may generate Tasks.

Example:
A rehearsal yesterday should trigger:
"סכם את החזרה מאתמול."

---

## 7. Practice Session

A structured musical practice session.

Fields:

- id
- durationMinutes
- planItems
- completed
- createdAt
- completedAt optional
- source optional

Practice Plan Item:

- title
- durationMinutes
- reason optional

Rules:

- Generated based on available time.
- Should adapt based on Reflections.
- Completing a Practice Session creates a Win.
- Practice supports Mastery.

Examples:

- 20 minutes: warmup, reading, groove
- 45 minutes: warmup, charts, groove, song
- If Reflections mention Charts, add Charts emphasis.
- If Reflections mention Fills, add Fills emphasis.

---

## 8. Reflection

A short learning record after an action or event.

Reflection is not journaling.

It exists to improve the future.

Fields:

- id
- type
- relatedEventId optional
- wentWell
- improve
- createdAt

Types:

- הופעה
- חזרה
- שיעור
- אימון
- סרטון
- שיחה מקצועית

Rules:

- Reflections can generate Tasks.
- Reflections can affect Practice.
- Reflections can create Observations.
- Reflections should be short.

Questions:

1. What worked?
2. What should improve next time?

---

## 9. Win

A proof of progress.

A Win is something concrete that happened.

Examples:

- סיימתי אימון
- העליתי סרטון
- דיברתי עם נגן
- השגתי תלמיד חדש
- סיכמתי הופעה
- סגרתי חזרה

Fields:

- id
- title
- goalId
- createdAt
- sourceType optional
- sourceId optional

Rules:

- Wins are used in Evening Review.
- Wins prove progress.
- Wins should connect to goals.
- Completing a recommended action may create a Win.

---

## 10. Income Entry

A record of money received.

NEXT is not a budgeting app.

It only tracks income in relation to professional freedom.

Fields:

- id
- type
- amount
- label
- date
- sourceId optional

Types:

- music
- other

Rules:

- Used to calculate Music Income Ratio.
- Helps understand transition from mixed income to music-only income.
- Should support conservative recommendations.

Examples:

- שיעור תופים — music — ₪250
- הופעה — music — ₪1200
- משמרת במסעדה — other — ₪500

---

## 11. Daily Answer

A short answer to a small question.

Used to help NEXT learn the user.

Fields:

- id
- question
- answer
- createdAt

Rules:

- One short question at a time.
- No long questionnaires.
- Answers update understanding over time.

Examples:

- מה הכי מעכב אותך השבוע?
- מתי אתה מרגיש הכי חד?
- איזה אימון עבד לך הכי טוב?

---

## 12. Observation

A pattern or insight NEXT learns.

Not necessarily user-facing every day.

Fields:

- id
- title
- description
- evidence
- confidence optional
- createdAt

Examples:

- "קריאת תווים חוזרת ב-3 Reflections."
- "סרטונים אחרי חזרות מביאים יותר פניות."
- "אימוני בוקר מסתיימים יותר מאימוני ערב."

Rules:

- Observations should be based on evidence.
- Observations may influence Recommendations.
- Observations should not create noise.

---

## 13. Experiment

A structured test.

Examples:

- העלאת Reel מסוג מסוים
- הודעה לנגן
- שינוי מחיר
- שינוי שגרת אימון

Fields:

- id
- hypothesis
- action
- evidence
- conclusion
- status
- createdAt

Lifecycle:

1. Hypothesis
2. Action
3. Evidence
4. Conclusion

Rules:

- Not every Task is an Experiment.
- Experiments are used when the user wants to learn what works.

---

## 14. Contact

A professional relationship.

Fields:

- id
- name
- role
- lastContactAt
- relationshipContext
- nextFollowUpAt optional
- notes

Used by:

- Career Engine
- Follow Up recommendations
- Opportunities

Future:
Contacts can connect to:

- Gigs
- Referrals
- Messages
- Opportunities

---

## 15. Follow Up

A reminder to reconnect with someone.

Fields:

- id
- contactId
- title
- dueDate
- status
- goalId

Rules:

- Follow Ups should support career movement.
- They should not become spam.
- Recommendations should explain why a follow up matters.

Example:
"דבר עם עמית — כי לא דיברתם 14 יום והוא כבר הביא לך עבודה בעבר."

---

## 16. Student

Future object.

Not fully in V1.

A Student represents someone learning with the user.

Fields future:

- id
- name
- currentGoal
- level
- lastLessonAt
- nextLessonAt
- notes

Connected objects:

- Lessons
- Homework
- Reflections
- Materials
- Wins

Rule:
Student features should answer:
מה צריך לקרות בשיעור הבא?

Not:
"show all student data".

---

## 17. Lesson

Future object under Student Engine.

Fields future:

- id
- studentId
- date
- topic
- wentWell
- improve
- homeworkAssigned

Lessons should create:

- Reflection
- Homework
- Next lesson recommendation

---

## 18. Content Item

Future object for content experiments.

Fields future:

- id
- type
- platform
- title
- publishedAt
- metrics
- goalId

Metrics may include:

- views
- likes
- comments
- saves
- shares
- leads

Rules:

- Content is not tracked for vanity.
- Content is tracked to learn what creates opportunities.

---

## 19. Relationships Between Objects

**Task → Goal**
Every Task should connect to a Goal.

**Recommendation → Task**
A Recommendation may point to an existing Task.

**Recommendation → Reflection**
A Recommendation may ask the user to reflect.

**Event → Reflection**
Events should trigger Reflections.

**Reflection → Task**
A Reflection may create a future Task.

**Reflection → Practice Session**
Repeated improvement themes should affect Practice.

**Practice Session → Win**
Completing practice creates a Win.

**Income Entry → Income Freedom**
Income entries affect the Financial Engine.

**Daily Answer → Identity Profile**
Daily answers update understanding of the user.

**Observation → Recommendation**
Patterns should influence future recommendations.

---

## 20. Rules for Future Development

1. Do not create new objects unless an existing one cannot represent the concept.
2. Do not store data "just in case."
3. Every object must support a future decision.
4. Every user-facing object must connect to action or learning.
5. Avoid duplicate sources of truth.
6. Recommendations should point to source objects when possible.
7. Text is not identity. IDs matter.
8. Keep V1 small.
9. Prefer explicit domain objects over vague generic blobs.
10. If unsure, document first, code second.

---

## 21. Current V1 Objects

For the current build, only these objects are active:

- Task
- Recommendation
- Practice Session
- Reflection
- Win
- Income Entry
- Daily Answer
- Identity Profile

Not active yet:

- Event
- Contact
- Follow Up
- Student
- Lesson
- Experiment
- Observation
- Content Item

These should not be implemented until their feature sprint begins.
