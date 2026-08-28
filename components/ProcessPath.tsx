"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Navigation as the model's own sequence flow. In BPMN, execution is a
 * token moving through the flow — so the visitor's scroll position is the
 * token, and the lit node says where the work is right now.
 */
const STEPS = [
  { id: "problemet", label: "Problemet" },
  { id: "metoden", label: "Metoden" },
  { id: "ydelser", label: "Ydelser" },
  { id: "hvem", label: "Hvem" },
  { id: "kontakt", label: "Kontakt" },
];

export default function ProcessPath() {
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = STEPS.findIndex((step) => step.id === visible.target.id);
        if (index !== -1) setActiveIndex(index);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0.05, 0.3, 0.6] },
    );

    STEPS.forEach((step) => {
      const el = document.getElementById(step.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const progress =
    activeIndex < 0 ? 0 : (activeIndex / (STEPS.length - 1)) * 100;

  return (
    // Solid, not translucent: a blur under a 95%-opaque fill renders nothing.
    <header className="sticky top-0 z-50 border-b border-rule bg-pool">
      {/* The inner box matches the pool's own 1300px frame and page inset, so
          the bar reads as the pool's top edge rather than a slab laid over it. */}
      <div className="px-3 lg:px-10">
      <nav
        aria-label="Sektioner"
        className="mx-auto flex max-w-[1300px] items-center gap-6 px-5 py-3 md:px-12"
      >
        <a
          href="#top"
          className="shrink-0 rounded-sm"
          aria-label="LetUsDoIT — til toppen"
        >
          <Image
            src="/images/logo/LetUsDoIT-logo-light.jpeg"
            alt="LetUsDoIT"
            width={180}
            height={60}
            className="h-9 w-auto"
            priority
          />
        </a>

        <ol className="relative hidden flex-1 items-center justify-between lg:flex">
          {/* The flow the token travels, and the trail it has covered. */}
          <span
            aria-hidden
            className="absolute left-0 right-0 top-[7px] h-px bg-rule"
          />
          <span
            aria-hidden
            className="absolute left-0 top-[7px] h-px bg-flow-ink transition-[width] duration-700 ease-settle"
            style={{ width: `${progress}%` }}
          />

          {STEPS.map((step, index) => {
            const isActive = index === activeIndex;
            const isPassed = index < activeIndex;
            return (
              // No background here: the node circles mask the flow line by
              // themselves, and a bare background box left the labels sitting
              // flush against its bottom edge.
              <li key={step.id} className="relative z-10 px-2 first:pl-0 last:pr-0">
                <a
                  href={`#${step.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className="group flex flex-col items-center gap-2"
                >
                  <span
                    className={[
                      "block h-[15px] w-[15px] rounded-full border-2 transition-all duration-500 ease-settle",
                      isActive
                        ? "scale-110 border-flow-ink bg-flow-ink"
                        : isPassed
                          ? "border-flow-ink bg-pool"
                          : "border-rule bg-pool group-hover:border-ink-mute",
                    ].join(" ")}
                  />
                  <span
                    className={[
                      "text-xs font-semibold uppercase tracking-[0.14em] transition-colors",
                      isActive ? "text-ink" : "text-ink-mute group-hover:text-ink",
                    ].join(" ")}
                  >
                    {step.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>

        <a
          href="#kontakt"
          className="ml-auto shrink-0 bg-act px-4 py-2.5 text-sm font-semibold text-ink shadow-[0_2px_8px_rgba(0,46,69,0.18)] transition-transform duration-300 ease-settle hover:-translate-y-px lg:ml-0"
        >
          Book en gennemgang
        </a>
      </nav>
      </div>
    </header>
  );
}
