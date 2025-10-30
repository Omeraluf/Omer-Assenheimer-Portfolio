# 🧩 Tailwind CSS v4 + Vite + React (TypeScript) Setup Guide

A quick reference for rebuilding a portfolio (or any app) from scratch.

---

## ⚙️ 1. Create the Project
```bash
npm create vite@latest my-portfolio -- --template react-ts
cd my-portfolio
🎨 2. Install Tailwind v4 + PostCSS
bash
Copy code
npm i -D tailwindcss @tailwindcss/postcss autoprefixer
⚠️ No need to run npx tailwindcss init — Tailwind v4 works without it.

🧩 3. Create postcss.config.cjs
js
Copy code
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
💅 4. Create src/index.css
css
Copy code
@import "tailwindcss";

/* Your optional custom styles */
:root { color-scheme: light; }
body { /* @apply bg-gray-50 text-gray-900; */ }
🔹 @import "tailwindcss"; must be the first line
🔹 Remove any old @tailwind base/components/utilities lines (v3 syntax)

🪄 5. Import the CSS in Your Entry File
src/main.tsx

tsx
Copy code
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
🚀 6. Run the Dev Server
bash
Copy code
npm run dev
Open the printed URL (usually http://localhost:5173).

✅ 7. Quick Visual Test
Add this to the bottom of index.css to confirm Tailwind works:

css
Copy code
body { @apply bg-sky-100 text-blue-700; }
If the background and text colors change — Tailwind is active 🎉

🧱 8. Build & Deploy
bash
Copy code
npm run build
npm run preview
Push to GitHub → Import the repo in Vercel

Build command: npm run build

Output directory: dist

🧭 Summary
In Tailwind v4:
You install @tailwindcss/postcss, import "tailwindcss" at the top of your CSS,
and run Vite — that’s it.

yaml
Copy code

---

You can save that directly as `TAILWIND_V4_SETUP.md` in your project root — it’ll serve as your quick reference anytime you start a new one.

# prompt for adding projects:
I want to add a new project to my portfolio in the same format as my previous ones. Here’s what I’ll give you: The project name A short description of what it does The main technologies used I want you to: Create a noun-based title (like “Risk Monitor” / “Data Predictor” / “E-Commerce Platform”). Write a one-line blurb starting with “A …” that clearly explains what the project is and what it does — short, accessible, and professional. Return the final result as a TypeScript object matching this exact structure: { title: "Project Title", blurb: "A concise, noun-based sentence explaining the project.", tech: ["Tech1", "Tech2", "Tech3"], live: "#", repo: "#", }, Keep the tone consistent with my previous projects like: Israeli News Monitor Structural Risk Monitor School Risk Predictor Job Listings Scraper Wizard E-Commerce Platform now i'll show you my next project i want to work on
