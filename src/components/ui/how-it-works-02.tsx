"use client";

import { useEffect, useRef } from "react";
import {
  MessageSquare,
  Search,
  ClipboardList,
  FileSignature,
  Rocket,
  RefreshCw,
  PackageCheck,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";

/** Default icons mapped to the eight Ceasiun delivery steps. */
const defaultIcons: LucideIcon[] = [
  MessageSquare, // Discussion
  Search, // Discovery
  ClipboardList, // Planning
  FileSignature, // Contract
  Rocket, // Execute
  RefreshCw, // Review
  PackageCheck, // Delivery
  LifeBuoy, // Support
];

interface HowItWorksStep {
  title: string;
  description: string;
}

interface HowItWorks02Props {
  eyebrow?: string;
  heading?: string;
  steps: HowItWorksStep[];
  icons?: LucideIcon[];
}

export default function HowItWorks02({
  eyebrow = "How it works",
  heading = "A four-step path from blank page to launched site",
  steps,
  icons = defaultIcons,
}: HowItWorks02Props) {
  const listRef = useRef<HTMLOListElement>(null);

  /* ── Scroll-triggered staggered reveal ── */
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ol = listRef.current;
    if (!ol) return;

    const items = ol.querySelectorAll<HTMLElement>(".hiw-step");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("hiw-in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -4% 0px" },
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [steps]);

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6 sm:px-10">
        {/* ── Header ── */}
        <div className="flex flex-col gap-3 text-center">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {eyebrow}
          </span>
          <h2
            className="text-balance font-semibold tracking-tight"
            style={{
              fontSize: "clamp(1.85rem, 4vw, 2.75rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
            }}
          >
            {heading}
          </h2>
        </div>

        {/* ── Timeline ── */}
        <ol
          ref={listRef}
          className="hiw-timeline relative mt-14 flex flex-col gap-6 pl-10 sm:pl-12"
        >
          {steps.map((s, i) => {
            const Icon = icons[i % icons.length];
            return (
              <li
                key={s.title}
                className="hiw-step group relative"
                style={{ "--hiw-delay": `${i * 90}ms` } as React.CSSProperties}
              >
                {/* Step number bubble */}
                <span className="hiw-badge absolute -left-[3.65rem] top-1 grid size-9 place-items-center rounded-full border border-border bg-card font-mono text-xs font-semibold text-foreground shadow-sm shadow-black/5 sm:-left-[4.15rem]">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Card */}
                <div className="hiw-card flex items-start gap-3 rounded-xl border border-border bg-card p-4 sm:p-5">
                  {/* Icon */}
                  <span className="hiw-icon grid size-9 shrink-0 place-items-center rounded-lg bg-foreground/5 text-foreground">
                    <Icon className="size-4" />
                  </span>

                  {/* Copy */}
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold tracking-tight text-foreground">
                      {s.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {s.description}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
