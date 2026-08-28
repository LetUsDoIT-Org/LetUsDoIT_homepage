import type { ReactNode } from "react";

/**
 * One lane of the pool. The lane name sits in the gutter against the lane
 * edge, which is where a modelling tool puts it — not as a label floating
 * above the heading.
 */
export default function Lane({
  id,
  name,
  tone = "pool",
  children,
}: {
  id?: string;
  name: string;
  tone?: "pool" | "ink";
  children: ReactNode;
}) {
  const isInk = tone === "ink";

  return (
    <section
      id={id}
      className={[
        "border-t border-rule scroll-mt-16",
        isInk ? "on-ink bg-ink text-canvas" : "bg-pool",
      ].join(" ")}
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-[36px_1fr] md:grid-cols-[64px_1fr]">
        <div
          className={[
            // items-start matters: a stretched flex item pushes the rotated
            // lane name to the bottom of the lane instead of the top.
            "flex items-start justify-center border-r pt-14",
            isInk ? "border-white/20 text-canvas/70" : "border-rule text-ink-mute",
          ].join(" ")}
        >
          <span className="lane-name">{name}</span>
        </div>
        <div className="px-5 py-16 md:px-12 md:py-24">{children}</div>
      </div>
    </section>
  );
}
