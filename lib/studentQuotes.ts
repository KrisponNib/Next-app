export interface DailyQuote {
  musician: string;
  quote: string;
  translation: string;
  wikipedia: string;
}

export const DAILY_QUOTES: DailyQuote[] = [
  {
    musician: `Charlie Parker`,
    quote: `Music is your own experience, your own thoughts, your wisdom.`,
    translation: `מוזיקה היא החוויה שלך, המחשבות שלך והחוכמה שלך.`,
    wikipedia: `https://en.wikipedia.org/wiki/Charlie_Parker`,
  },
  {
    musician: `Charlie Parker`,
    quote: `If you don't live it, it won't come out of your horn.`,
    translation: `אם אתה לא חי את זה, זה לא ייצא מהכלי שלך.`,
    wikipedia: `https://en.wikipedia.org/wiki/Charlie_Parker`,
  },
  {
    musician: `Herbie Hancock`,
    quote: `The destination's not as important as the journey.`,
    translation: `היעד לא חשוב כמו הדרך אליו.`,
    wikipedia: `https://en.wikipedia.org/wiki/Herbie_Hancock`,
  },
  {
    musician: `Miles Davis`,
    quote: `I'll play it and tell you what it is later.`,
    translation: `קודם אנגן את זה, אחר כך אגיד לך מה זה.`,
    wikipedia: `https://en.wikipedia.org/wiki/Miles_Davis`,
  },
  {
    musician: `Sonny Rollins`,
    quote: `The greatest thing in the world is to be playing your instrument.`,
    translation: `הדבר הכי גדול בעולם הוא פשוט לנגן בכלי שלך.`,
    wikipedia: `https://en.wikipedia.org/wiki/Sonny_Rollins`,
  },
  {
    musician: `Sonny Rollins`,
    quote: `You let the music play you.`,
    translation: `אתה נותן למוזיקה לנגן אותך.`,
    wikipedia: `https://en.wikipedia.org/wiki/Sonny_Rollins`,
  },
  {
    musician: `Sheila E.`,
    quote: `That preparation is everything.`,
    translation: `ההכנה היא הכול.`,
    wikipedia: `https://en.wikipedia.org/wiki/Sheila_E.`,
  },
  {
    musician: `Sheila E.`,
    quote: `Whatever you put into it is what you get out.`,
    translation: `מה שתשקיע בזה הוא מה שתקבל בחזרה.`,
    wikipedia: `https://en.wikipedia.org/wiki/Sheila_E.`,
  },
  {
    musician: `Louis Armstrong`,
    quote: `What we play is life.`,
    translation: `מה שאנחנו מנגנים הוא החיים.`,
    wikipedia: `https://en.wikipedia.org/wiki/Louis_Armstrong`,
  },
  {
    musician: `Louis Armstrong`,
    quote: `You have got to find the other notes yourself.`,
    translation: `את שאר התווים אתה צריך למצוא בעצמך.`,
    wikipedia: `https://en.wikipedia.org/wiki/Louis_Armstrong`,
  },
  {
    musician: `Quincy Jones`,
    quote: `You can't get an A if you're afraid of an F.`,
    translation: `אי אפשר להגיע למצוין אם מפחדים להיכשל.`,
    wikipedia: `https://en.wikipedia.org/wiki/Quincy_Jones`,
  },
  {
    musician: `Quincy Jones`,
    quote: `Approach your art with humility.`,
    translation: `גש לאמנות שלך בצניעות.`,
    wikipedia: `https://en.wikipedia.org/wiki/Quincy_Jones`,
  },
  {
    musician: `George Duke`,
    quote: `Don't be afraid to experiment.`,
    translation: `אל תפחד להתנסות.`,
    wikipedia: `https://en.wikipedia.org/wiki/George_Duke`,
  },
  {
    musician: `George Duke`,
    quote: `You need to find your own voice.`,
    translation: `אתה צריך למצוא את הקול שלך.`,
    wikipedia: `https://en.wikipedia.org/wiki/George_Duke`,
  },
  {
    musician: `Harry Connick Jr.`,
    quote: `I give 100 percent to everything I do.`,
    translation: `אני נותן מאה אחוז לכל דבר שאני עושה.`,
    wikipedia: `https://en.wikipedia.org/wiki/Harry_Connick_Jr.`,
  },
  {
    musician: `Harry Connick Jr.`,
    quote: `I just do it.`,
    translation: `אני פשוט עושה את זה.`,
    wikipedia: `https://en.wikipedia.org/wiki/Harry_Connick_Jr.`,
  },
  {
    musician: `Zakir Hussain`,
    quote: `Learn every riff, learn every standard, learn all the solos.`,
    translation: `למד כל ריף, כל סטנדרט וכל סולו.`,
    wikipedia: `https://en.wikipedia.org/wiki/Zakir_Hussain_(musician)`,
  },
  {
    musician: `André 3000`,
    quote: `Respect your taste—that's all you got.`,
    translation: `כבד את הטעם שלך — זה כל מה שיש לך.`,
    wikipedia: `https://en.wikipedia.org/wiki/Andr%C3%A9_3000`,
  },
  {
    musician: `André 3000`,
    quote: `Just listen to yourself—and get to yourself faster.`,
    translation: `פשוט תקשיב לעצמך — ותגיע לעצמך מהר יותר.`,
    wikipedia: `https://en.wikipedia.org/wiki/Andr%C3%A9_3000`,
  },
  {
    musician: `Justin Timberlake`,
    quote: `Just keep writing.`,
    translation: `פשוט תמשיך לכתוב.`,
    wikipedia: `https://en.wikipedia.org/wiki/Justin_Timberlake`,
  },
  {
    musician: `Justin Timberlake`,
    quote: `I only have one rule in the studio: dare to suck.`,
    translation: `יש לי רק כלל אחד באולפן: תעז להיות גרוע.`,
    wikipedia: `https://en.wikipedia.org/wiki/Justin_Timberlake`,
  },
  {
    musician: `Steven Tyler`,
    quote: `Dare to suck.`,
    translation: `תעז להיות גרוע.`,
    wikipedia: `https://en.wikipedia.org/wiki/Steven_Tyler`,
  },
  {
    musician: `Tommy Emmanuel`,
    quote: `Repetition is my weapon, my friend.`,
    translation: `חזרה היא הנשק שלי והחברה שלי.`,
    wikipedia: `https://en.wikipedia.org/wiki/Tommy_Emmanuel`,
  },
  {
    musician: `James Taylor`,
    quote: `Having prepared, you basically want to be in the moment.`,
    translation: `אחרי שהתכוננת, אתה בעצם רוצה להיות בתוך הרגע.`,
    wikipedia: `https://en.wikipedia.org/wiki/James_Taylor`,
  },
];

export function quoteForToday(date = new Date()): DailyQuote {
  const dayKey = Math.floor(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000
  );
  return DAILY_QUOTES[Math.abs(dayKey) % DAILY_QUOTES.length];
}
