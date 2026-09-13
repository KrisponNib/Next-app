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
 useEffect(() => {
  const root = document.querySelector(".omri-lessons");
  if (!root) return;
  const sections = Array.from(root.querySelectorAll<HTMLElement>("section"));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
  let frame = 0;
  const update = () => {
   frame = 0;
   sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const progress = Math.max(-1, Math.min(1, (innerHeight / 2 - rect.top - rect.height / 2) / innerHeight));
    section.style.setProperty("--art-scroll", reduced.matches ? "0px" : `${progress * 24}px`);
   });
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
  const reset = (section: HTMLElement) => {
   section.style.removeProperty("--art-x");
   section.style.removeProperty("--art-y");
   section.style.removeProperty("--art-rotate");
  };
  const move = (event: PointerEvent) => {
   if (reduced.matches || !finePointer.matches) return;
   const section = event.currentTarget as HTMLElement;
   const rect = section.getBoundingClientRect();
   const x = (event.clientX - rect.left) / rect.width - .5;
   const y = (event.clientY - rect.top) / rect.height - .5;
   section.style.setProperty("--art-x", `${x * 14}px`);
   section.style.setProperty("--art-y", `${y * 10}px`);
   section.style.setProperty("--art-rotate", `${x * 3}deg`);
  };
  const leave = (event: PointerEvent) => reset(event.currentTarget as HTMLElement);
  const preferenceChanged = () => { sections.forEach(reset); schedule(); };
  sections.forEach(section => {
   section.addEventListener("pointermove", move, { passive: true });
   section.addEventListener("pointerleave", leave);
  });
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  reduced.addEventListener("change", preferenceChanged);
  update();
  return () => {
   cancelAnimationFrame(frame);
   window.removeEventListener("scroll", schedule);
   window.removeEventListener("resize", schedule);
   reduced.removeEventListener("change", preferenceChanged);
   sections.forEach(section => {
    section.removeEventListener("pointermove", move);
    section.removeEventListener("pointerleave", leave);
    section.style.removeProperty("--art-scroll");
    reset(section);
   });
  };
 }, []);
 return null;
}
