/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import LessonsBehavior from "./LessonsBehavior";
import "./lessons.css";
import "./lesson-art.css";
export const metadata: Metadata = {
  title: "עמרי ברגר - שיעורי תופים בתל אביב",
  description:
    "שיעורי תופים אישיים עם עמרי ברגר בסטודיו פרטי במרכז תל אביב. מתחילים משיר, ומתקדמים בקצב שלך.",
};
export default function LessonsPage() {
  return (
    <div className="omri-lessons">
      <a className="skip" href="#main">
        דילוג לתוכן
      </a>
      <header className="topbar-sticky">
        <div className="topbar wrap">
          <a className="logo" href="#">
            עמרי ברגר - מורה לתופים
          </a>
          <a
            className="topbar-icon"
            href="https://www.instagram.com/omri_berger/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="אינסטגרם"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
              <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="12" cy="12" r="4.6" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" />
            </svg>
          </a>
          <span className="topbar-cta-slot" aria-hidden="true" />
          <a className="topbar-login" href="/students/login">
            כניסה לאיזור האישי
          </a>
        </div>
      </header>
      <main id="main">
        <section className="opening wrap" aria-labelledby="hero-title">
          <div className="ambient-art art-cymbal-illustration" aria-hidden="true"><img src="/marketing/illustrations/cymbal-illustration.png" alt="" loading="lazy" decoding="async" /></div>
          <div className="hero-copy">
            <h1 id="hero-title">
              תמיד רצית
              <br />
              לנגן על תופים?
            </h1>
            <p className="sub">בואו נתחיל מהשיר האהוב עליכם.ן!</p>
            <p className="intro">
              אפשר לנגן בשביל הכיף
              <br />
              אפשר לחלום על הבמות הגדולות
              <br />
              בשני המקרים - מתחילים משיעור ניסיון אצלי :)
            </p>
          </div>
          <figure className="hero-photo">
            <img
              src="/marketing/lessons/stage.jpg"
              alt="עמרי על הבמה, מאחורי מערכת התופים עם מקלות מורמים"
              width="1280"
              height="1920"
              fetchPriority="high"
            />
            <figcaption>
              <span>על הבמה</span>
              <bdi>Arctic Kartiv</bdi>
            </figcaption>
            <p className="photo-credit">צילום: EilonBphoto</p>
          </figure>
          <div className="hero-action">
            <a
              id="heroCta"
              className="btn js-cta cta-a"
              href="https://wa.me/972545379987?text=%D7%94%D7%99%D7%99%20%D7%A2%D7%9E%D7%A8%D7%99%21%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%93%D7%A8%D7%9A%20%D7%94%D7%90%D7%AA%D7%A8%20%D7%95%D7%91%D7%90%20%D7%9C%D7%99%20%D7%9C%D7%A0%D7%A1%D7%95%D7%AA%20%D7%9C%D7%A0%D7%92%D7%9F%20%F0%9F%A5%81"
            >
              בא לי לנגן
              <span className="btn-icon" aria-hidden="true">🥁</span>
            </a>
          </div>
        </section>
        <section className="first wrap section">
          <img
            className="drawing snare"
            src="/marketing/lessons/snare.png"
            alt=""
            width="1536"
            height="1024"
            loading="lazy"
          />
          <div className="section-grid">
            <h2 className="reveal">
              קובעים
              <br />
              מגיעים
              <br />
              <em>מנגנים</em>
            </h2>
            <div className="body-copy">
              <p>לא צריך לדעת כלום על מוזיקה לפני שמגיעים לשיעור הראשון!</p>
              <p>תבואו, נכיר קצת, תתיישבו על התופים - ותתחילו לנגן!</p>
              <p>ולפני שתשימו לב, כבר נקליט <span className="word-color">שיר ראשון</span> להשמיע למשפחה ולחברים :)</p>
              <p className="first-personal-note">והכל יהיה שמור באיזור האישי שלכם</p>
            </div>
          </div>
        </section>

        <section className="personal wrap section">
          <div className="section-grid">
            <div>
              <h2 className="reveal">אז מה בא לך לדעת לנגן?</h2>
              <div className="kit-art-slot" aria-hidden="true">
                <img
                  className="line-art kit-art"
                  src="/marketing/lessons/drum-kit-lines.png"
                  alt=""
                  width="1024"
                  height="1024"
                  loading="lazy"
                />
              </div>
              <p>
                אין תכנית אחת שכולם צריכים לעבור נבין מה בא לך להשיג - ונלמד את הדברים
                שיעזרו לך להגיע לשם
              </p>
            </div>
            <ul className="topics">
              <li>
                <span>לנגן את השירים שאת אוהבת</span>
                <small>לפרק שירים, ללמוד אותם ולנגן מההתחלה ועד הסוף</small>
              </li>
              <li>
                <span>להרגיש טוב על התופים</span>
                <small>לעבוד על גרוב, זמן והקשבה עד שהנגינה שלך באמת יושבת</small>
              </li>
              <li>
                <span>לנגן דברים שלא הצלחת לנגן קודם</span>
                <small>
                  טכניקה, קואורדינציה, מהירות - וכל מה שעומד בינך לבין הדבר שבא לך לנגן
                </small>
              </li>
              <li>
                <span>לנגן עם אנשים</span>
                <small>
                  להבין מה התפקיד של המתופף.ת ואיך גורמים ללהקה להישמע טוב יותר
                </small>
              </li>
            </ul>
          </div>
          <div className="personal-callout">
            <h3>ובינתיים, הכול נשמר</h3>
            <p>מה כבר הצלחתם, על מה עובדים עכשיו ומה הדבר הבא - מחכה לכם באזור האישי</p>
            <figure className="personal-area-shot">
              <img
                src="/marketing/personal-area/schedule-example.png"
                alt="דוגמה אמיתית מהאזור האישי: השיעור הבא בלוז ופירוט שיעורי הבית"
                width="1514"
                height="1222"
                loading="lazy"
              />
              <figcaption>ככה זה נראה אצלכם, לדוגמה</figcaption>
            </figure>
          </div>
        </section>
        <section className="audience section wrap">
          <h2 className="reveal">למי זה מתאים?</h2>
          <div className="audience-grid">
            <div className="audience-tag tag-a reveal">
              <span>מתחילים.ות מוחלטים</span>
            </div>
            <div className="audience-tag tag-b reveal">
              <span>מתקדמים.ות</span>
            </div>
            <div className="audience-tag tag-c reveal">
              <span>ילדים ובני נוער</span>
            </div>
            <div className="audience-tag tag-d reveal">
              <span>מבוגרים.ות</span>
            </div>
          </div>
        </section>
        <section className="studio section">
          <div className="ambient-art art-tel-aviv-note" aria-hidden="true"><img src="/marketing/illustrations/tel-aviv-note.png" alt="" loading="lazy" decoding="async" /></div>
          <div className="wrap">
            <div className="section-grid">
              <div>
                <h2 className="reveal">
                  פה עושים רעש
                  <br />
                  והשכנים אפילו בסדר עם זה
                </h2>
              </div>
              <div className="body-copy">
                <p>הסטודיו נמצא במרכז תל אביב ברחוב דרויאנוב 5</p>
                <p>
                  מגיעים, שמים את הדברים בצד, מתיישבים על התופים ובוחרים מה בא לנגן היום
                  יש מערכת תופים מקצועית, אוזניות וכל מה שצריך - לא צריך להביא כלום
                </p>
                <p>
                  ו<span className="word-color">הכי כיף</span> - הכול מחובר ומוכן להקלטה מסיימים לעבוד על שיר, מקליטים אתכם,
                  ובדרך הביתה כבר שולחים לאמא סרטון שלכם מתופפים :)
                </p>
                <p>
                  והתווים, שיעורי הבית וכל מה שצריך כדי להמשיך בבית? כבר מחכים לכם באזור
                  האישי
                </p>
              </div>
            </div>
            <div className="studio-photos">
              <img
                src="/marketing/lessons/studio.jpg"
                alt="מערכת התופים בסטודיו, על רקע קיר ירוק עם תמונות ותאורה חמה"
                width="1050"
                height="1400"
                loading="lazy"
              />
              <img
                src="/marketing/lessons/studio-detail.jpg"
                alt="זווית נוספת של מערכת התופים בסטודיו"
                width="1050"
                height="1400"
                loading="lazy"
              />
            </div>
          </div>
        </section>
        <aside className="conversion">
          <div className="wrap">
            <h2 className="reveal">
              אם הגעת עד לכאן, כנראה שיש לך חוש קצב
              <br />
              בוא.י לשיעור ניסיון!
            </h2>
            <a
              id="cta2"
              className="btn js-cta cta-b"
              href="https://wa.me/972545379987?text=%D7%94%D7%99%D7%99%20%D7%A2%D7%9E%D7%A8%D7%99%21%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%93%D7%A8%D7%9A%20%D7%94%D7%90%D7%AA%D7%A8%20%D7%95%D7%91%D7%90%20%D7%9C%D7%99%20%D7%9C%D7%A0%D7%A1%D7%95%D7%AA%20%D7%9C%D7%A0%D7%92%D7%9F%20%F0%9F%A5%81"
            >
              בא לי לנגן
              <span className="btn-icon" aria-hidden="true">🥁</span>
            </a>
          </div>
        </aside>
        <section className="practice section">
          <div className="ambient-art art-practice-note" aria-hidden="true"><img src="/marketing/illustrations/practice-note.png" alt="" loading="lazy" decoding="async" /></div>
          <div className="wrap">
            <div className="ambient-art art-drumsticks" aria-hidden="true"><img src="/marketing/illustrations/drumsticks.png" alt="" loading="lazy" decoding="async" /></div>
            <header className="practice-heading">
              <span className="section-label">האזור האישי שלכם</span>
              <h2 className="reveal">
                השיעור נגמר
                <br />
                <em>הדרך ממשיכה</em>
              </h2>
              <p className="practice-lead">אתם לא נשארים לבד עד לשבוע הבא</p>
              <p>לכל מי שלומד אצלי יש אזור אישי שממשיך איתנו משיעור לשיעור</p>
            </header>
            <div className="practice-story">
              <div className="practice-step">
                <div className="step-heading">
                  <span aria-hidden="true">01</span>
                  <h3>יודעים מה לתרגל</h3>
                </div>
                <div>
                  <p>
                    יומיים אחרי השיעור מתיישבים להתאמן ולא זוכרים מה אמרתי? פותחים את
                    הטלפון
                  </p>
                  <p>
                    מחכים שם{" "}
                    <strong>
                      שיעורי הבית, התווים שכתבתי לכם, השירים שאנחנו עובדים עליהם ובאיזה
                      קצב להתחיל
                    </strong>
                  </p>
                  <figure className="personal-area-shot">
                    <img
                      src="/marketing/personal-area/practice-example.png"
                      alt="דוגמה אמיתית מהאזור האישי: תרגול ידיים - דאבלים"
                      width="1486"
                      height="634"
                      loading="lazy"
                    />
                  </figure>
                </div>
              </div>
              <div className="practice-step">
                <div className="step-heading">
                  <span aria-hidden="true">02</span>
                  <h3>
                    נתקעתם?
                    <br />
                    אני כאן
                  </h3>
                </div>
                <div>
                  <p>
                    משהו לא ברור בתרגול? דרך האזור האישי אפשר לענות על כמה שאלות קצרות
                    ולהגיד לי בדיוק איפה נתקעתם ומה לא מסתדר - כדי שנדע על מה צריך לעבוד
                  </p>
                  <figure className="personal-area-shot">
                    <img
                      src="/marketing/personal-area/question-example.png"
                      alt="דוגמה אמיתית מהאזור האישי: שאלה על משימה"
                      width="1422"
                      height="400"
                      loading="lazy"
                    />
                  </figure>
                </div>
              </div>
              <div className="practice-step achievements">
                <div className="step-heading">
                  <span aria-hidden="true">03</span>
                  <h3>
                    רואים את
                    <br />
                    ההתקדמות
                  </h3>
                </div>
                <div>
                  <p className="achievement-lead">והחלק שאני הכי אוהב - ההישגים שלכם.ן</p>
                  <p>
                    הצלחתם לנגן שיר שלם בפעם הראשונה? עברתם קצב שעבדנו עליו כבר חודש?
                    ניגנתן עם עוד מוזיקאים בפעם הראשונה?
                  </p>
                  <p>
                    <strong>זה נכנס לאזור ההישגים שלכם.ן</strong>
                  </p>
                  <p>
                    ככה לאורך הזמן לא רק מרגישים שמתקדמים - אפשר לפתוח את האזור האישי
                    ולראות את כל הדברים שפעם לא ידעתם לעשות והיום כבר כן
                  </p>
                  <figure className="personal-area-shot">
                    <img
                      src="/marketing/personal-area/achievement-example.png"
                      alt="דוגמה אמיתית מהאזור האישי: הישג חדש"
                      width="1534"
                      height="268"
                      loading="lazy"
                    />
                  </figure>
                </div>
              </div>
            </div>
            <div className="practice-outro">
              <img
                className="line-art snare-lines"
                src="/marketing/lessons/snare-lines.png"
                alt=""
                width="1024"
                height="1024"
                loading="lazy"
              />
              <div>
                <h3>וממשיכים משם</h3>
                <p>
                  וכשמגיעים לשיעור הבא, לא מתחילים מחדש
                  <br />
                  אני כבר יודע מה תרגלתם, איפה היה קשה ומה הצלחנו לעשות בפעם הקודמת -
                  וממשיכים משם
                </p>
                <p>
                  <strong>וכן, גם את השיעור הבא קובעים משם :)</strong>
                </p>
                <figure className="personal-area-shot">
                  <img
                    src="/marketing/personal-area/booking-example.png"
                    alt="דוגמה אמיתית מהאזור האישי: ציטוט היום וכפתור קביעת שיעור"
                    width="1572"
                    height="711"
                    loading="lazy"
                  />
                  <figcaption>ככה זה נראה אצלכם, לדוגמה</figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>
        <section className="music section wrap">
          <div className="music-copy">
            <img
              className="headphones-bg"
              src="/marketing/lessons/headphones.png"
              alt=""
              aria-hidden="true"
              width="1536"
              height="1024"
              loading="lazy"
            />
            <h2 className="reveal">בסוף, מנגנים מוזיקה</h2>
            <p>המטרה היא לא להיות אלופות בלנגן תרגילים בחדר לבד</p>
            <p>
              המטרה היא לשים שיר באוזניות ולהרגיש שאתן יושבות עליו בול לעלות לנגן עם
              חברות ולא ללכת לאיבוד לשמוע שיר שאתן אוהבות ופתאום להבין מה המתופפת עושה
              שם
            </p>
            <p>ואולי יום אחד גם לעלות על במה ולספור לכולן:</p>
            <p>
              <strong>
                <bdi>ONE, TWO, THREE, FOUR!</bdi>
              </strong>
            </p>
          </div>
          <figure className="live">
            <img
              src="/marketing/lessons/live.jpg"
              alt="עמרי מנגן עם ההרכב מול קהל בהופעה"
              width="1920"
              height="1505"
              loading="lazy"
            />
            <figcaption>מהסטודיו אל המוזיקה שבחוץ</figcaption>
            <p className="photo-credit">צילום: EilonBphoto</p>
          </figure>
        </section>
        <figure className="quote">
          <blockquote dir="ltr">
            YOU HAVE TO PLAY
            <br />
            <em>FOR THE MUSIC</em>
          </blockquote>
          <figcaption>
            צריך לנגן בשביל המוזיקה<span dir="ltr">— Steve Gadd</span>
          </figcaption>
        </figure>
        <section className="about section wrap">
          <div className="ambient-art art-drummer-illustration" aria-hidden="true"><img src="/marketing/illustrations/drummer-illustration.png" alt="" loading="lazy" decoding="async" /></div>
          <div className="section-grid">
            <div>
              <h2 className="reveal">אהלן, אני עמרי :)</h2>
              <p className="about-note">
                אני מתופף כבר <span className="word-color">11 שנה</span>, ועדיין מתרגש מתופים בצורה קצת מוגזמת
              </p>
            </div>
            <div className="body-copy">
              <p>
                יצא לי לנגן על במות גדולות, בהופעות קטנות, בפסטיבלים, בבתי קפה ובלא מעט
                חדרי חזרות היום אני מנגן ומופיע במסגרות שונות - בין היתר עם{" "}
                <strong>
                  <bdi>Arctic Kartiv</bdi>
                </strong>
                , הרכב המחווה הישראלי ל-<bdi>Arctic Monkeys</bdi>, שאיתו הופענו מול בערך
                800 איש בגגרין בתל אביב, וגם עם הרכבים לאירועים ובהופעות נוספות
              </p>
              <p>
                אבל האמת היא שרוב הדרך שלי בתופים נראתה הרבה פחות זוהרת - שעות של אימונים,
                שירים שלא הצלחתי לנגן, דברים שנתקעתי עליהם שבועות, מורים ששינו לי את הדרך
                שבה אני חושב על הכלי, והרגע הכיפי הזה שמשהו פתאום מצליח
              </p>
              <p>
                אני רוצה שתצאו מהשיעורים שלי עם <span className="word-color">יותר מוזיקה בחיים</span> שתשמעו שירים אחרת,
                שתתלהבו כשמשהו סוף סוף יושב, שתנגנו עם אנשים, ואולי בעוד כמה שנים תסתכלו
                אחורה ולא תבינו איך פעם לא ידעתם לנגן על תופים
              </p>
              <p>
                במהלך השנים זכיתי ללמוד אצל{" "}
                <strong>
                  <bdi>Tom Bollig</bdi>, איתמר ויינשטיין, שי זלמן, שחר אדרי ועופרי נחמיה
                </strong>{" "}
                מכל אחד מהם לקחתי משהו אחר - על נגינה, מוזיקה, אימון ולמידה - ואת הדברים
                האלה אני ממשיך לקחת איתי גם לשיעורים שאני מעביר
              </p>
            </div>
          </div>
        </section>
        <aside className="conversion">
          <div className="wrap">
            <h2 className="reveal">שווה לנסות לפחות פעם אחת בחיים, לא?</h2>
            <a
              id="cta3"
              className="btn js-cta cta-c"
              href="https://wa.me/972545379987?text=%D7%94%D7%99%D7%99%20%D7%A2%D7%9E%D7%A8%D7%99%21%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%93%D7%A8%D7%9A%20%D7%94%D7%90%D7%AA%D7%A8%20%D7%95%D7%91%D7%90%20%D7%9C%D7%99%20%D7%9C%D7%A0%D7%A1%D7%95%D7%AA%20%D7%9C%D7%A0%D7%92%D7%9F%20%F0%9F%A5%81"
            >
              בא לי לנגן
              <span className="btn-icon" aria-hidden="true">🥁</span>
            </a>
          </div>
        </aside>
        <section className="stats section wrap">
          <h2 className="reveal">קצת נתונים</h2>
          <div className="stats-bar reveal">
            <div className="stat-item stat-a">
              <span className="stat-number">3</span>
              <span className="stat-label">שנות ניסיון בהוראה</span>
            </div>
            <div className="stat-item stat-b">
              <span className="stat-number">עשרות</span>
              <span className="stat-label">תלמידים ותלמידות</span>
            </div>
            <div className="stat-item stat-c">
              <span className="stat-number">מאות</span>
              <span className="stat-label">שעות של שיעורי תופים</span>
            </div>
            <div className="stat-item stat-d">
              <span className="stat-number">מאות אלפי</span>
              <span className="stat-label">מכות שהקשבתי להן :)</span>
            </div>
          </div>
        </section>
        <section className="testimonials section wrap">
          <h2 className="reveal">מה התלמידים אומרים</h2>
          <div className="testimonial-grid">
            <blockquote className="testimonial-card reveal">
              <p>
                עמרי הוא מורה מדהים. הגעתי אליו בלי ניסיון בכלל, רק רציתי לדעת לתופף.
                התחלנו ממש מההתחלה - הוא לימד אותי לקרוא תווים, איך להחזיק את המקלות
                ואיך לשבת נכון על התופים. עמרי תמיד מאוד סבלני ומצחיק, ממש כיף איתו
                בשיעור. היום אני כבר מנגן את כל השירים שאני אוהב, מנגן עם חברים,
                ומתכונן עם עמרי למבחני קבלה ללהקה צבאית! ממליץ מאוד על שיעורי התופים
                של עמרי!
              </p>
              <footer>
                יואב, 16<span>לומד שנה וחצי</span>
              </footer>
            </blockquote>
            <blockquote className="testimonial-card reveal">
              <p>
                אני לומדת עם עמרי כבר חצי שנה, וממש ממש אוהבת את השיעורים שלנו :)
                רציתי לבוא לשיעור תופים כי תמיד היה לי את החלום הזה לדעת לנגן על משהו,
                והתופים תמיד היו נראים הכי כיפיים. השעה הזאת בשבוע עוזרת לי מאוד לפרוק
                ולהשתחרר מכל השגרה, והכניסה לי תחביב מדהים לחיים! עמרי ממש מצחיק
                ונחמד, מאוד מקצועי ונעים גם. אני מאזינה להמון מוזיקה מאז, וכל שיר
                שאני אוהבת, אנחנו לומדים ביחד לנגן בשיעור. ממליצה מאוד מאוד לבוא
                לשיעור אצל עמרי :)
              </p>
              <footer>
                יובל, 23<span>לומדת חצי שנה</span>
              </footer>
            </blockquote>
          </div>
        </section>
        <section className="final section wrap" id="start">
          <div>
            <h2 className="reveal">נו, אז מתי מתחילים?</h2>
            <p>
              לוחצים על הכפתור, שולחים לי הודעה בוואטסאפ, מוצאים זמן שמתאים - ונפגשים
              בסטודיו :)
            </p>
            <a
              id="cta4"
              className="btn js-cta cta-d"
              href="https://wa.me/972545379987?text=%D7%94%D7%99%D7%99%20%D7%A2%D7%9E%D7%A8%D7%99%21%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%93%D7%A8%D7%9A%20%D7%94%D7%90%D7%AA%D7%A8%20%D7%95%D7%91%D7%90%20%D7%9C%D7%99%20%D7%9C%D7%A0%D7%A1%D7%95%D7%AA%20%D7%9C%D7%A0%D7%92%D7%9F%20%F0%9F%A5%81"
            >
              יאללה קובעים.ות
              <span className="btn-icon" aria-hidden="true">🥁</span>
            </a>
          </div>
          <img
            className="offer-badge"
            src="/marketing/lessons/lesson-badge-v2.png"
            alt="שיעור ראשון - 199 שקלים, 40 דקות"
            width="1024"
            height="1024"
            loading="lazy"
          />
        </section>
      </main>
      <footer className="wrap">
        <span>עמרי ברגר · שיעורי תופים בתל אביב</span>
        <a href="/students/login">כניסה לתלמידים</a>
      </footer>
      <LessonsBehavior />
    </div>
  );
}
