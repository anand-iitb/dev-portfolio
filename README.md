# Anand Kumar — Developer Portfolio Website

A highly interactive, high-performance, and responsive developer portfolio website designed to showcase professional SDE backend systems experience, skills, and projects.

## 🛠️ Tech Stack & Architecture

- **Core**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Vanilla CSS with Tailwind CSS v4 variables
- **Animations**: GSAP (GreenSock Animation Platform) for preloaders and scroll reveals, Framer Motion for smooth micro-animations
- **Scrolling**: Lenis smooth scroll for a premium feel
- **Visits Counter**: Next.js Serverless API routes connected to a persistent Upstash Redis database
- **Time Tracker**: Real-time India Standard Time (IST) clock formatting

## 📂 Project Structure

- `src/app/` — Next.js routing and API endpoints (visit counters, layout, page aggregates)
- `src/components/` — UI sections (Hero, About, Skills, Experience, Education, Projects, Contact, Navigation, animations, and icons)
- `src/data/` — Static portfolio content config file
- `src/lib/` — Framer-Motion helper functions and media/motion query utilities
- `public/` — Static resume, SVGs, and favicon assets

## 🚀 Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the local development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view the site.
