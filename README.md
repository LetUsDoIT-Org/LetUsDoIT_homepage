# LetUsDoIT ApS — hjemmeside

The corporate site for LetUsDoIT ApS. Danish-language, single page, lead-generation.

**CVR:** 45625818 · **E-mail:** simon@letusdoit.dk · **Telefon:** +45 41 20 80 88

## Tech stack

- Next.js 16 (App Router, server actions)
- React 19
- TypeScript (strict)
- Tailwind CSS 3
- Resend for contact-form delivery
- Hosted on Vercel

The site is **no longer a static export**. It runs a server so the contact form
can post to a server action, which is why GitHub Pages is no longer a deploy
target and `.github/workflows/deploy.yml` was removed.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in RESEND_API_KEY
npm run dev
```

Open http://localhost:3000.

Without `RESEND_API_KEY` the form still renders and validates; submitting shows
a message pointing at the email address and phone number instead of sending.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | yes, in production | Sends contact-form submissions to simon@letusdoit.dk |
| `CONTACT_FROM_ADDRESS` | no | Sender address. Defaults to `onboarding@resend.dev`, which only delivers to the Resend account owner. Set this to an address on `letusdoit.dk` once that domain is verified in Resend. |

Set both in Vercel under **Settings → Environment Variables** for Production,
Preview and Development.

## Project structure

```
/app
  layout.tsx     root layout, fonts, metadata, direction contract
  page.tsx       the whole page
  actions.ts     contact-form server action
  globals.css    tokens, browser surfaces, base styles
/components
  ProcessModel.tsx   the hero BPMN model and its scrub control
  ProcessPath.tsx    sticky nav rendered as the model's sequence flow
  Lane.tsx           one lane of the pool
  ContactForm.tsx    the form
/public/images/logo  company logos
PRODUCT.md           durable product truth (Impeccable)
DESIGN.md            the built visual system (Impeccable)
```

## Design system

The page is built as a BPMN model rather than as a marketing page containing a
flowchart. Colour is **law**, not decoration:

| Colour | Token | Means, and means only |
|---|---|---|
| Blue `#00A8E8` | `flow` | sequence flow — the movement of work |
| Green `#4CAF50` | `auto` | a step a machine now handles |
| Orange `#FF9800` | `act` | something the visitor does |
| Navy `#003D5C` | `ink` | node strokes and text |

`flow-ink`, `auto-ink` and `act-ink` are the AA-contrast variants for text on
the light canvas; the bright values are for the navy lanes.

See `DESIGN.md` for the full system and `PRODUCT.md` for product truth that
future work must preserve.

## Deployment

Deploys to Vercel on push. `main` is production.

### DNS

`letusdoit.dk` nameservers are delegated to **Microsoft 365**
(`ns1–ns4.bdm.microsoftonline.com`), so DNS records are edited in the Microsoft
365 admin center under **Settings → Domains → letusdoit.dk**, not at a
registrar control panel.

When cutting over, change **only** the `A` records for the apex. Leave every
`MX`, `TXT` (SPF/DKIM/DMARC) and Microsoft service record untouched — editing
those breaks company email.
