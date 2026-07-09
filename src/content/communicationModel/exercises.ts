import type { CommunicationModelExercise } from './types'

/**
 * Sample Communication Model exercises.
 *
 * ILLUSTRATIVE CONTENT ONLY — written to exercise the data model, UI and
 * validation logic end-to-end. The scenarios, distractors and
 * explanations have NOT been reviewed by an NLP instructor and should be
 * replaced/verified before real students train on them. Because this is
 * plain structured data (no hardcoded UI text), swapping it out does not
 * require touching any component.
 */
export const communicationModelExercises: CommunicationModelExercise[] = [
  {
    id: 'cm-01',
    title: 'ההודעה שלא נענתה',
    difficulty: 'easy',
    scenario:
      'דנה שלחה הודעה לחברה שלה ולא קיבלה תשובה במשך שעתיים. היא חשבה לעצמה שבטח החברה כועסת עליה. דנה הרגישה חרדה וקצת עצובה. היא התחילה לכתוב הודעה נוספת מתנצלת, למרות שלא היה ברור על מה. בסוף היום, החברה כתבה שהייתה בפגישות ולא ראתה את הטלפון בכלל, ודנה הרגישה מיותרת וטיפשה על כל הדאגה.',
    components: [
      {
        key: 'event',
        label: 'Event — האירוע',
        correctOptionId: 'e1',
        explanation:
          'זו העובדה האובייקטיבית שקרתה בעולם החיצון — מה שניתן לצלם או להקליט — לפני כל פרשנות של דנה.',
        options: [
          { id: 'e1', text: 'דנה שלחה הודעה ולא קיבלה תשובה במשך שעתיים' },
          { id: 'e2', text: 'דנה חשבה שהחברה כועסת עליה' },
          { id: 'e3', text: 'דנה הרגישה חרדה ועצובה' },
          { id: 'e4', text: 'דנה כתבה הודעה מתנצלת נוספת' },
        ],
      },
      {
        key: 'internalRepresentation',
        label: 'Internal Representation — הייצוג הפנימי',
        correctOptionId: 'ir1',
        explanation:
          'זו הפרשנות/המשמעות שדנה נתנה לאירוע בתוך ראשה — "בטח היא כועסת עליי" — לא עובדה, אלא סיפור שהיא סיפרה לעצמה.',
        options: [
          { id: 'ir1', text: 'דנה חשבה לעצמה שבטח החברה כועסת עליה' },
          { id: 'ir2', text: 'דנה שלחה הודעה ולא קיבלה תשובה' },
          { id: 'ir3', text: 'דנה כתבה הודעה מתנצלת' },
          { id: 'ir4', text: 'החברה כתבה שהייתה בפגישות' },
        ],
      },
      {
        key: 'state',
        label: 'State — המצב הפנימי',
        correctOptionId: 's1',
        explanation:
          'זו התוצאה הרגשית/פיזיולוגית של הייצוג הפנימי — מה שדנה הרגישה בגוף ובנפש כתוצאה מהפרשנות שלה.',
        options: [
          { id: 's1', text: 'חרדה וקצת עצבות' },
          { id: 's2', text: 'דנה שלחה הודעה לחברה' },
          { id: 's3', text: 'דנה חשבה שהחברה כועסת' },
          { id: 's4', text: 'דנה כתבה הודעה מתנצלת' },
        ],
      },
      {
        key: 'behavior',
        label: 'Behavior — ההתנהגות',
        correctOptionId: 'b1',
        explanation:
          'זו הפעולה שדנה בפועל עשתה כתוצאה מהמצב הרגשי שלה — הצעד שנראה כלפי חוץ.',
        options: [
          { id: 'b1', text: 'דנה כתבה הודעה נוספת מתנצלת, בלי לדעת בדיוק על מה' },
          { id: 'b2', text: 'דנה הרגישה חרדה ועצובה' },
          { id: 'b3', text: 'החברה לא ראתה את הטלפון' },
          { id: 'b4', text: 'דנה הרגישה מיותרת בסוף היום' },
        ],
      },
      {
        key: 'result',
        label: 'Result — התוצאה',
        correctOptionId: 'r1',
        explanation:
          'זו התוצאה הסופית של כל השרשרת — איך דנה הרגישה בסיכומו של דבר, אחרי שהתברר מה קרה באמת.',
        options: [
          {
            id: 'r1',
            text: 'דנה הרגישה מיותרת וטיפשה כשהתברר שהחברה פשוט הייתה בפגישות',
          },
          { id: 'r2', text: 'דנה כתבה הודעה נוספת' },
          { id: 'r3', text: 'דנה חשבה שהחברה כועסת עליה' },
          { id: 'r4', text: 'דנה הרגישה חרדה' },
        ],
      },
    ],
  },
  {
    id: 'cm-02',
    title: '"תודה, אני אעבור עליו"',
    difficulty: 'medium',
    scenario:
      'אלון הגיש דוח לבוס שלו. הבוס קרא אותו ואמר רק: "תודה, אני אעבור עליו". אלון פירש את זה כאילו הדוח לא היה מספיק טוב. הוא הרגיש מתוח ולא בטוח בעצמו. במקום להמשיך למשימה הבאה, הוא ישב וקרא את הדוח שוב ושוב במשך חצי שעה, מחפש טעויות. בסוף היום הוא היה כל כך עייף מהמתח שלא הספיק לסיים משימה אחרת שהייתה דחופה יותר.',
    components: [
      {
        key: 'event',
        label: 'Event — האירוע',
        correctOptionId: 'e1',
        explanation: 'המשפט המדויק שהבוס אמר — עובדה חיצונית, בלי פרשנות.',
        options: [
          { id: 'e1', text: 'הבוס אמר: "תודה, אני אעבור עליו"' },
          { id: 'e2', text: 'אלון חשב שהדוח לא היה מספיק טוב' },
          { id: 'e3', text: 'אלון הרגיש מתוח ולא בטוח בעצמו' },
          { id: 'e4', text: 'אלון קרא את הדוח שוב ושוב' },
        ],
      },
      {
        key: 'internalRepresentation',
        label: 'Internal Representation — הייצוג הפנימי',
        correctOptionId: 'ir1',
        explanation:
          'הפרשנות שאלון נתן למשפט הניטרלי של הבוס — הוא זה שהוסיף את המשמעות "הדוח לא טוב מספיק", לא הבוס.',
        options: [
          { id: 'ir1', text: 'אלון פירש את זה כאילו הדוח לא היה מספיק טוב' },
          { id: 'ir2', text: 'הבוס אמר "תודה, אני אעבור עליו"' },
          { id: 'ir3', text: 'אלון ישב וקרא את הדוח שוב ושוב' },
          { id: 'ir4', text: 'אלון לא הספיק לסיים משימה דחופה' },
        ],
      },
      {
        key: 'state',
        label: 'State — המצב הפנימי',
        correctOptionId: 's1',
        explanation: 'התחושה הרגשית שנוצרה אצל אלון כתוצאה מהפרשנות שלו.',
        options: [
          { id: 's1', text: 'מתח וחוסר ביטחון עצמי' },
          { id: 's2', text: 'הבוס קרא את הדוח' },
          { id: 's3', text: 'אלון פירש את זה לרעה' },
          { id: 's4', text: 'אלון קרא את הדוח שוב ושוב' },
        ],
      },
      {
        key: 'behavior',
        label: 'Behavior — ההתנהגות',
        correctOptionId: 'b1',
        explanation: 'הפעולה הנצפית שאלון עשה כתוצאה מהמתח שהוא הרגיש.',
        options: [
          { id: 'b1', text: 'ישב וקרא את הדוח שוב ושוב במשך חצי שעה' },
          { id: 'b2', text: 'הרגיש מתוח ולא בטוח בעצמו' },
          { id: 'b3', text: 'הבוס אמר "אני אעבור עליו"' },
          { id: 'b4', text: 'לא הספיק לסיים משימה דחופה יותר' },
        ],
      },
      {
        key: 'result',
        label: 'Result — התוצאה',
        correctOptionId: 'r1',
        explanation: 'התוצאה הסופית של כל השרשרת — מה שבפועל נפגע בעקבותיה.',
        options: [
          {
            id: 'r1',
            text: 'הוא היה עייף מהמתח ולא הספיק לסיים משימה דחופה יותר',
          },
          { id: 'r2', text: 'קרא את הדוח שוב ושוב' },
          { id: 'r3', text: 'פירש את דברי הבוס לרעה' },
          { id: 'r4', text: 'הרגיש מתוח' },
        ],
      },
    ],
  },
  {
    id: 'cm-03',
    title: 'ליד שולחן האוכל',
    difficulty: 'medium',
    scenario:
      'מיכל הוזמנה למסיבה, אבל בגלל שלא הכירה שם הרבה אנשים, היא חשבה לעצמה שכולם כבר בקבוצות סגורות ולא ירצו שהיא תצטרף. היא הרגישה לא נעים ומבוכה. היא נשארה ליד שולחן האוכל כל הערב ולא ניגשה לאף אחד. בסוף המסיבה היא הלכה הביתה מרגישה שהערב היה בזבוז זמן ושהיא בודדה.',
    components: [
      {
        key: 'event',
        label: 'Event — האירוע',
        correctOptionId: 'e1',
        explanation: 'העובדה החיצונית: מיכל במסיבה, בסביבה של אנשים שהיא לא מכירה.',
        options: [
          { id: 'e1', text: 'מיכל הוזמנה למסיבה שבה לא הכירה הרבה אנשים' },
          { id: 'e2', text: 'מיכל חשבה שכולם כבר בקבוצות סגורות' },
          { id: 'e3', text: 'מיכל הרגישה לא נעים ומבוכה' },
          { id: 'e4', text: 'מיכל נשארה ליד שולחן האוכל' },
        ],
      },
      {
        key: 'internalRepresentation',
        label: 'Internal Representation — הייצוג הפנימי',
        correctOptionId: 'ir1',
        explanation: 'הסיפור שמיכל סיפרה לעצמה על המצב — לא עובדה שנבדקה, אלא הנחה.',
        options: [
          {
            id: 'ir1',
            text: 'היא חשבה שכולם כבר בקבוצות סגורות ולא ירצו שהיא תצטרף',
          },
          { id: 'ir2', text: 'מיכל הוזמנה למסיבה' },
          { id: 'ir3', text: 'מיכל נשארה ליד שולחן האוכל כל הערב' },
          { id: 'ir4', text: 'מיכל הלכה הביתה בסוף הערב' },
        ],
      },
      {
        key: 'state',
        label: 'State — המצב הפנימי',
        correctOptionId: 's1',
        explanation: 'התחושה הרגשית שנוצרה מהפרשנות של מיכל את המצב.',
        options: [
          { id: 's1', text: 'אי נעימות ומבוכה' },
          { id: 's2', text: 'מיכל הוזמנה למסיבה' },
          { id: 's3', text: 'מיכל חשבה שהיא לא רצויה' },
          { id: 's4', text: 'מיכל נשארה ליד שולחן האוכל' },
        ],
      },
      {
        key: 'behavior',
        label: 'Behavior — ההתנהגות',
        correctOptionId: 'b1',
        explanation: 'הפעולה הנצפית — מה שמיכל בפועל עשתה (ולא עשתה) כל הערב.',
        options: [
          { id: 'b1', text: 'נשארה ליד שולחן האוכל כל הערב ולא ניגשה לאף אחד' },
          { id: 'b2', text: 'הרגישה לא נעים ומבוכה' },
          { id: 'b3', text: 'חשבה שכולם בקבוצות סגורות' },
          { id: 'b4', text: 'הלכה הביתה מרגישה בודדה' },
        ],
      },
      {
        key: 'result',
        label: 'Result — התוצאה',
        correctOptionId: 'r1',
        explanation: 'התוצאה הסופית — איך כל השרשרת הסתיימה עבור מיכל בפועל.',
        options: [
          {
            id: 'r1',
            text: 'היא הלכה הביתה מרגישה שהערב היה בזבוז זמן ושהיא בודדה',
          },
          { id: 'r2', text: 'נשארה ליד שולחן האוכל' },
          { id: 'r3', text: 'חשבה שכולם בקבוצות סגורות' },
          { id: 'r4', text: 'הרגישה מבוכה' },
        ],
      },
    ],
  },
]
