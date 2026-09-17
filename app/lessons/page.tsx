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
          <a
            className="topbar-login"
            href="https://wa.me/972545379987?text=%D7%94%D7%99%D7%99%20%D7%A2%D7%9E%D7%A8%D7%99%21%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%93%D7%A8%D7%9A%20%D7%94%D7%90%D7%AA%D7%A8%20%D7%95%D7%91%D7%90%20%D7%9C%D7%99%20%D7%9C%D7%A0%D7%A1%D7%95%D7%AA%20%D7%9C%D7%A0%D7%92%D7%9F%20%F0%9F%A5%81"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="topbar-cta-pill">בואו לשיעור נסיון!</span>
          </a>
          <span className="logo">
            <span className="logo-line1">עמרי ברגר</span>
            <span className="logo-line2">מורה לתופים</span>
          </span>
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
        </div>
      </header>
      <a
        className="whatsapp-fab"
        href="https://wa.me/972545379987?text=%D7%94%D7%99%D7%99%20%D7%A2%D7%9E%D7%A8%D7%99%21%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%93%D7%A8%D7%9A%20%D7%94%D7%90%D7%AA%D7%A8%20%D7%95%D7%91%D7%90%20%D7%9C%D7%99%20%D7%9C%D7%A0%D7%A1%D7%95%D7%AA%20%D7%9C%D7%A0%D7%92%D7%9F%20%F0%9F%A5%81"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="שלחו לי הודעת וואטסאפ"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.58-.487-.501-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.36.101 11.943c0 2.105.549 4.16 1.595 5.974L0 24l6.335-1.66a11.882 11.882 0 0 0 5.71 1.454h.005c6.582 0 11.94-5.362 11.943-11.944a11.86 11.86 0 0 0-3.473-8.401"
          />
        </svg>
        <span className="whatsapp-fab-text">לחצו לקביעת שיעור!</span>
      </a>
      <main id="main">
        <section className="opening wrap" aria-labelledby="hero-title">
          <div className="ambient-art art-cymbal-illustration" aria-hidden="true"><img src="/marketing/illustrations/cymbal-illustration.png" alt="" loading="lazy" decoding="async" /></div>
          <div className="hero-copy">
            <div className="ambient-art art-drumsticks-hero" aria-hidden="true"><img src="/marketing/illustrations/drumsticks.png" alt="" loading="lazy" decoding="async" /></div>
            <h1 id="hero-title">
              תמיד חלמת
              <br />
              לנגן על תופים?
            </h1>
          </div>
          <figure className="hero-photo">
            <div className="hero-photo-frame">
              <img
                src="/marketing/lessons/stage.jpg"
                alt="עמרי על הבמה, מאחורי מערכת התופים עם מקלות מורמים"
                width="1280"
                height="1920"
                fetchPriority="high"
              />
              <figcaption>
                <span className="photo-credit">
                  <bdi>EilonBphoto</bdi>
                </span>
                <bdi>Arctic Kartiv</bdi>
              </figcaption>
            </div>
            <p className="sub">עכשיו זה הזמן להתחיל!</p>
          </figure>
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
            <div className="ambient-art art-snare-behind" aria-hidden="true"><img src="/marketing/lessons/snare.png" alt="" loading="lazy" decoding="async" /></div>
            <h2 className="reveal staircase">
              <span className="stair stair-1">קובעים</span>
              <span className="stair stair-2">מגיעים</span>
              <em className="stair stair-3">מנגנים</em>
            </h2>
            <div className="body-copy">
              <p>לא צריך לדעת כלום על מוזיקה לפני שמגיעים לשיעור הראשון!</p>
              <p>תבואו, נכיר קצת, תתיישבו על התופים - ותתחילו לנגן!</p>
              <p>ולפני שתשימו לב, כבר נקליט <span className="word-color">שיר ראשון</span> להשמיע למשפחה ולחברים :)</p>
              <p className="first-personal-note">ומה נלמד בשיעורים?</p>
            </div>
          </div>
        </section>

        <section className="personal wrap section">
          <div className="section-grid">
            <div>
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
        </section>
        <section className="audience section wrap">
          <h2 className="reveal">למי זה מתאים?</h2>
          <div className="audience-grid">
            <div className="audience-tag tag-a reveal">
              <span>למי שלא תופפה בחיים</span>
            </div>
            <div className="audience-tag tag-b reveal">
              <span>למתופפים שמכירים את המערכת</span>
            </div>
            <div className="audience-tag tag-c reveal">
              <span>לילדים ובני נוער שמחפשים תחביב מדהים</span>
            </div>
            <div className="audience-tag tag-d reveal">
              <span>לא.נשים שירצו לפרוק אחרי העבודה</span>
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
                <p>
                  הסטודיו נמצא במרכז תל אביב, ברחוב דרויאנוב 5 - מגיעים, מתיישבים על
                  התופים ומתחילים. יש הכל: מערכת מקצועית, אוזניות וכל מה שצריך.
                </p>
                <p>
                  ו<span className="word-color">הכי כיף</span> - הכול מוקלט, אז בדרך
                  הביתה כבר שולחים לאמא סרטון שלכם מתופפים :)
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
        <aside className="conversion conversion-intro">
          <div className="wrap">
            <h2 className="reveal">
              אם הגעת עד לכאן, כנראה שיש לך חוש קצב
              <br />
              בוא.י לשיעור ניסיון!
            </h2>
            <a
              className="btn"
              href="https://wa.me/972545379987?text=%D7%94%D7%99%D7%99%20%D7%A2%D7%9E%D7%A8%D7%99%21%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%93%D7%A8%D7%9A%20%D7%94%D7%90%D7%AA%D7%A8%20%D7%95%D7%91%D7%90%20%D7%9C%D7%99%20%D7%9C%D7%A0%D7%A1%D7%95%D7%AA%20%D7%9C%D7%A0%D7%92%D7%9F%20%F0%9F%A5%81"
            >
              בא לי לנגן
              <img className="btn-icon" src="/marketing/illustrations/btn-drumsticks.png" alt="" aria-hidden="true" width="96" height="65" />
            </a>
          </div>
        </aside>
        <section className="practice section">
          <div className="ambient-art art-practice-note" aria-hidden="true"><img src="/marketing/illustrations/practice-note.png" alt="" loading="lazy" decoding="async" /></div>
          <div className="wrap">
            <div className="ambient-art art-drumsticks" aria-hidden="true"><img src="/marketing/illustrations/drumsticks.png" alt="" loading="lazy" decoding="async" /></div>
            <header className="practice-heading">
              <h2 className="reveal">והחלק המטורף, אתן לא נשארות לבד עד לשבוע הבא</h2>
              <p className="practice-lead">
                לכל מי שלומד אצלי יש אזור אישי שמלווה אותו לאורך השיעורים!
              </p>
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
                  <h3>נתקעתם? אני כאן</h3>
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
                  <h3>רואים את ההתקדמות</h3>
                </div>
                <div>
                  <p>
                    הצלחתם לנגן שיר שלם בפעם הראשונה? עברתם קצב שעבדנו עליו כבר חודש?{" "}
                    <strong>זה נכנס לאזור ההישגים שלכם.ן</strong>
                  </p>
                  <p>
                    ככה רואים לאורך הזמן את כל הדברים שפעם לא ידעתם לעשות והיום כבר כן
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
              המטרה היא לשים שיר באוזניות ולהרגיש שאתן יושבות עליו <strong>בול</strong>
              <br />
              לעלות לנגן עם חברות <strong>ולא ללכת לאיבוד!</strong>
              <br />
              לשמוע שיר שאתן אוהבות ופתאום <strong>להבין מה המתופפת עושה שם!</strong>
            </p>
            <p>ואולי יום אחד גם לעלות על במה ולספור לכולן:</p>
            <p>
              <strong>
                <bdi>ONE, TWO, THREE, FOUR!</bdi>
              </strong>
            </p>
          </div>
          <figure className="live">
            <div className="live-photo-frame">
              <img
                src="/marketing/lessons/live.jpg"
                alt="עמרי מנגן עם ההרכב מול קהל בהופעה"
                width="1920"
                height="1505"
                loading="lazy"
              />
              <p className="photo-credit">
                <bdi>EilonBphoto</bdi>
              </p>
            </div>
          </figure>
        </section>
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
              className="btn"
              href="https://wa.me/972545379987?text=%D7%94%D7%99%D7%99%20%D7%A2%D7%9E%D7%A8%D7%99%21%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%93%D7%A8%D7%9A%20%D7%94%D7%90%D7%AA%D7%A8%20%D7%95%D7%91%D7%90%20%D7%9C%D7%99%20%D7%9C%D7%A0%D7%A1%D7%95%D7%AA%20%D7%9C%D7%A0%D7%92%D7%9F%20%F0%9F%A5%81"
            >
              בא לי לנגן
              <img className="btn-icon" src="/marketing/illustrations/btn-drumsticks.png" alt="" aria-hidden="true" width="96" height="65" />
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
                עמרי הוא מורה מדהים. הגעתי בלי שום ניסיון, והתחלנו ממש מההתחלה - איך
                להחזיק מקלות, לשבת נכון ולקרוא תווים. הוא תמיד סבלני ומצחיק, וממש כיף
                בשיעורים. היום אני כבר מנגן שירים שאני אוהב, מנגן עם חברים, ואפילו
                מתכונן איתו למבחני קבלה ללהקה צבאית! ממליץ בחום.
              </p>
              <footer>
                יואב, 16<span>לומד שנה וחצי</span>
              </footer>
            </blockquote>
            <blockquote className="testimonial-card reveal">
              <p>
                אני לומדת עם עמרי כבר חצי שנה, וממש אוהבת את השיעורים שלנו :) תמיד
                חלמתי לדעת לנגן על משהו, והתופים תמיד נראו לי הכי כיפיים. השעה הזאת
                בשבוע עוזרת לי לפרוק מהשגרה, ועמרי מקצועי, נחמד ומצחיק. כל שיר שאני
                אוהבת - לומדים אותו ביחד בשיעור. ממליצה בחום לבוא לשיעור אצלו :)
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
            <div className="final-cta">
              <a
                className="btn"
                href="https://wa.me/972545379987?text=%D7%94%D7%99%D7%99%20%D7%A2%D7%9E%D7%A8%D7%99%21%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%93%D7%A8%D7%9A%20%D7%94%D7%90%D7%AA%D7%A8%20%D7%95%D7%91%D7%90%20%D7%9C%D7%99%20%D7%9C%D7%A0%D7%A1%D7%95%D7%AA%20%D7%9C%D7%A0%D7%92%D7%9F%20%F0%9F%A5%81"
              >
                יאללה קובעים.ות
                <img className="btn-icon" src="/marketing/illustrations/btn-drumsticks.png" alt="" aria-hidden="true" width="96" height="65" />
              </a>
              <img
                className="offer-badge"
                src="/marketing/lessons/lesson-badge-v2.png"
                alt="שיעור ראשון - 199 שקלים, 40 דקות"
                width="1024"
                height="1024"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </main>
      <LessonsBehavior />
    </div>
  );
}
