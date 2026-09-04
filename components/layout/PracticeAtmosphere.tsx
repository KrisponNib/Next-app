"use client";

import { useEffect, useState } from "react";

export function PracticeAtmosphere() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", onScroll); };
  }, []);
  return <div className="practice-atmosphere" aria-hidden="true">
    <div className="atmo-blob atmo-blob-burgundy" style={{ transform: `translate3d(0, ${scrollY * .055}px, 0) rotate(-8deg)` }} />
    <div className="atmo-blob atmo-blob-green" style={{ transform: `translate3d(0, ${scrollY * -.035}px, 0) rotate(11deg)` }} />
    <svg className="atmo-cymbal" viewBox="0 0 220 130" style={{ transform: `translate3d(0, ${scrollY * .08}px, 0) rotate(-7deg)` }}><ellipse cx="110" cy="66" rx="92" ry="28"/><path d="M38 66c24-10 120-10 144 0M109 38v-16M99 38c4-9 18-9 22 0"/><circle cx="110" cy="66" r="5"/></svg>
    <svg className="atmo-sticks" viewBox="0 0 190 190" style={{ transform: `translate3d(0, ${scrollY * -.06}px, 0) rotate(7deg)` }}><path d="M37 161 146 25M58 170 164 43"/><path d="M143 28c6-10 14-14 18-10s0 12-10 18M161 46c6-10 14-14 18-10s0 12-10 18"/></svg>
    <svg className="atmo-snare" viewBox="0 0 220 190" style={{ transform: `translate3d(0, ${scrollY * .04}px, 0) rotate(4deg)` }}><ellipse cx="110" cy="50" rx="74" ry="24"/><path d="M36 50v78c0 14 33 27 74 27s74-13 74-27V50M47 71h126M47 132h126M67 65v72M101 73v70M136 70v70M160 64v71"/></svg>
    <div className="atmo-rhythm" style={{ transform: `translate3d(0, ${scrollY * -.025}px, 0)` }}>R&nbsp; L&nbsp; R&nbsp; R&nbsp;&nbsp; · &nbsp;&nbsp;L&nbsp; R&nbsp; L&nbsp; L</div>
  </div>;
}
