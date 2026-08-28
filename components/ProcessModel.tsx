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
 *
 * There are two coordinate sets. Wide is the landscape drawing used from
 * `md` up. Tall stacks the same nodes vertically for phones, so the model
 * fits the screen instead of demanding a sideways swipe to reach its own
 * conclusion. Both render; CSS picks one, which keeps the choice out of
 * JavaScript and avoids a layout flash on first paint.
 */

type Kind = "start" | "task" | "gateway" | "end" | "service";
type Presence = "both" | "manual" | "auto";
type Point = [number, number];

type Frame = {
  W: number;
  H: number;
  taskW: number;
  taskH: number;
  eventR: number;
  gateR: number;
  fontTask: number;
  fontEvent: number;
  lineStep: number;
};

const WIDE: Frame = {
  W: 700,
  H: 360,
  taskW: 126,
  taskH: 54,
  eventR: 16,
  gateR: 22,
  fontTask: 11.5,
  fontEvent: 10.5,
  lineStep: 14,
};

const TALL: Frame = {
  W: 320,
  H: 800,
  taskW: 176,
  taskH: 58,
  eventR: 18,
  gateR: 24,
  fontTask: 12.5,
  fontEvent: 11.5,
  lineStep: 15,
};

/**
 * Three processes, one skeleton. The shape of "something arrives, someone
 * rekeys it, someone checks it, a question comes up, someone chases it" is
 * the same in every small company; only the nouns change. Giving the visitor
 * a process they actually recognise matters more than a fourth diagram, and
 * it stops the page reading as though it were only about order handling.
 */
type Scenario = {
  id: string;
  label: string;
  /** What the model is a model OF, for the accessible description. */
  subject: string;
  labels: Record<string, string[]>;
};

const SCENARIOS: Scenario[] = [
  {
    id: "ordre",
    label: "Ordrehåndtering",
    subject: "ordrehåndtering",
    labels: {
      start: ["Ordre lander", "i indbakken"],
      key: ["Tastes ind i", "økonomisystemet"],
      check: ["Tjekkes mod", "lageret i Excel"],
      ai: ["AI læser ordren", "og opretter den"],
      gate: ["Kan vi levere?"],
      call: ["Ringes til", "leverandøren"],
      confirm: ["Bekræftelse", "til kunden"],
      end: ["Ordre bekræftet"],
    },
  },
  {
    id: "faktura",
    label: "Fakturabehandling",
    subject: "fakturabehandling",
    labels: {
      start: ["Faktura kommer", "på mail"],
      key: ["Beløb tastes", "i bogføringen"],
      check: ["Holdes op mod", "indkøbsordren"],
      ai: ["AI aflæser og", "matcher fakturaen"],
      gate: ["Stemmer beløbet?"],
      call: ["Mails frem", "og tilbage"],
      confirm: ["Sendes til", "godkendelse"],
      end: ["Faktura bogført"],
    },
  },
  {
    id: "henvendelser",
    label: "Kundehenvendelser",
    subject: "kundehenvendelser",
    labels: {
      start: ["Spørgsmål lander", "i postkassen"],
      key: ["Fordeles manuelt", "til en kollega"],
      check: ["Der søges efter", "et svar"],
      ai: ["AI svarer på", "det, den kan"],
      gate: ["Kender vi svaret?"],
      call: ["Spørges videre", "internt"],
      confirm: ["Svar skrives", "til kunden"],
      end: ["Henvendelse lukket"],
    },
  },
];

type Node = {
  id: string;
  kind: Kind;
  presence: Presence;
  wideManual: Point;
  wideAuto: Point;
  tallManual: Point;
  tallAuto: Point;
  /** Ink → automated green as the flow resolves. */
  becomesAutomated?: boolean;
};

const NODES: Node[] = [
  {
    id: "start",
    kind: "start",
    presence: "both",
    wideManual: [38, 78],
    wideAuto: [38, 176],
    tallManual: [150, 36],
    tallAuto: [150, 60],
  },
  {
    id: "key",
    kind: "task",
    presence: "manual",
    wideManual: [162, 44],
    wideAuto: [162, 44],
    tallManual: [150, 140],
    tallAuto: [150, 140],
  },
  {
    id: "check",
    kind: "task",
    presence: "manual",
    wideManual: [162, 182],
    wideAuto: [162, 182],
    tallManual: [150, 265],
    tallAuto: [150, 265],
  },
  {
    id: "ai",
    kind: "service",
    presence: "auto",
    wideManual: [186, 176],
    wideAuto: [186, 176],
    tallManual: [150, 210],
    tallAuto: [150, 210],
  },
  {
    id: "gate",
    kind: "gateway",
    presence: "both",
    wideManual: [322, 110],
    wideAuto: [350, 176],
    tallManual: [150, 390],
    tallAuto: [150, 360],
  },
  {
    id: "call",
    kind: "task",
    presence: "manual",
    wideManual: [306, 268],
    wideAuto: [306, 268],
    tallManual: [150, 515],
    tallAuto: [150, 515],
  },
  {
    id: "confirm",
    kind: "task",
    presence: "both",
    wideManual: [500, 58],
    wideAuto: [516, 176],
    tallManual: [150, 640],
    tallAuto: [150, 510],
    becomesAutomated: true,
  },
  {
    id: "end",
    kind: "end",
    presence: "both",
    wideManual: [640, 138],
    wideAuto: [636, 176],
    tallManual: [150, 750],
    tallAuto: [150, 650],
  },
];

type Edge = {
  from: string;
  to: string;
  presence: Presence;
  /**
   * In the tall layout the gateway's two branches would both descend the
   * same column and overlap. This one routes down the right-hand channel,
   * which is what a modelling tool does with a second branch.
   */
  tallChannel?: "right";
};

const EDGES: Edge[] = [
  { from: "start", to: "key", presence: "manual" },
  { from: "key", to: "check", presence: "manual" },
  { from: "check", to: "gate", presence: "manual" },
  { from: "gate", to: "call", presence: "manual" },
  { from: "call", to: "check", presence: "manual" },
  { from: "start", to: "ai", presence: "auto" },
  { from: "ai", to: "gate", presence: "auto" },
  { from: "gate", to: "confirm", presence: "both", tallChannel: "right" },
  { from: "confirm", to: "end", presence: "both" },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/** Exponential ease-out, the one curve this page uses. */
const settle = (t: number) => 1 - Math.pow(1 - t, 3);

/** The service task has its own tinted fill, so its labels need a halo in
 *  that tint rather than in the pool white every other label sits on. */
const SERVICE_FILL = "#EDF7EE";

function haloFor(node: Node): string {
  return node.kind === "service" ? SERVICE_FILL : "var(--pool)";
}

function halfSize(kind: Kind, f: Frame): Point {
  if (kind === "task" || kind === "service") return [f.taskW / 2, f.taskH / 2];
  if (kind === "gateway") return [f.gateR, f.gateR];
  return [f.eventR, f.eventR];
}

function nodePos(node: Node, t: number, tall: boolean): Point {
  const manual = tall ? node.tallManual : node.wideManual;
  const auto = tall ? node.tallAuto : node.wideAuto;
  if (node.presence === "manual") return manual;
  if (node.presence === "auto") return auto;
  return [lerp(manual[0], auto[0], t), lerp(manual[1], auto[1], t)];
}

/**
 * Fades resolve quickly and land on full opacity. A long ramp leaves label
 * text sitting at partial opacity for most of the transition, which is
 * unreadable while it lasts.
 */
function presenceOpacity(presence: Presence, t: number): number {
  if (presence === "manual") return clamp01(1 - t / 0.42);
  if (presence === "auto") return clamp01((t - 0.3) / 0.22);
  return 1;
}

/**
 * Orthogonal connector, the way a modelling tool routes one. Every route is
 * derived from wherever the two nodes currently are.
 */
function connector(
  from: Point,
  fromHalf: Point,
  to: Point,
  toHalf: Point,
  f: Frame,
  channel?: "right",
): string {
  const [fx, fy] = from;
  const [tx, ty] = to;

  // A second branch that would otherwise overlap the first: out the right
  // side, down the channel, and back in from the right.
  if (channel === "right") {
    const channelX = Math.min(f.W - 12, Math.max(fx, tx) + Math.max(fromHalf[0], toHalf[0]) + 26);
    return [
      `M ${fx + fromHalf[0]} ${fy}`,
      `H ${channelX}`,
      `V ${ty}`,
      `H ${tx + toHalf[0]}`,
    ].join(" ");
  }

  // A loop back up the same column: out the left side, up the channel, back
  // in. Gated on near-vertical alignment — without that it also captures the
  // wide layout's ordinary rising edges and drags them out to the margin.
  if (Math.abs(tx - fx) < 60 && ty < fy - 20) {
    const channelX = Math.max(10, Math.min(fx, tx) - Math.max(fromHalf[0], toHalf[0]) - 24);
    return [
      `M ${fx - fromHalf[0]} ${fy}`,
      `H ${channelX}`,
      `V ${ty}`,
      `H ${tx - toHalf[0]}`,
    ].join(" ");
  }

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

  // A genuine loop back sideways: route under the model, which is what
  // produces the crossings in the wide manual layout.
  if (tx < fx - 40) {
    const dropY = Math.min(f.H - 10, Math.max(fy + fromHalf[1], ty + toHalf[1]) + 40);
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

/** Blend ink → automated green for a node that a machine takes over. */
function strokeFor(node: Node, t: number): string {
  if (node.kind === "service") return "var(--auto-ink)";
  if (node.becomesAutomated && t > 0.6) return "var(--auto-ink)";
  return "var(--ink)";
}

function Diagram({
  frame,
  tall,
  t,
  scenario,
  idPrefix,
  className,
}: {
  frame: Frame;
  tall: boolean;
  t: number;
  scenario: Scenario;
  idPrefix: string;
  className: string;
}) {
  const positions = new Map<string, Point>(
    NODES.map((n) => [n.id, nodePos(n, t, tall)]),
  );

  return (
    <svg
      viewBox={`0 0 ${frame.W} ${frame.H}`}
      className={className}
      role="img"
      aria-label={`Procesmodel af ${scenario.subject}. Manuelt går arbejdet gennem fem trin med et tilbageløb. Automatiseret overtager en AI det første trin, og flowet er lige.`}
    >
      <defs>
        <marker
          id={`${idPrefix}-arrow`}
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
          const opacity = presenceOpacity(edge.presence, t);
          if (opacity <= 0.001) return null;
          return (
            <path
              key={`${edge.from}-${edge.to}`}
              d={connector(
                positions.get(edge.from)!,
                halfSize(fromNode.kind, frame),
                positions.get(edge.to)!,
                halfSize(toNode.kind, frame),
                frame,
                tall ? edge.tallChannel : undefined,
              )}
              fill="none"
              stroke="var(--flow-ink)"
              strokeWidth={1.5}
              opacity={opacity}
              markerEnd={`url(#${idPrefix}-arrow)`}
            />
          );
        })}
      </g>

      {/* Nodes. */}
      <g>
        {NODES.map((node) => {
          const opacity = presenceOpacity(node.presence, t);
          if (opacity <= 0.001) return null;
          const [x, y] = positions.get(node.id)!;
          const stroke = strokeFor(node, t);
          const isInside = node.kind === "task" || node.kind === "service";
          const lines = scenario.labels[node.id] ?? [];

          return (
            <g key={node.id} opacity={opacity}>
              {isInside ? (
                <>
                  <rect
                    x={x - frame.taskW / 2}
                    y={y - frame.taskH / 2}
                    width={frame.taskW}
                    height={frame.taskH}
                    rx={6}
                    fill={node.kind === "service" ? SERVICE_FILL : "var(--pool)"}
                    stroke={stroke}
                    strokeWidth={1.5}
                  />
                  {node.kind === "service" && (
                    // BPMN service-task marker, drawn rather than borrowed.
                    <g
                      transform={`translate(${x - frame.taskW / 2 + 9} ${y - frame.taskH / 2 + 9})`}
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
                    d={`M ${x} ${y - frame.gateR} L ${x + frame.gateR} ${y} L ${x} ${y + frame.gateR} L ${x - frame.gateR} ${y} Z`}
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
                  r={frame.eventR}
                  fill="var(--pool)"
                  stroke={stroke}
                  strokeWidth={node.kind === "end" ? 3.5 : 1.5}
                />
              )}

              {/* Labels sit inside tasks and beneath events, as in BPMN. */}
              <text
                // In the tall layout the gateway's incoming edge descends
                // the same column its label sits in, so the label steps
                // aside rather than relying on the halo to survive.
                textAnchor={tall && node.kind === "gateway" ? "start" : "middle"}
                fontSize={isInside ? frame.fontTask : frame.fontEvent}
                fill={
                  node.kind === "service" || (node.becomesAutomated && t > 0.6)
                    ? "var(--auto-ink)"
                    : "var(--ink)"
                }
                fontWeight={500}
                // Halo, in the node's own fill, the way a diagram or map sets
                // a label: while the nodes move, a label can pass over a
                // connector, and without this the glyphs sit on the line.
                stroke={haloFor(node)}
                strokeWidth={3.5}
                strokeLinejoin="round"
                style={{ paintOrder: "stroke" }}
              >
                {lines.map((line, i) => {
                  // A gateway's label goes above it: the branch edge leaves
                  // through the bottom and would cross it.
                  const blockTop = isInside
                    ? y - (lines.length - 1) * (frame.lineStep / 2) + 4
                    : node.kind === "gateway"
                      ? y - frame.gateR - 10
                      : y + frame.eventR + 15;
                  const labelX =
                    tall && node.kind === "gateway" ? x + 10 : x;
                  return (
                    <tspan key={line} x={labelX} y={blockTop + i * frame.lineStep}>
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
      {!tall && (
        <g opacity={0.85}>
          <path
            d="M 452 250 h -8 v 46 h 8"
            fill="none"
            stroke="var(--ink-mute)"
            strokeWidth={1.2}
          />
          <text fontSize={11} fill="var(--ink-mute)">
            <tspan x={460} y={266}>
              EKSEMPEL — et typisk
            </tspan>
            <tspan x={460} y={280}>
              forløb, ikke en
            </tspan>
            <tspan x={460} y={294}>
              kundecase
            </tspan>
          </text>
        </g>
      )}
    </svg>
  );
}

export default function ProcessModel() {
  const [t, setT] = useState(0);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  /** Bumped to re-run the resolve after the visitor picks a process. */
  const [playCount, setPlayCount] = useState(0);
  const [scrubbed, setScrubbed] = useState(false);
  const rafRef = useRef<number | null>(null);
  const idPrefix = useId().replace(/:/g, "");

  const scenario = SCENARIOS[scenarioIndex];

  // The authored moment: the model resolves itself, then hands the control
  // to the visitor. Skipped entirely under reduced motion. It replays when
  // the visitor changes process, because the new tangle is the point of
  // having changed it — but not once they have taken the scrub themselves.
  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || scrubbed) return;

    const startedAt = performance.now();
    // The tangle is the argument, so it has to be readable before it
    // resolves. A short delay meant most visitors only ever saw the tidy
    // end state. On a replay they already know the move, so it is shorter.
    const DELAY = playCount === 0 ? 2600 : 1200;
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
  }, [playCount, scrubbed]);

  const stopAutoplay = () => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    setScrubbed(true);
  };

  const chooseScenario = (index: number) => {
    if (index === scenarioIndex) return;
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    setScenarioIndex(index);
    setT(0);
    setPlayCount((n) => n + 1);
  };

  return (
    // min-w-0 is load-bearing: without it the grid item sizes to the SVG's
    // intrinsic width and the whole document scrolls sideways.
    <figure className="w-full min-w-0">
      {/* Which process the visitor recognises. Not decoration: the page's
          whole argument depends on them seeing their own work in it. */}
      <div
        role="group"
        aria-label="Vælg en proces"
        className="mb-5 flex flex-wrap gap-2"
      >
        {SCENARIOS.map((option, index) => {
          const isActive = index === scenarioIndex;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => chooseScenario(index)}
              aria-pressed={isActive}
              className={[
                "border px-3 py-1.5 text-sm font-medium transition-colors duration-200",
                isActive
                  ? "border-ink bg-ink text-canvas"
                  : "border-rule bg-pool text-ink-soft hover:border-ink-mute hover:text-ink",
              ].join(" ")}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {/* Two renditions, one state. CSS picks which is shown, so there is no
          layout flash on first paint and no media query in JavaScript. */}
      <Diagram
        frame={TALL}
        tall
        t={t}
        scenario={scenario}
        idPrefix={`${idPrefix}-tall`}
        className="mx-auto block w-full max-w-[360px] md:hidden"
      />
      <div className="-mx-12 hidden min-w-0 overflow-x-auto pb-2 md:block lg:mx-0">
        <Diagram
          frame={WIDE}
          tall={false}
          t={t}
          scenario={scenario}
          idPrefix={`${idPrefix}-wide`}
          className="w-full min-w-[640px]"
        />
      </div>

      <p className="mt-3 text-sm text-ink-mute md:hidden">
        Eksempel — et typisk forløb, ikke en kundecase.
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

        {/* The colour law, said out loud, so the drawing reads as a
            deliverable rather than as a diagram for its own sake. */}
        <p className="mt-4 max-w-measure text-sm text-ink-soft">
          Det grønne er det, jeg bygger og sætter i drift. Tegningen er
          første skridt — ikke leverancen.
        </p>
      </figcaption>
    </figure>
  );
}
