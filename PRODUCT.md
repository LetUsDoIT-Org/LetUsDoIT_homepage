# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: Danish SMB owners and operations/administration managers, typically 5–100 employees,
non-technical. Their situation: the business runs on manual steps — rekeying data between
systems, email-driven approvals, spreadsheets holding processes together. They have heard
constantly that they "should do something with AI" and have no way to judge where it would
actually pay off versus where it is hype.

The job they are doing when they reach this site: deciding whether to bring in outside help,
and whether this particular supplier understands their business rather than just the technology.

## Product Purpose

LetUsDoIT ApS is a Danish IT consultancy providing AI advisory and AI implementation, built on
a foundation of business-process analysis, modelling and automation.

The homepage exists to win inbound leads. Success is a submitted contact enquiry (or a direct
phone/email contact) from a qualified Danish SMB. It is not a brochure and not a portfolio.

## Positioning

AI advice and AI implementation grounded in process modelling — not model demos.

The differentiating claim, which a generic AI consultancy could not truthfully copy:
**AI does not work on a process nobody has mapped.** The BPM/lean/process-modelling background
is not a separate service line; it is the reason the AI work reaches production instead of
stalling as a pilot. The offer spans both advice (where does AI actually pay off here) and
concrete implementation (building it).

## Operating Context

Danish SMBs. Microsoft 365 estates are common. Processes typically live in email, Excel, and
staff habit rather than in documented systems. Buyers evaluate in Danish and search in Danish.
Decisions are usually made by one owner/manager rather than a committee, often after a
referral or a Google search.

## Capabilities and Constraints

Primary services:
- AI advisory — identifying where AI creates real value in a specific business, and where it does not
- AI implementation — integrating AI into applications and workflows
- Process automation — removing manual steps
- Business process analysis and lean optimisation
- Business process modelling

Secondary services (offered, not led with):
- Chatbots and self-service
- App development, including MVP and PoC
- Microsoft 365 configuration
- Website configuration and maintenance in Drupal or Strapi
- Agile project management (SCRUM certified)

Technical constraints:
- Next.js 14 App Router, TypeScript strict, Tailwind CSS
- Currently `output: 'export'` static, hosted on GitHub Pages via `.github/workflows/deploy.yml`
- Confirmed decision: move hosting to Vercel and drop static export in order to run a real
  server-side contact form. This ends GitHub Pages as a deployment target.
- Domain `letusdoit.dk` is live and currently pointed at GitHub Pages; migration requires a DNS cutover.

## Brand Commitments

- Legal name: LetUsDoIT ApS. CVR: 45625818.
- Site language: **Danish only.** Confirmed decision; the current English copy is to be replaced,
  not translated alongside.
- Voice: **first person singular ("jeg")**. The company is one person. Confirmed — do not write "vi".
- Email: simon@letusdoit.dk · Phone: +45 41 20 80 88
- Logo: handshake formed from two hands (brand blue and brand green) under a binary "01010"
  motif, with the LetUsDoIT wordmark (navy, with "IT" in orange).
  Constraint: only JPEG files exist, with backgrounds baked in (white and navy variants).
  There is no SVG and no transparent PNG. Any design that needs the mark on an arbitrary
  background is blocked until vector or transparent artwork is produced.
- Brand colours: navy #003D5C, blue #00A8E8, green #4CAF50, orange #FF9800.

## Evidence on Hand

Confirmed available:
- SCRUM certification.
- Multiple years of experience at a very large international IT company.
  **The employer's name is pending from the user** and is to be stated plainly once supplied;
  the previous site's phrase "one of the world's largest IT companies" is not to be reused.

Confirmed absent — must not be fabricated:
- No nameable clients, and no client logos.
- No testimonials or quotes.
- No published metrics, case studies, or outcome numbers of any kind.

Consequence for design: proof must come from demonstration and from stated background, not from
social proof. Do not design slots for logos, testimonials, or statistics that would have to be
filled with invented content.

## Product Principles

1. **Show the work, don't assert it.** The page's credibility comes from demonstrating how a
   process gets mapped and automated, not from adjectives about quality or experience.
2. **Process before model.** Every AI claim is anchored to a mapped process. This is the
   position; copy that drifts into generic AI enthusiasm undermines it.
3. **Speak the buyer's language, literally and figuratively.** Danish, plain, operational. Name
   things the way an SMB manager names them, never the way a systems architect would.
4. **One person, named and reachable.** The solo nature is an asset. Directness and a real name
   outperform corporate distance for this audience.
5. **Never invent proof.** Absent evidence stays absent. The design must work without it.

## Accessibility & Inclusion

No product-specific standard was established by the user. Apply the standard quality floor:
responsive to mobile, visible keyboard focus, `prefers-reduced-motion` respected — which
matters here because the hero is animated — and text contrast that holds on both the light
canvas and the navy ink surfaces.
