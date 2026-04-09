# DubHacks Next Website

## Project
Website for DubHacks Next, UW's student startup incubator. Live at next.dubhacks.co.
Built with React (TypeScript, Create React App), Tailwind CSS, and Framer Motion.
Deployed on Vercel.

## Structure
- src/App.tsx — root component, composes all sections
- src/components/ — one file per section component
- src/index.css — global styles
- src/dubhacks_next_mastersheet.txt — content/data reference
- src/next_stats.txt — stats data reference

## Components
ApplicationCTASection, FAQSection, Footer, SpeakersSection, StartupDirectory,
StatsSection, TeamSection, TimelineSection, TracksSection, UpcomingEventsSection, WhyUWSection

## Conventions
- TypeScript throughout — no `any` types
- Tailwind utility classes only, avoid inline styles
- Animations via Framer Motion — match existing animation patterns before adding new ones
- Each section is its own self-contained component file

## Design
- Dark, minimal aesthetic inspired by YC and thehouse.build
- Do not change the overall color palette or layout structure without confirmation
- Do not remove or replace existing animations

## Responsive Design
- Every change must work correctly on both laptop (1280px+) and mobile (375px+)
- Mobile-first: build for small screens first, enhance for larger screens
- Minimum touch target size: 44x44px for all interactive elements
- Test mental model at these breakpoints: 375px (mobile), 768px (tablet), 1280px (laptop)
- Use Tailwind responsive prefixes (sm:, md:, lg:) — no hardcoded pixel values
- Text must be readable on mobile — no text smaller than text-sm on small screens
- Grids and flex layouts must stack or reflow gracefully on mobile, never overflow horizontally

## Commands
- npm start — local dev server
- npm run build — production build

## Build Requirement
Every coding session must end with a passing build. After making any changes:
1. Run `npm run build`
2. If there are errors, fix them before considering the task done
3. Do not stop or hand back until `npm run build` completes with zero errors
This is non-negotiable — a broken build is an incomplete task.