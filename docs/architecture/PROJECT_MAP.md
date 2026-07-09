# מפת הפרויקט — NLP Trainer

מסמך אחד מרכזי שמחליף כרטיסי תיעוד בודדים לכל קובץ. מעודכן בכל שינוי
משמעותי במבנה. סטטוס כל חלק מצוין במפורש — **קיים בפועל** או
**מתוכנן / לא נבנה עדיין**.

```
NLP Trainer
│
├── Frontend                          [קיים]
│   ├── App.tsx
│   ├── HomeScreen.tsx
│   └── CommunicationModelTrainerScreen.tsx
│
├── Training Framework (משותף)        [קיים]
│   ├── ExerciseTrainer.tsx
│   └── ExerciseCard.tsx
│
├── State Machine                     [קיים]
│   └── sessionMachine.ts
│
├── Communication Model — Module      [קיים]
│   ├── exercises.ts (תוכן לדוגמה, טרם אושר על ידי מורה)
│   ├── CommunicationModelAnswerArea.tsx
│   └── CommunicationModelExplanation.tsx
│
├── Evaluation                        [קיים חלקית]
│   └── validation/communicationModel.ts (rule-based, מודול אחד בלבד)
│
├── מודולי תוכן נוספים (מטא מודל, מילטון מודל,
│   הנחות יסוד, מודל השינוי המורחב, אמונות יסוד) [לא קיים עדיין]
│
├── Master Practitioner (הנחיה + סופרויזן) [לא קיים עדיין]
│
└── Database / Persistence            [לא קיים עדיין]
```

## Frontend — קיים

**`src/App.tsx`**
עובר בין שני מסכים: `HomeScreen` (מסך פתיחה) ו-
`CommunicationModelTrainerScreen` (מסך התרגול), לפי state מקומי פשוט
(`useState`). אין עדיין ראוטר — זו החלטה מודעת עד שיהיו כמה מודולים
במקביל (ר' `OPEN_QUESTIONS.md`).

**`src/components/home/HomeScreen.tsx`**
מסך כניסה מינימלי: לוגו, שם הפרויקט, תיאור קצר, כפתור "Start Practice"
אחד. בלי Header/ניווט — בהתאם לספק שדרש מסך פתיחה "נקי" לגמרי.

**`src/components/communicationModel/CommunicationModelTrainerScreen.tsx`**
עמוד המודול הראשון: כותרת + הסבר קצר, ואז מרכיב את ה-Training Framework
הגנרי עם הנתונים/רכיבים הספציפיים למודל התקשורת.

## Training Framework — קיים (משותף לכל מודול עתידי)

**`src/components/training/ExerciseTrainer.tsx`**
הרכיב הגנרי שמניע את מחזור החיים: מציג תרגיל → קולט תשובה → מריץ
`validate` → מציג הסבר → תרגיל הבא. הוא לא יודע כלום על "מודל תקשורת"
באופן ספציפי — מקבל את כל מה שספציפי למודול (רינדור השאלה, אזור
התשובה, ההסבר, ופונקציית הבדיקה) כ-props. מודול חדש לא נוגע בקובץ הזה.

**`src/components/training/ExerciseCard.tsx`**
כרטיס תצוגה משותף לסיפור/תרחיש של התרגיל (כותרת + רמת קושי אופציונלית
+ טקסט). משמש בתוך `renderPrompt` של כל מודול.

## State Machine — קיים

**`src/machines/session/sessionMachine.ts`**
מגדיר את מחזור החיים (`idle → active(presentingPrompt →
awaitingResponse → evaluatingResponse → showingFeedback) → completed`)
ומופעל בפועל על ידי `ExerciseTrainer`. זו אותה מכונה מהשלד המקורי — לא
נוצרה מכונה נפרדת למודול התקשורת, כי המכונה הגנרית כבר התאימה בדיוק.

## Communication Model — Module — קיים

**`src/content/communicationModel/{types.ts,exercises.ts}`**
מודל הנתונים לתרגיל (סיפור, 5 רכיבים — Event / Internal Representation /
State / Behavior / Result — כל אחד עם אפשרויות בחירה מרובה, תשובה נכונה
והסבר). כולל 3 תרגילי דוגמה. **התוכן לא אושר על ידי מורה/מומחה תוכן —
לצורך בדיקת המנגנון בלבד**, יש להחליף לפני שימוש אמיתי עם תלמידים.

**`src/components/communicationModel/CommunicationModelAnswerArea.tsx`**
5 קבוצות בחירה מרובה (אחת לכל רכיב במודל התקשורת).

**`src/components/communicationModel/CommunicationModelExplanation.tsx`**
תצוגת ניתוח לאחר שליחה: ציון, וכל רכיב — נכון/לא נכון, מה נבחר, התשובה
הנכונה, וההסבר המקצועי מדוע.

## Evaluation — קיים חלקית

**`src/lib/validation/communicationModel.ts`**
פונקציה טהורה (rule-based, ללא AI) שמשווה בחירה מול תשובה נכונה לכל
רכיב. **קיימת רק עבור מודל התקשורת** — אין מנוע הערכה כללי, ואין AI
Evaluation (מחוץ לתחום Pilot v1 במפורש).

## מודולים נוספים / Master Practitioner / Database — לא קיים עדיין

מטא מודל, מילטון מודל, הנחות יסוד, מודל השינוי המורחב, אמונות יסוד,
זרימת מאסטר עם סופרויזן, ושכבת שמירת נתונים — אף אחד מאלה עדיין לא
נבנה. פירוט מה פתוח לגבי כל אחד ב-`OPEN_QUESTIONS.md`.
