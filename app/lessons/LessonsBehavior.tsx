"use client";
import { useEffect } from "react";
export default function LessonsBehavior() {
 useEffect(() => {
  const root = document.querySelector(".omri-lessons");
  let observer: IntersectionObserver | undefined;
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
   observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add("visible"); observer?.unobserve(entry.target); }
   }), { threshold: 0.15 });
   root?.querySelectorAll(".reveal").forEach((el, i) => {
    (el as HTMLElement).style.setProperty("--reveal-i", String(i % 4));
    observer?.observe(el);
   });
  }
  return () => observer?.disconnect();
 }, []);
 useEffect(() => {
  const root = document.querySelector(".omri-lessons");
  const btn = root?.querySelector<HTMLElement>("#heroCta");
  const slot = root?.querySelector<HTMLElement>(".topbar-cta-slot");
  const anchor = root?.querySelector(".hero-action");
  if (!btn || !slot || !anchor) return;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const desktop = matchMedia("(min-width: 761px)");
  let docked = false;
  let frame = 0;

  const snapToSlot = () => {
   const target = slot.getBoundingClientRect();
   btn.style.top = `${target.top}px`;
   btn.style.left = `${target.left}px`;
   btn.style.width = `${target.width}px`;
   btn.style.height = `${target.height}px`;
  };

  const dock = (animate: boolean) => {
   docked = true;
   const first = animate ? btn.getBoundingClientRect() : null;
   // .opening has isolation:isolate for the ambient-art layering, which would
   // trap this fixed-position button under the header's own stacking context.
   // Move it out to the page root so its z-index actually competes globally.
   root?.appendChild(btn);
   btn.classList.add("cta-docked");
   snapToSlot();
   if (first && !reduced.matches) {
    const last = btn.getBoundingClientRect();
    const dx = first.left - last.left;
    const dy = first.top - last.top;
    const sx = first.width / last.width;
    const sy = first.height / last.height;
    btn.style.transition = "none";
    btn.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
    btn.getBoundingClientRect();
    requestAnimationFrame(() => {
     btn.style.transition = "transform 480ms cubic-bezier(.2,.7,.3,1)";
     btn.style.transform = "none";
    });
   } else {
    btn.style.transition = "none";
    btn.style.transform = "none";
   }
  };

  const undock = (animate: boolean) => {
   docked = false;
   const first = animate ? btn.getBoundingClientRect() : null;
   btn.classList.remove("cta-docked");
   btn.style.top = "";
   btn.style.left = "";
   btn.style.width = "";
   btn.style.height = "";
   anchor.appendChild(btn);
   if (first && !reduced.matches) {
    const last = btn.getBoundingClientRect();
    const dx = first.left - last.left;
    const dy = first.top - last.top;
    btn.style.transition = "none";
    btn.style.transform = `translate(${dx}px, ${dy}px)`;
    btn.getBoundingClientRect();
    requestAnimationFrame(() => {
     btn.style.transition = "transform 420ms cubic-bezier(.2,.7,.3,1)";
     btn.style.transform = "none";
    });
   } else {
    btn.style.transition = "none";
    btn.style.transform = "none";
   }
  };

  const update = () => {
   frame = 0;
   if (!desktop.matches) {
    if (docked) undock(false);
    return;
   }
   const shouldDock = anchor.getBoundingClientRect().bottom < 0;
   if (shouldDock && !docked) dock(true);
   else if (!shouldDock && docked) undock(true);
   else if (docked) snapToSlot();
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  update();
  return () => {
   window.removeEventListener("scroll", schedule);
   window.removeEventListener("resize", schedule);
   if (frame) cancelAnimationFrame(frame);
  };
 }, []);
 useEffect(() => {
  const root = document.querySelector(".omri-lessons");
  if (!root || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const decorativeClasses = ["snare", "kit-art", "snare-lines", "offer-badge", "headphones-bg", "line-art"];
  const imgs = Array.from(root.querySelectorAll<HTMLImageElement>("img")).filter(img => !img.closest(".ambient-art"));
  imgs.forEach(img => {
   const decorative = decorativeClasses.some(c => img.classList.contains(c));
   img.classList.add(decorative ? "img-fade-motion" : "img-fade-full");
  });
  const observer = new IntersectionObserver(entries => {
   entries.forEach(entry => entry.target.classList.toggle("in-view", entry.isIntersecting));
  }, { threshold: 0.12 });
  imgs.forEach(img => observer.observe(img));
  return () => observer.disconnect();
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
 useEffect(() => {
  const root = document.querySelector(".omri-lessons");
  if (!root) return;
  const bar = document.createElement("div");
  bar.className = "scroll-progress";
  bar.setAttribute("aria-hidden", "true");
  root.prepend(bar);
  let frame = 0;
  const update = () => {
   frame = 0;
   const scrollable = document.documentElement.scrollHeight - window.innerHeight;
   const pct = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
   bar.style.setProperty("--progress", String(pct));
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  update();
  return () => {
   window.removeEventListener("scroll", schedule);
   window.removeEventListener("resize", schedule);
   if (frame) cancelAnimationFrame(frame);
   bar.remove();
  };
 }, []);
 return null;
}
