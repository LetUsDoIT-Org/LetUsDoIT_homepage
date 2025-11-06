# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the corporate website for LetUsDoIT ApS (CVR: 45625818), a Danish IT consultancy company. The site is a single-page application showcasing the company's services, expertise, and contact information.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS with custom color palette
- **Deployment**: Static export configuration (`output: 'export'`)
- **Image Handling**: Unoptimized images for static export compatibility

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build production site (outputs to /out directory)
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Project Structure

- `/app` - Next.js App Router directory
  - `layout.tsx` - Root layout with metadata configuration
  - `page.tsx` - Main homepage component (single-page website)
  - `globals.css` - Global styles and Tailwind imports
- `/public/images/logo` - Company logo assets
- `tailwind.config.ts` - Tailwind configuration with custom color scheme
- `next.config.mjs` - Next.js configuration for static export

## Architecture Notes

### Static Export Configuration

The site is configured for static export (`output: 'export'` in next.config.mjs). This means:
- Images must use `unoptimized: true`
- No server-side features (API routes, ISR, etc.)
- Builds to static HTML/CSS/JS in `/out` directory

### Color Palette

Custom brand colors are defined in both Tailwind config and CSS variables:
- **Navy** (#003D5C) - Primary brand color
- **Blue** (#00A8E8) - Accent color
- **Green** (#4CAF50) - Success/highlight color
- **Orange** (#FF9800) - Call-to-action color

Access via Tailwind classes: `text-primary-navy`, `bg-primary-blue`, etc.

### Single-Page Structure

The entire website is contained in `/app/page.tsx` with anchor-linked sections:
- Hero section (gradient background with CTAs)
- About section (#about) - Company introduction
- Services section (#services) - Grid of 10 service offerings
- Contact section (#contact) - Contact information display
- Footer with copyright and CVR

### Component Pattern

Currently using a monolithic component structure. All UI is in a single `page.tsx` file. If adding new features, consider:
- Creating `/components` directory for reusable elements
- Extracting service cards, navigation, or section components
- Using the `@/` path alias configured in tsconfig.json

## Company Information

When updating content, preserve these company details:
- **Email**: simon@letusdoit.dk
- **Phone**: +45 41 20 80 88
- **CVR**: 45625818
- **Logo**: `/images/logo/LetUsDoIT Logo_01.jpeg`

## Deployment

The site uses static export and is intended for deployment to Vercel (as noted in README). After running `npm run build`, the `/out` directory contains the complete static site.
