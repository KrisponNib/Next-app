import type { Metadata } from "next";
import "../lessons.css";
import "./thank-you.css";
import ThankYouRedirect from "./ThankYouRedirect";

export const metadata: Metadata = {
  title: "תודה! - עמרי ברגר",
};

export default function ThankYouPage() {
  return (
    <div className="omri-lessons thank-you-page">
      <div className="thank-you-card">
        <img
          className="thank-you-art"
          src="/marketing/thank-you/rooftop-drummer.webp"
          alt="מתופף מנגן על גג בתל אביב עם נוף עירוני ברקע"
          width={1680}
          height={945}
        />
        <h1>תודה שכתבתם.ן לי! ניפגש בקרוב{" "}:)</h1>
        <ThankYouRedirect />
      </div>
    </div>
  );
}
