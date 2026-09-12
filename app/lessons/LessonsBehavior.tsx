"use client";
import { useEffect } from "react";
export default function LessonsBehavior() {
 useEffect(() => {
  const root = document.querySelector(".omri-lessons");
  const anchor = root?.querySelector(".hero-action");
  const sticky = root?.querySelector<HTMLElement>(".sticky");
  const finalSection = root?.querySelector(".final");
  if (!anchor || !sticky || !finalSection) return;
  let frame = 0;
  const update = () => {
   sticky.hidden = anchor.getBoundingClientRect().bottom > 0 || finalSection.getBoundingClientRect().top < window.innerHeight;
   frame = 0;
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  window.addEventListener("pageshow", update);
  update();
  let observer: IntersectionObserver | undefined;
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
   observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add("visible"); observer?.unobserve(entry.target); }
   }), { threshold: 0.15 });
   root?.querySelectorAll(".reveal").forEach(el => observer?.observe(el));
  }
  return () => {
   window.removeEventListener("scroll", schedule);
   window.removeEventListener("resize", schedule);
   window.removeEventListener("pageshow", update);
   if (frame) cancelAnimationFrame(frame);
   observer?.disconnect();
  };
 }, []);
 return null;
}
