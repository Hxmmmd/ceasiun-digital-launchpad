"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Site-wide scroll reveal engine.
 *
 * Mounted once in the root layout. On every route it finds a curated set of
 * content blocks, hides them, and reveals them with a staggered, blur-to-sharp
 * entrance as they enter the viewport. It is intentionally selector-driven so
 * the whole site gains a consistent motion language without editing every page.
 *
 * Fully skipped when the user prefers reduced motion (content stays visible).
 */
const SELECTORS = [
  ".section-head",
  ".service-card",
  ".process-card",
  ".work-card",
  ".capability-card",
  ".deliverable-card",
  ".switcher-card",
  ".product-card",
  ".stats-grid > div",
  ".reasons > p",
  ".faq details",
  ".split > div",
  ".cta-band .shell > *",
  ".page-intro .shell > *",
  ".team-band .shell > *",
  ".contrast .shell > *",
];

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("cs-in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    const prepare = () => {
      for (const selector of SELECTORS) {
        const nodes = document.querySelectorAll<HTMLElement>(selector);
        nodes.forEach((node, index) => {
          // Already revealed — nothing to do.
          if (node.classList.contains("cs-in")) return;
          node.classList.add("cs-reveal");
          if (!node.style.getPropertyValue("--cs-delay")) {
            node.style.setProperty("--cs-delay", `${(index % 8) * 65}ms`);
          }
          // Observing the same node twice on one observer is a no-op, so this
          // stays safe across effect re-runs (e.g. StrictMode) and mutations.
          io.observe(node);
        });
      }
    };

    prepare();
    const timers = [
      window.setTimeout(prepare, 120),
      window.setTimeout(prepare, 400),
    ];

    // Content loads from client-side CMS hooks, so watch briefly for late nodes.
    const mo = new MutationObserver(() => prepare());
    mo.observe(document.body, { childList: true, subtree: true });
    const stop = window.setTimeout(() => mo.disconnect(), 3500);

    return () => {
      io.disconnect();
      mo.disconnect();
      timers.forEach(window.clearTimeout);
      window.clearTimeout(stop);
    };
  }, [pathname]);

  return null;
}
