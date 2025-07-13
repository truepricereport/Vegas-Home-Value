# Vegas Home Value

A multi-step home value report web app built with Next.js, React, and Tailwind CSS.

## Features
- Multi-step form for address, home details, and contact info
- Responsive UI with custom theme using Tailwind CSS
- Google Maps placeholder (ready for integration)
- Modern UI components (Radix UI, Lucide icons)

## Getting Started

### Prerequisites
- Node.js 18+
- npm (or bun/yarn)

### Install dependencies
```bash
cd vegas-home-value
npm install
```

### Development
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) to view the app.

### Build for production
```bash
npm run build
```

## Project Structure
- `src/app/` — Next.js app directory (main pages, layout, globals.css)
- `src/components/` — UI and form components
- `tailwind.config.ts` — Tailwind CSS configuration
- `postcss.config.mjs` — PostCSS plugins

## Customization
- Edit theme colors and variables in `globals.css` and `tailwind.config.ts`.
- Add your Google Maps API logic in `src/components/GoogleMap.tsx`.

