---
name: LetUsDoIT
description: A Danish AI consultancy site built as a working BPMN model rather than a page about one.
colors:
  drafting-ink: "#002E45"
  drafting-ink-soft: "#0B4462"
  drafting-ink-mute: "#4A6274"
  modelling-canvas: "#F1F5F7"
  canvas-grid: "#DCE5EA"
  pool-fill: "#FFFFFF"
  lane-rule: "#B9C8D2"
  sequence-blue: "#00A8E8"
  sequence-blue-ink: "#00688F"
  automated-green: "#4CAF50"
  automated-green-ink: "#2E7D32"
  action-orange: "#FF9800"
  action-orange-ink: "#A85A00"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 5vw, 3.9rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 123"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 3vw, 2.6rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 123"
  title:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.14em"
  label-lane:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    letterSpacing: "0.18em"
rounded:
  square: "0px"
  hairline: "2px"
  task: "6px"
  token: "999px"
spacing:
  grid-step: "24px"
  lane-y: "96px"
  lane-x: "48px"
components:
  button-primary:
    backgroundColor: "{colors.action-orange}"
    textColor: "{colors.drafting-ink}"
    rounded: "{rounded.square}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.action-orange}"
    textColor: "{colors.drafting-ink}"
  input-field:
    backgroundColor: "{colors.pool-fill}"
    textColor: "{colors.drafting-ink}"
    rounded: "{rounded.square}"
    padding: "10px 12px"
  input-field-error:
    backgroundColor: "{colors.pool-fill}"
    textColor: "{colors.drafting-ink}"
  chip-static:
    backgroundColor: "{colors.pool-fill}"
    textColor: "{colors.drafting-ink-soft}"
    rounded: "{rounded.square}"
    padding: "6px 12px"
  lane-ink:
    backgroundColor: "{colors.drafting-ink}"
    textColor: "{colors.modelling-canvas}"
    rounded: "{rounded.square}"
---

# Design System: LetUsDoIT

## Overview

**Creative North Star: "The Working Model"**

This is not a marketing page with a flowchart in it. It is a BPMN model of the
visitor's own business, and the page adopts that notation as its actual
interface language rather than as an illustration style. The visitor lands on a
modelling canvas; a pool floats on it; the pool is divided into lanes; the lanes
carry the content. Navigation is the model's own sequence flow, and the reader's
scroll position is the token travelling it.

The register is precise and operational, never clinical. The audience is a
Danish SMB owner who is drowning in manual work and cannot tell AI substance
from AI hype, so the system's whole job is to look like something a serious
practitioner drew rather than something a marketing team commissioned. Colour is
notation, not decoration: a reader can decode what the page means from the
colours alone. Geometry is derived, not drawn: the hero's connectors are
computed from live node positions, so when the model resolves it resolves
*because the nodes moved*, not because an animation played over the top.

Confirmed anti-references, rejected on purpose: the AI-category hero of glowing
neural mesh over a violet gradient; the centred hero above three equal
icon-heading-text cards; cyan-on-near-black; and faked physicality of any kind.
There is no imitation paper, no CSS bevel, no embossing. Every mark on the page
is either real notation or plain type.

**Key Characteristics:**
- Notation as interface, not as illustration
- Colour used as law, with exactly one meaning per hue
- Square everything, except BPMN task nodes which are legitimately rounded
- Flat by default; one soft ambient shadow lifts the pool off the canvas
- A single authored motion moment, and no scattered hover effects
- Derived geometry: connectors computed from node positions

## Colors

A cool drafting palette: an ink navy doing all the structural work over a pale
blue-grey canvas, with three saturated hues that are never spent decoratively.

### Primary
- **Drafting Ink** (`#002E45`): Every node stroke, every heading, all body text
  on light ground, and the fill of the reverse lanes. The structural voice of
  the whole system.
- **Drafting Ink Soft** (`#0B4462`): Secondary body copy on the pool.
- **Drafting Ink Mute** (`#4A6274`): Lane names, annotations, field hints, and
  the diagram's non-structural notes.

### Secondary
- **Sequence Blue** (`#00A8E8`) and **Sequence Blue Ink** (`#00688F`): The
  movement of work. Connectors, arrowheads, links, the navigation flow line and
  its lit node, focus rings, the caret and the text selection. The bright value
  is for ink lanes; the ink value is the AA-safe text weight on the canvas.
- **Automated Green** (`#4CAF50`) and **Automated Green Ink** (`#2E7D32`): A
  step a machine now handles. The AI service task, the confirmation node once it
  has been taken over, and the success state of the contact form. Nothing else.
- **Action Orange** (`#FF9800`) and **Action Orange Ink** (`#A85A00`): Something
  the visitor does. The two primary buttons, and error text that asks them to
  fix something. It appears three times on the whole page, and that scarcity is
  what makes it read as "act here".

### Neutral
- **Modelling Canvas** (`#F1F5F7`): The substrate the pool floats on, carrying a
  visible 24px grid in **Canvas Grid** (`#DCE5EA`).
- **Pool Fill** (`#FFFFFF`): The pool itself and every node face.
- **Lane Rule** (`#B9C8D2`): Lane boundaries, field strokes, the pool border,
  and the unlit portion of the navigation flow.

### Named Rules

**The Palette Law.** Blue means sequence flow. Green means a step a machine has
taken over. Orange means something the visitor does. A colour is never used for
emphasis, accent, decoration, or hierarchy. If a new element needs to stand out
and none of the three meanings apply, it gets weight, size, or ink — not colour.
Audit test: point at any coloured pixel and name which of the three it means. If
you cannot, it is wrong.

**The Two-Value Rule.** Every law colour ships as a pair: the bright value for
navy ground, the `-ink` value for the canvas. Text never uses the bright value
on light ground; it fails AA at 2.1–2.8:1.

## Typography

**Display Font:** Archivo variable (fallback `ui-sans-serif, system-ui`)
**Body Font:** Schibsted Grotesk (fallback `ui-sans-serif, system-ui`)

Both are self-hosted through `next/font`, never a system fallback.

**Character:** Two grotesques whose difference is *width*, not style. Archivo is
pushed to 123 on its 62–125 width axis, so headings read as signage and
notation — the lettering of a drawing sheet — while Schibsted Grotesk sets body
copy at normal width with Nordic warmth and correct Danish diacritics. The
contrast is structural, so the pairing survives being set in one colour.

### Hierarchy
- **Display** (700, `clamp(2.6rem, 5vw, 3.9rem)`, 1.02, `-0.035em`, `wdth 123`):
  The page's single thesis line. One per page.
- **Headline** (700, `clamp(1.875rem, 3vw, 2.6rem)`, 1.08, `wdth 123`): Lane
  headings. Constrained by `max-w-[16ch]`–`[19ch]` so they break as intended.
- **Title** (600, 1.25–1.5rem, 1.3): Service names, step names, form section
  headings. Body face, not display.
- **Body** (400, 1–1.125rem, 1.625): Prose, capped at a 68ch measure.
- **Label** (600, 0.75rem, `0.14em`, uppercase): Contact detail keys, the scrub
  endpoints, navigation section names.
- **Label (lane)** (600, 0.6875rem, `0.18em`, uppercase): The rotated lane name
  in the gutter. One step smaller and one step wider than a normal label,
  because it is read sideways.

### Named Rules

**The Gutter Rule.** A section's name is set rotated in the lane gutter against
the lane edge, the way a modelling tool sets a lane name. It is never placed
above a heading as a kicker or eyebrow. The heading carries its own weight.

**The Tabular Rule.** Every number a reader might compare — phone number, CVR,
step ordinal, year — carries tabular figures. Numbers are data, and data lines up.

**The No-Costume-Mono Rule.** There is no monospace face in this system.
"Technical" is carried by the notation and the expanded display width, not by a
font wearing a lab coat. If a future surface needs mono, it needs it for code,
data, or measurement, and for no other reason.

## Layout

A pool on a canvas. The outermost frame is `12px` of gridded canvas on small
screens and `40px` from `lg` up; inside it sits a `max-w-[1300px]` pool with a
1px Lane Rule border. The canvas and its grid must remain visible around the
pool — that substrate is the world, and covering it edge to edge erases it.

Inside the pool, every lane is a `max-w-[1280px]` two-column grid: a `36px`
gutter (`64px` from `md`) carrying the rotated lane name against a 1px rule, and
the content column. Content is padded `20px`/`64px` vertically on small screens
and `48px`/`96px` from `md`. Lanes are separated by a single 1px rule and never
by a gap; a pool is contiguous.

The base rhythm is the 24px canvas grid. More space sits above a heading than
below it. Density alternates deliberately: a dense lane of definition rows earns
the quiet of the navy method lane that follows.

Breakpoints are Tailwind defaults. The hero is single-column until `lg` (1024px),
where it splits `0.8fr / 1.2fr` with the model on the right. Below `lg` the
diagram bleeds out to the lane edges (`-mx-5`, `-mx-12` at `md`) to reclaim the
padding it would otherwise lose, and scrolls horizontally inside its own
container with a stated affordance.

### Named Rules

**The Contained-Scroll Rule.** Anything wider than its column scrolls inside its
own `overflow-x-auto` container, and that container carries `min-w-0`. Without
`min-w-0` a grid item sizes to its content's min-width and the whole document
scrolls sideways instead. The page body never scrolls horizontally.

## Elevation & Depth

Almost entirely flat. Depth comes from tonal layering — canvas behind pool,
pool behind ink lane — not from shadows. Only three shadows exist, all with a
real offset and a soft blur; there are no zero-offset colour halos and no hard
offset blocks.

### Shadow Vocabulary
- **Pool lift** (`0 1px 16px rgba(0,46,69,0.06)`): Sets the pool off the canvas.
  Used exactly once, on the pool container.
- **Action lift** (`0 2px 10px rgba(0,46,69,0.2)`): The primary buttons, paired
  with a 1px upward translate on hover.
- **Token lift** (`0 2px 6px rgba(0,46,69,0.22)`): The scrub thumb, so it reads
  as a grabbable object rather than a painted dot.

### Named Rules

**The Flat-Pool Rule.** Surfaces inside the pool are flat. Elevation is reserved
for the pool itself and for things the visitor can act on.

## Shapes

Square by default, everywhere: buttons, inputs, chips, callouts, the pool, the
lanes, the logo panel. Zero radius is the house form.

Two hairline exceptions exist below the level of any visible shape, both at
2px: the focus ring's corner, so a ring around a square control does not look
mitred, and the scrub track. Neither is a container radius and neither should
be promoted to one.

The one exception is real and load-bearing: **BPMN task nodes carry a 6px
radius**, because a task in BPMN notation *is* a rounded rectangle. Events are
circles (1.5px stroke for start, 3.5px for end, which is the notation's own way
of marking a terminal event); gateways are diamonds with an X for exclusive.
The scrub thumb is a full circle because it is a token.

Borders are 1px Lane Rule, with one 2px Drafting Ink top rule marking the two
lead services. Coloured borders on callouts are 1px and run the full way round.

### Named Rules

**The Square-Except-Tasks Rule.** If it is chrome, it is square. If it is a BPMN
task node, it is 6px. If it is a token, it is a full circle. The only other
radius in the system is the 2px hairline on focus rings and the scrub track,
and no container may borrow it. No side-stripe borders above 1px anywhere.

## Components

### Buttons
- **Shape:** Square (0px).
- **Primary:** Action Orange fill with Drafting Ink text (6.5:1), `14px 28px`
  padding, Action lift shadow. Navy-on-orange rather than the usual white-on-orange.
- **Hover / Focus:** 1px upward translate over 300ms on the settle curve; focus
  shows the standard Sequence Blue ring at 3px offset.
- **Secondary:** Text link in Sequence Blue Ink with a 1px underline at `0.22em`
  offset, thickening on hover. There is no outlined button variant.

### Chips
- **Style:** Pool fill, 1px Lane Rule border, Drafting Ink Soft text, square,
  `6px 12px`. Static labels only — these are not filters and carry no state.

### Inputs / Fields
- **Style:** Pool fill, 1px Lane Rule stroke, square, `10px 12px`. Label above in
  600 weight; optional fields say so in the label rather than being marked with
  an asterisk convention the reader has to decode.
- **Hover:** Stroke darkens to Drafting Ink Mute.
- **Focus:** Sequence Blue Ink ring at 3px offset.
- **Error:** Stroke becomes Action Orange Ink, `aria-invalid` is set, and a
  message names the problem and the recovery in the interface's own voice.

### Navigation
- Sticky, solid Pool fill, 1px bottom rule. The section list renders as the
  model's sequence flow: a 1px Lane Rule line with a Sequence Blue Ink trail
  filling to the current position, and a 15px node per section. The active node
  is filled Sequence Blue Ink and scaled 1.1; passed nodes are outlined; upcoming
  nodes are Lane Rule. Below `lg` the flow is hidden and only the mark and the
  primary action remain.

### The Process Model (signature)
The hero diagram. Each node holds a position in the manual layout and a position
in the automated layout; the component interpolates between them, and every
connector is computed from the *current* positions. Backward edges route under
the model, which is what produces the crossings in the tangled state — the mess
is a real consequence of the routing, not artwork.

- Autoplay holds the tangle for 2600ms, then resolves over 1900ms on the settle
  curve, once. It is skipped entirely under `prefers-reduced-motion`.
- The control is a native range input restyled as a sequence flow with a token
  thumb, so keyboard and screen-reader support come for free. Its label changes
  once the model has resolved, so it never instructs an action already performed.
- Node labels carry a 3.5px Pool-coloured halo via `paint-order: stroke`, so a
  label crossing a connector mid-transition stays legible.
- The model is labelled `EKSEMPEL` in a BPMN text annotation, because it is
  illustrative and must never be mistaken for a client case.

### Named Rules

**The Derived Geometry Rule.** Connectors are computed from node positions.
Never hand-draw a second set of paths for the resolved state; if the two states
disagree, the geometry is wrong, not the drawing.

**The Halo Rule.** Any label that can pass over a line carries a Pool-coloured
halo. This is how diagrams and maps have always set labels.

## Do's and Don'ts

### Do:
- **Do** give every colour exactly one meaning and use the `-ink` variant for
  text on the canvas.
- **Do** keep the gridded canvas visible around the pool at every breakpoint.
- **Do** put section names rotated in the lane gutter.
- **Do** put `min-w-0` on any grid item containing a horizontal scroller.
- **Do** theme the browser's own surfaces — selection, caret, `accent-color`,
  scrollbar, focus ring, underline offset — from the palette.
- **Do** label illustrative data as illustrative, in the notation's own voice.

### Don't:
- **Don't** spend a law colour on decoration. Green is not an accent rule and
  orange is not a highlighter.
- **Don't** put a kicker or eyebrow above a heading. The lane gutter is where a
  section name goes.
- **Don't** use bright Sequence Blue as text on the navy lanes; cyan-on-dark is
  a category tell and it fails contrast.
- **Don't** introduce a third corner radius, or a side-stripe border above 1px.
- **Don't** add a second animated moment. The model resolving is the page's one
  authored motion; the navigation token is state, not motion.
- **Don't** build a row of equal icon-heading-text cards. Content here is
  expressed as definition rows, lanes, and notation.
- **Don't** invent proof. There are no client names, logos, testimonials, or
  metrics, and no slot should be designed that would need one.
