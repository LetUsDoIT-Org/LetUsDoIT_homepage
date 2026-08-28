"use client";

import { useEffect, useId, useRef, useState } from "react";

/**
 * The hero model.
 *
 * One geometry drives everything: each node has a position in the manual
 * layout and a position in the automated layout, and every connector is
 * derived from the current node positions rather than drawn separately.
 * So when the visitor drags the token, the tangle does not "play an
 * animation" — it resolves, because the nodes moved into a line.
 */

type Kind = "start" | "task" | "gateway" | "end" | "service";
type Presence = "both" | "manual" | "auto";

type Node = {
  id: string;
  kind: Kind;
  lines: string[];
  presence: Presence;
  manual: [number, number];
  auto: [number, number];
  /** Ink → automated green as the flow resolves. */
  becomesAutomated?: boolean;
};

const W = 700;
const H = 360;
const TASK_W = 126;
const TASK_H = 54;
const EVENT_R = 16;
const GATE_R = 22;

const NODES: Node[] = [
  {
    id: "start",
    kind: "start",
    lines: ["Ordre lander", "i indbakken"],
    presence: "both",
    manual: [38, 78],
    auto: [38, 176],
  },
  {
    id: "key",
    kind: "task",
    lines: ["Tastes ind i", "økonomisystemet"],
    presence: "manual",
    manual: [162, 44],
    auto: [162, 44],
  },
  {
    id: "check",
    kind: "task",
    lines: ["Tjekkes mod", "lageret i Excel"],
    presence: "manual",
    manual: [162, 182],
    auto: [162, 182],
  },
  {
    id: "ai",
    kind: "service",
    lines: ["AI læser ordren", "og opretter den"],
    presence: "auto",
    manual: [186, 176],
    auto: [186, 176],
  },
  {
    id: "gate",
    kind: "gateway",
    lines: ["Kan vi levere?"],
    presence: "both",
    manual: [322, 110],
    auto: [350, 176],
  },
  {
    id: "call",
    kind: "task",
    lines: ["Ringes til", "leverandøren"],
    presence: "manual",
    manual: [306, 268],
    auto: [306, 268],
  },
  {
    id: "confirm",
    kind: "task",
    lines: ["Bekræftelse", "til kunden"],
    presence: "both",
    manual: [500, 58],
    auto: [516, 176],
    becomesAutomated: true,
  },
  {
    id: "end",
    kind: "end",
    lines: ["Ordre bekræftet"],
    presence: "both",
    manual: [640, 138],
    auto: [636, 176],
  },
];

type Edge = { from: string; to: string; presence: Presence };

const EDGES: Edge[] = [
  { from: "start", to: "key", presence: "manual" },
  { from: "key", to: "check", presence: "manual" },
  { from: "check", to: "gate", presence: "manual" },
  { from: "gate", to: "call", presence: "manual" },
  { from: "call", to: "check", presence: "manual" },
  { from: "start", to: "ai", presence: "auto" },
  { from: "ai", to: "gate", presence: "auto" },
  { from: "gate", to: "confirm", presence: "both" },
  { from: "confirm", to: "end", presence: "both" },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Exponential ease-out, the one curve this page uses. */
const settle = (t: number) => 1 - Math.pow(1 - t, 3);

function halfSize(kind: Kind): [number, number] {
  if (kind === "task" || kind === "service") return [TASK_W / 2, TASK_H / 2];
  if (kind === "gateway") return [GATE_R, GATE_R];
  return [EVENT_R, EVENT_R];
}

function nodePos(node: Node, t: number): [number, number] {
  if (node.presence === "manual") return node.manual;
  if (node.presence === "auto") return node.auto;
  return [lerp(node.manual[0], node.auto[0], t), lerp(node.manual[1], node.auto[1], t)];
}

/**
 * Fades resolve quickly and land on full opacity. A long ramp leaves label
 * text sitting at partial opacity for most of the transition, which is
 * unreadable while it lasts.
 */
function nodeOpacity(node: Node, t: number): number {
  if (node.presence === "manual") return clamp01(1 - t / 0.42);
  if (node.presence === "auto") return clamp01((t - 0.3) / 0.22);
  return 1;
}

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/**
 * Orthogonal connector, the way a modelling tool routes one. A backward
 * edge is routed under the model, which is what produces the crossings in
 * the manual layout — they are a real consequence of the routing, not
 * decoration drawn on top.
 */
function connector(
  from: [number, number],
  fromHalf: [number, number],
  to: [number, number],
  toHalf: [number, number],
): string {
  const [fx, fy] = from;
  const [tx, ty] = to;

  // Near-vertical: drop straight out of the bottom into the top. Without
  // this, a node sitting almost directly below its predecessor is mistaken
  // for a backward edge and routed all the way under the model.
  if (Math.abs(tx - fx) < 60 && ty > fy) {
    const startY = fy + fromHalf[1];
    const endY = ty - toHalf[1];
    if (Math.abs(tx - fx) < 1.5) {
      return `M ${fx} ${startY} V ${endY}`;
    }
    const midY = startY + (endY - startY) / 2;
    return `M ${fx} ${startY} V ${midY} H ${tx} V ${endY}`;
  }

  // A genuine loop back: route under the model, which is what produces the
  // crossings in the manual layout.
  if (tx < fx - 40) {
    const dropY = Math.min(
      H - 10,
      Math.max(fy + fromHalf[1], ty + toHalf[1]) + 40,
    );
    return [
      `M ${fx} ${fy + fromHalf[1]}`,
      `V ${dropY}`,
      `H ${tx}`,
      `V ${ty + toHalf[1]}`,
    ].join(" ");
  }

  const startX = fx + fromHalf[0];
  const endX = tx - toHalf[0];
  if (Math.abs(fy - ty) < 1.5) {
    return `M ${startX} ${fy} H ${endX}`;
  }
  const midX = startX + (endX - startX) / 2;
  return `M ${startX} ${fy} H ${midX} V ${ty} H ${endX}`;
}

function edgeOpacity(edge: Edge, t: number): number {
  if (edge.presence === "manual") return clamp01(1 - t / 0.42);
  if (edge.presence === "auto") return clamp01((t - 0.3) / 0.22);
  return 1;
}

/** The service task has its own tinted fill, so its labels need a halo in
 *  that tint rather than in the pool white every other label sits on. */
const SERVICE_FILL = "#EDF7EE";

function haloFor(node: Node): string {
  return node.kind === "service" ? SERVICE_FILL : "var(--pool)";
}

/** Blend ink → automated green for a node that a machine takes over. */
function strokeFor(node: Node, t: number): string {
  if (node.kind === "service") return "var(--auto-ink)";
  if (node.becomesAutomated && t > 0.6) return "var(--auto-ink)";
  return "var(--ink)";
}

export default function ProcessModel() {
  const [t, setT] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const rafRef = useRef<number | null>(null);
  const gradientId = useId();

  // The authored moment: the model resolves itself once, then hands the
  // control to the visitor. Skipped entirely under reduced motion.
  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || hasInteracted) return;

    const startedAt = performance.now();
    // The tangle is the argument, so it has to be readable before it
    // resolves. A short delay meant most visitors only ever saw the tidy
    // end state.
    const DELAY = 2600;
    const DURATION = 1900;

    const step = (now: number) => {
      const elapsed = now - startedAt - DELAY;
      if (elapsed < 0) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }
      const raw = Math.min(1, elapsed / DURATION);
      setT(settle(raw));
      if (raw < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [hasInteracted]);

  const stopAutoplay = () => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    setHasInteracted(true);
  };

  const positions = new Map<string, [number, number]>(
    NODES.map((n) => [n.id, nodePos(n, t)]),
  );

  return (
    // min-w-0 is load-bearing: without it the grid item sizes to the SVG's
    // min-width and the whole document scrolls sideways instead of the
    // diagram scrolling inside its own container.
    <figure className="w-full min-w-0">
      <div className="relative min-w-0">
      {/* Below the two-column breakpoint the model bleeds out to the lane
          edges. The lane's own padding was costing it ~40px and cutting the
          gateway label in half. The drawing carries its own margin inside
          the viewBox, so it still does not touch the pool edge. */}
      <div className="-mx-5 min-w-0 overflow-x-auto pb-2 md:-mx-12 lg:mx-0">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full min-w-[640px]"
          role="img"
          aria-label="Procesmodel af ordrehåndtering. I den manuelle version går ordren gennem fem trin med tilbageløb. I den automatiserede version læser en AI ordren, og flowet er lige."
        >
          <defs>
            <marker
              id={`${gradientId}-arrow`}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--flow-ink)" />
            </marker>
          </defs>

          {/* Sequence flows, derived from wherever the nodes currently are. */}
          <g>
            {EDGES.map((edge) => {
              const fromNode = NODES.find((n) => n.id === edge.from)!;
              const toNode = NODES.find((n) => n.id === edge.to)!;
              const opacity = edgeOpacity(edge, t);
              if (opacity <= 0.001) return null;
              return (
                <path
                  key={`${edge.from}-${edge.to}`}
                  d={connector(
                    positions.get(edge.from)!,
                    halfSize(fromNode.kind),
                    positions.get(edge.to)!,
                    halfSize(toNode.kind),
                  )}
                  fill="none"
                  stroke="var(--flow-ink)"
                  strokeWidth={1.5}
                  opacity={opacity}
                  markerEnd={`url(#${gradientId}-arrow)`}
                />
              );
            })}
          </g>

          {/* Nodes. */}
          <g>
            {NODES.map((node) => {
              const opacity = nodeOpacity(node, t);
              if (opacity <= 0.001) return null;
              const [x, y] = positions.get(node.id)!;
              const stroke = strokeFor(node, t);

              return (
                <g key={node.id} opacity={opacity}>
                  {node.kind === "task" || node.kind === "service" ? (
                    <>
                      <rect
                        x={x - TASK_W / 2}
                        y={y - TASK_H / 2}
                        width={TASK_W}
                        height={TASK_H}
                        rx={6}
                        fill={node.kind === "service" ? SERVICE_FILL : "var(--pool)"}
                        stroke={stroke}
                        strokeWidth={1.5}
                      />
                      {node.kind === "service" && (
                        // BPMN service-task marker, drawn rather than borrowed.
                        <g
                          transform={`translate(${x - TASK_W / 2 + 9} ${y - TASK_H / 2 + 9})`}
                          stroke="var(--auto-ink)"
                          strokeWidth={1.3}
                          fill="none"
                        >
                          <circle cx="5" cy="5" r="2.1" />
                          <path d="M5 0.4v1.6M5 8v1.6M0.4 5h1.6M8 5h1.6M1.7 1.7l1.1 1.1M7.2 7.2l1.1 1.1M8.3 1.7L7.2 2.8M1.7 8.3l1.1-1.1" />
                        </g>
                      )}
                    </>
                  ) : node.kind === "gateway" ? (
                    <>
                      <path
                        d={`M ${x} ${y - GATE_R} L ${x + GATE_R} ${y} L ${x} ${y + GATE_R} L ${x - GATE_R} ${y} Z`}
                        fill="var(--pool)"
                        stroke={stroke}
                        strokeWidth={1.5}
                      />
                      <path
                        d={`M ${x - 7} ${y - 7} L ${x + 7} ${y + 7} M ${x + 7} ${y - 7} L ${x - 7} ${y + 7}`}
                        stroke={stroke}
                        strokeWidth={1.6}
                      />
                    </>
                  ) : (
                    <circle
                      cx={x}
                      cy={y}
                      r={EVENT_R}
                      fill="var(--pool)"
                      stroke={stroke}
                      strokeWidth={node.kind === "end" ? 3.5 : 1.5}
                    />
                  )}

                  {/* Labels sit inside tasks and beneath events, as in BPMN. */}
                  <text
                    textAnchor="middle"
                    fontSize={node.kind === "task" || node.kind === "service" ? 11.5 : 10.5}
                    fill={
                      node.kind === "service" || (node.becomesAutomated && t > 0.6)
                        ? "var(--auto-ink)"
                        : "var(--ink)"
                    }
                    fontWeight={500}
                    // Halo, the way a diagram or map sets a label: while the
                    // nodes move, a label can pass over a connector, and
                    // without this the glyphs sit on the line unreadably.
                    stroke={haloFor(node)}
                    strokeWidth={3.5}
                    strokeLinejoin="round"
                    style={{ paintOrder: "stroke" }}
                  >
                    {node.lines.map((line, i) => {
                      const isInside = node.kind === "task" || node.kind === "service";
                      // A gateway's label goes above it: the branch edge
                      // leaves through the bottom and would cross it.
                      const blockTop = isInside
                        ? y - (node.lines.length - 1) * 7 + 4
                        : node.kind === "gateway"
                          ? y - GATE_R - 10
                          : y + EVENT_R + 15;
                      return (
                        <tspan key={line} x={x} y={blockTop + i * 14}>
                          {line}
                        </tspan>
                      );
                    })}
                  </text>
                </g>
              );
            })}
          </g>

          {/* BPMN text annotation. The model is illustrative, and says so. */}
          <g opacity={0.85}>
            <path
              d="M 452 250 h -8 v 46 h 8"
              fill="none"
              stroke="var(--ink-mute)"
              strokeWidth={1.2}
            />
            <text fontSize={11} fill="var(--ink-mute)">
              <tspan x={460} y={266}>
                EKSEMPEL — en typisk
              </tspan>
              <tspan x={460} y={280}>
                ordreproces, ikke en
              </tspan>
              <tspan x={460} y={294}>
                kundecase
              </tspan>
            </text>
          </g>
        </svg>
      </div>

      </div>

      {/* The model is wider than a phone, so say so plainly. An edge-fade
          was tried here and dropped: it washed the gateway label to 1.5:1. */}
      <p className="mt-1 text-sm text-ink-mute lg:hidden">
        Træk modellen til siden for at se hele forløbet.
      </p>

      {/* The control. A sequence flow the visitor drags a token along. */}
      <figcaption className="mt-6">
        {/* Once the model has resolved, "drag to automate" is an instruction
            for something already done. Name the move that is still available. */}
        <label
          htmlFor="automation-scrub"
          className="block text-sm font-medium text-ink-soft"
        >
          {t > 0.6
            ? "Træk tilbage for at se processen, som den ser ud i dag"
            : "Træk for at automatisere processen"}
        </label>
        <input
          id="automation-scrub"
          type="range"
          min={0}
          max={1}
          step={0.001}
          value={t}
          onChange={(event) => {
            stopAutoplay();
            setT(Number(event.target.value));
          }}
          onPointerDown={stopAutoplay}
          onKeyDown={stopAutoplay}
          className="scrub mt-3 w-full"
          aria-describedby="automation-scrub-ends"
        />
        <div
          id="automation-scrub-ends"
          className="mt-2 flex justify-between text-xs font-semibold uppercase tracking-[0.16em]"
        >
          <span className="text-ink-mute">Manuelt i dag</span>
          <span className={t > 0.6 ? "text-auto-ink" : "text-ink-mute"}>
            Automatiseret
          </span>
        </div>
      </figcaption>
    </figure>
  );
}
