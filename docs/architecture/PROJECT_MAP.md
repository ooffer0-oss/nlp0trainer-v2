# מפת הפרויקט — NLP Trainer

מסמך אחד מרכזי שמחליף כרטיסי תיעוד בודדים לכל קובץ. מעודכן בכל שינוי
משמעותי במבנה. סטטוס כל חלק מצוין במפורש — **קיים בפועל** או
**מתוכנן / לא נבנה עדיין**.

```
NLP Trainer
│
├── Frontend                          [קיים]
│   ├── App.tsx
│   └── SessionScreen.tsx
│
├── State Machine                     [קיים — שלד בלבד]
│   └── sessionMachine.ts
│
├── Evaluation                        [לא קיים עדיין — מתוכנן]
│   └── evaluationEngine.ts
│
└── Database                          [לא קיים עדיין — מתוכנן]
    └── sessionRepository.ts
```

## Frontend — קיים

**`src/App.tsx`**
נקודת ההרכבה של האפליקציה. עוטף את המסך היחיד שקיים כרגע (`SessionScreen`)
בתוך מעטפת העמוד (`AppShell`). לא מכיל לוגיקה — רק הרכבה של קומפוננטות.

**`src/components/session/SessionScreen.tsx`**
המסך שמחבר את ה-UI למכונת המצבים. מחזיק `useMachine(sessionMachine)`,
מציג את המצב הנוכחי (`state.value`) ומאפשר להפעיל את האירועים
`START_SESSION` / `END_SESSION` / `RESET` דרך כפתורים. שאר האזורים במסך
(`PromptPanel`, `ResponseInput`, `FeedbackPanel`) הם placeholder בלבד —
אין בהם תוכן אמיתי.

## State Machine — קיים (שלד בלבד)

**`src/machines/session/sessionMachine.ts`**
מגדיר את *צורת* מחזור החיים של סשן אימון בעזרת XState 5:
`idle → active (presentingPrompt → awaitingResponse → evaluatingResponse
→ showingFeedback) → paused / completed / aborted`.
המצב `evaluatingResponse` הוא נקודת החיבור העתידית ל-Evaluation — כרגע
יוצאים ממנו רק על ידי אירוע מפורש (`EVALUATION_COMPLETE`), בלי שום קריאה
אמיתית ללוגיקת הערכה. אין כאן NLP, אין AI, אין בדיקת נכונות.

## Evaluation — לא קיים עדיין

**`evaluationEngine.ts`** (מתוכנן, טרם נוצר)
הרעיון: הרכיב שיקבל תשובה של המשתמש ויחזיר משוב/ציון. איך בדיוק (חוקים
קשיחים / מודל שפה / שילוב) — עדיין החלטה פתוחה (ר' `OPEN_QUESTIONS.md`,
סעיף 3). כרגע מכונת המצבים רק "מדמה" שיש הערכה, בלי לקרוא לשום מנוע.

## Database — לא קיים עדיין

**`sessionRepository.ts`** (מתוכנן, טרם נוצר)
הרעיון: שכבת גישה לשמירת/שליפת סשנים (היסטוריה, התקדמות). אין כרגע שום
persistence בפרויקט — לא local storage, לא backend, לא DB. גם זו החלטה
פתוחה (ר' `OPEN_QUESTIONS.md`, סעיפים 4–5).

---

קבצים נוספים שקיימים בפועל (layout / placeholders גנריים) מפורטים ב-
[`ARCHITECTURE.md`](./ARCHITECTURE.md) ואינם חוזרים כאן כדי לשמור על
המסמך תמציתי.
