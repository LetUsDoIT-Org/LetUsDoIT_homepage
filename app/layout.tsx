import type { Metadata } from "next";
import { Archivo, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";

const display = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-display",
});

const body = Schibsted_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://letusdoit.dk"),
  title: {
    default: "LetUsDoIT — AI-rådgivning og implementering til danske virksomheder",
    template: "%s — LetUsDoIT",
  },
  description:
    "Jeg hjælper danske virksomheder med at finde ud af, hvor AI faktisk betaler sig — og bygger det bagefter. Med udgangspunkt i en kortlagt proces, ikke i en demo.",
  keywords: [
    "AI-rådgivning",
    "AI-implementering",
    "kunstig intelligens",
    "procesautomatisering",
    "procesoptimering",
    "digitalisering",
    "lean",
    "IT-konsulent",
    "Danmark",
  ],
  authors: [{ name: "Simon Christiansen" }],
  openGraph: {
    type: "website",
    locale: "da_DK",
    url: "https://letusdoit.dk",
    siteName: "LetUsDoIT",
    title: "LetUsDoIT — AI-rådgivning og implementering",
    description:
      "AI virker ikke på en proces, som ingen har tegnet. Rådgivning og konkret implementering til danske virksomheder.",
  },
  alternates: {
    canonical: "https://letusdoit.dk",
  },
};

const DIRECTION_CONTRACT = `<!--
THESIS: This page is a BPMN model of the visitor's own business, not a marketing
page with a flowchart in it. It refuses the AI-category hero of glowing neural
mesh, gradient wash and three icon cards.
OWN-WORLD: A pale modelling canvas under a visible grid; white pools divided by
hairline lanes, alternating with whole navy ink lanes. Nodes are drawn BPMN
shapes in ink. Palette is law: blue is sequence flow, green is a step a machine
now handles, orange is the visitor's action. Archivo pushed wide for display
against Schibsted Grotesk body.
STORY: Manual work is costing you; the fix starts with mapping, not with a
model; this person maps and then builds; ask him to map yours.
FIRST VIEWPORT: Full-bleed canvas. Headline left at display scale above the
orange action; the order-handling model right, tangled, labelled EKSEMPEL.
Dragging the token straightens the flow and turns one node green.
FORM: BPMN notation, candidate 1 of the grounded list, user-pinned over the
roll. Seed key 4a3487f7.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
-->`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da" className={`${display.variable} ${body.variable}`}>
      <body>
        {/* Emitted as a real HTML comment so the contract survives the
            production build and can be audited in the shipped markup. */}
        <div hidden dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }} />
        {children}
      </body>
    </html>
  );
}
