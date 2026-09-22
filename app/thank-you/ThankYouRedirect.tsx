"use client";

import { useEffect } from "react";

const WHATSAPP_URL =
  "https://wa.me/972545379987?text=%D7%94%D7%99%D7%99%20%D7%A2%D7%9E%D7%A8%D7%99%21%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%93%D7%A8%D7%9A%20%D7%94%D7%90%D7%AA%D7%A8%20%D7%95%D7%91%D7%90%20%D7%9C%D7%99%20%D7%9C%D7%A0%D7%A1%D7%95%D7%AA%20%D7%9C%D7%A0%D7%92%D7%9F%20%F0%9F%A5%81";

export default function ThankYouRedirect() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = WHATSAPP_URL;
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <p className="thank-you-note">מעבירים אתכם.ן לוואטסאפ...</p>
      <a className="thank-you-btn" href={WHATSAPP_URL}>
        פתחו את הוואטסאפ עכשיו
      </a>
    </>
  );
}
