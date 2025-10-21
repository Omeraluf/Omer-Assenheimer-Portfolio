// src/App.tsx
import { useState } from "react";
import {
  Github,
  ExternalLink,
  Mail,
  Linkedin,
  Phone,
  Download,
  MapPin,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/card";


// // --- Minimal UI components (inline to avoid path issues) ---
// function Button({
//   children,
//   variant = "default",
//   size = "default",
//   className = "",
//   ...props
// }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
//   variant?: "default" | "secondary" | "outline";
//   size?: "default" | "sm";
//   className?: string;
// }) {
//   const base =
//     "inline-flex items-center justify-center font-medium rounded-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
//   const variants = {
//     default:
//       "bg-neutral-900 text-white hover:bg-neutral-800 focus:ring-neutral-900",
//     secondary:
//       "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus:ring-neutral-300",
//     outline:
//       "border border-neutral-300 text-neutral-900 hover:bg-neutral-50 focus:ring-neutral-300",
//   } as const;
//   const sizes = {
//     default: "px-4 py-2 text-sm",
//     sm: "px-3 py-1.5 text-sm",
//   } as const;

//   return (
//     <button
//       className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// }

// function Card({
//   children,
//   className = "",
// }: React.PropsWithChildren<{ className?: string }>) {
//   return (
//     <div className={`border bg-white rounded-2xl shadow-sm ${className}`}>
//       {children}
//     </div>
//   );
// }
// function CardHeader({ children }: React.PropsWithChildren) {
//   return <div className="px-5 pt-4">{children}</div>;
// }
// function CardTitle({ children }: React.PropsWithChildren) {
//   return <h3 className="font-semibold">{children}</h3>;
// }
// function CardContent({ children }: React.PropsWithChildren) {
//   return <div className="px-5 pb-5 pt-2">{children}</div>;
// }
// // --- end inline UI components ---


// —— QUICK EDIT AREA ——
const INFO = {
  name: "Omer Assenheimer",
  role: "Software Engineer • Data-Oriented",
  location: "Israel",
  email: "Omeraluf@gmail.com",
  phone: "054-2105916",
  linkedin:
    "https://www.linkedin.com/in/omer-assenheimer",
  github: "https://github.com/omeraluf",
  resumeUrl: "#", // paste resume link (Drive/Vercel static) here
};

type Project = {
  title: string;
  blurb: string;
  tech: string[];
  live: string;
  repo: string;
};

const PROJECTS: Project[] = [
  {
    title: "Media Monitor Dashboard",
    blurb:
      "Scrapes Israeli outlets (RSS/Selenium), clusters coverage, and visualizes trends.",
    tech: ["Python", "NLP", "Next.js", "TypeScript", "MongoDB"],
    live: "#",
    repo: "#",
  },
  {
    title: "IoT Building Safety Monitor",
    blurb:
      "Real-time sensor ingestion, anomaly alerts, and dashboards for building risk.",
    tech: ["Python", "FastAPI", "MongoDB", "WebSockets", "Grafana"],
    live: "#",
    repo: "#",
  },
  {
    title: "School Safety Risk Prediction",
    blurb:
      "ML classification on Kaggle dataset to surface risk patterns and signals.",
    tech: ["Pandas", "scikit-learn", "XGBoost", "Matplotlib"],
    live: "#",
    repo: "#",
  },
  {
    title: "Job Listings Scraper",
    blurb:
      "Pipeline that extracts and structures job postings for market insights.",
    tech: ["Python", "BeautifulSoup", "Requests", "Pandas"],
    live: "#",
    repo: "#",
  },
];

const SKILLS = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind", "Shadcn UI"] },
  { group: "Backend", items: ["FastAPI", "Node", "REST", "WebSockets", "Auth"] },
  { group: "Data", items: ["Pandas", "scikit-learn", "SQL", "MongoDB", "ETL"] },
  { group: "DevOps", items: ["Git", "Docker", "CI/CD", "Vercel", "Render"] },
];

export default function App() {
  const [active, setActive] = useState<"projects" | "skills" | "about" | "contact">("projects");

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#hero" className="font-semibold tracking-tight text-lg">
            {INFO.name}
          </a>
          <nav className="flex items-center gap-2 text-sm">
            {[
              { id: "projects", label: "Projects" },
              { id: "skills", label: "Skills" },
              { id: "about", label: "About" },
              { id: "contact", label: "Contact" },
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setActive(link.id as typeof active)}
                className={`px-3 py-1.5 rounded-full transition-all ${
                  active === (link.id as typeof active)
                    ? "bg-neutral-900 text-white"
                    : "hover:bg-neutral-100"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a href={INFO.resumeUrl} className="ml-2">
              <Button className="rounded-2xl shadow-sm">
                <Download className="h-4 w-4 mr-2" />
                Resume
              </Button>
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="hero" className="max-w-6xl mx-auto px-4 pt-12 pb-8">
        <div className="grid md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{INFO.role}</h1>
            <p className="mt-4 text-neutral-700 leading-relaxed">
              I build clean, fast, and type-safe web apps and data products — from Python backends and
              ML pipelines to React/Next.js frontends with great UX.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={`mailto:${INFO.email}`}>
                <Button variant="secondary" className="rounded-2xl">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
              </a>
              <a href={INFO.linkedin} target="_blank" rel="noreferrer">
                <Button className="rounded-2xl">
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </Button>
              </a>
              <a href={INFO.github} target="_blank" rel="noreferrer">
                <Button variant="outline" className="rounded-2xl">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Button>
              </a>
            </div>
          </div>
          <div className="md:ml-auto">
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Quick Facts</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {INFO.location}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {INFO.phone}
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {INFO.email}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold tracking-tight mb-6">Featured Projects</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p, i) => (
            <Card key={i} className="rounded-2xl hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{p.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-700 mb-3">{p.blurb}</p>
                <ul className="flex flex-wrap gap-2 mb-4">
                  {p.tech.map((t) => (
                    <li
                      key={t}
                      className="text-xs bg-neutral-100 rounded-full px-2.5 py-1"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2">
                  <a href={p.live} target="_blank" rel="noreferrer">
                    <Button size="sm" className="rounded-xl">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Live
                    </Button>
                  </a>
                  <a href={p.repo} target="_blank" rel="noreferrer">
                    <Button size="sm" variant="outline" className="rounded-xl">
                      <Github className="h-4 w-4 mr-1" />
                      Code
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold tracking-tight mb-6">Skills</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SKILLS.map((s) => (
            <Card key={s.group} className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-base">{s.group}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-neutral-700 space-y-1">
                  {s.items.map((i) => (
                    <li key={i}>• {i}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">About</h2>
        <p className="text-neutral-700 max-w-3xl leading-relaxed">
          Data-oriented software engineer with a knack for turning raw data into useful products.
          Comfortable across the stack: Python backends, ML pipelines, and modern React/Next.js frontends.
          I value clean abstractions, great DX, and shipping fast without breaking trust.
        </p>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-6xl mx-auto px-4 py-12">
        <div className="rounded-3xl p-6 border bg-white shadow-sm">
          <h2 className="text-2xl font-semibold tracking-tight mb-2">Let’s talk</h2>
          <p className="text-neutral-700 mb-4">
            Open to full-time or freelance roles. Best way to reach me: email or LinkedIn.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${INFO.email}`}>
              <Button className="rounded-2xl">
                <Mail className="h-4 w-4 mr-2" />
                Email me
              </Button>
            </a>
            <a href={INFO.linkedin} target="_blank" rel="noreferrer">
              <Button variant="secondary" className="rounded-2xl">
                <Linkedin className="h-4 w-4 mr-2" />
                Connect
              </Button>
            </a>
            <a href={INFO.github} target="_blank" rel="noreferrer">
              <Button variant="outline" className="rounded-2xl">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
            </a>
          </div>
        </div>
        <footer className="text-center text-sm text-neutral-500 py-8">
          © {new Date().getFullYear()} {INFO.name}
        </footer>
      </section>
    </main>
  );
}
