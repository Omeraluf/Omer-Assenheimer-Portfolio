// src/App.tsx
import { useState } from "react";
import { Github, ExternalLink, Mail, Linkedin, Phone, Download, MapPin, ArrowUp} from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/card";
import { useEffect } from "react";

// —— QUICK EDIT AREA ——
const INFO = {
  name: "Omer Assenheimer",
  role: "Software Engineer • Data-Oriented",
  location: "Israel",
  email: "Omeraluf@gmail.com",
  phone: "054-2105916",
  linkedin: "https://www.linkedin.com/in/omer-assenheimer",
  github: "https://github.com/omeraluf",
  resumeUrl: "/Omer-Assenheimer-CV-Software-Engineer-2025.pdf", // paste resume link (Drive/Vercel static) here
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
    title: "Israeli Media Monitor",
    blurb:
      "Scrapes Israeli outlets (RSS/Selenium), clusters coverage, and visualizes trends.",
    tech: ["Python", "Pandas", "NLP", "Sentiment Analysis", "Data Processing", "Web Scraping"],
    live: "#",
    repo: "https://github.com/Omeraluf/israeli-media-monitor",
  },
  {
    title: "Building Stability Tracker", //"IoT Building Safety Monitor",
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
    live: "https://drive.google.com/drive/folders/1tEmx-MxRnJQODJ4_HkSGVskL3Y8UyFXA?usp=sharing",
    repo: "https://github.com/Omeraluf/School-Saftey-Risk-Prediction",
  },
  {
    title: "Job Listings Scraper",
    blurb:
      "Python scraper that collects and filters remote job listings into structured data.",
    tech: ["Python", "BeautifulSoup", "Requests", "Pandas"],
    live: "#",
    repo: "https://github.com/Omeraluf/Remote-jobs-scraper",
  },
];

const SKILLS = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind", "Shadcn UI"] },
  { group: "Backend", items: ["FastAPI", "Node", "REST", "WebSockets", "Auth"] },
  { group: "Data", items: ["Pandas", "scikit-learn", "PyTorch", "SQL", "ETL", "Matplotlib"] },
  { group: "DevOps", items: ["Git", "Docker", "CI/CD", "Vercel"] }
];

//const LANGUAGES = ["Python", "Java", "C", "C++", "SQL", "NoSQL", "HTML", "CSS", "Assembly", "Linux", "Jupyter Notebook"];                             // Add it whenever


export default function App() {
  const [active, setActive] = useState<"hero" | "projects" | "skills" | "about" | "contact">("projects");
  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;

    // Function to update the CSS variable
    const setHeight = () => {
      document.documentElement.style.setProperty("--nav-height", `${header.offsetHeight}px`);
    };

    // Set immediately
    setHeight();

    // Watch for changes (responsive resize etc.)
    const resizeObserver = new ResizeObserver(setHeight);
    resizeObserver.observe(header);

    // Cleanup
    return () => resizeObserver.disconnect();
  }, []);

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Spy Scroll START @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // Simplest scroll-spy: pick the section closest to 30% from top
  useEffect(() => {
    const ids = ["hero", "projects", "skills", "about", "contact"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const onScroll = () => {
      const targetY = window.innerHeight * 0.2; // detection line
      let best: { id: typeof active; dist: number } | null = null;

      sections.forEach((sec) => {
        const { top } = sec.getBoundingClientRect();
        const dist = Math.abs(top - targetY);
        if (!best || dist < best.dist) best = { id: sec.id, dist };
      });

      if (best) setActive(best.id as typeof active);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // init
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Spy Scroll END @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    // Back-to-top button visibility logic START
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 50);
    onScroll(); // set initial state
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  };
  // Back-to-top button logic END


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
              // button links
              { id: "hero", label: "Home" },
              { id: "projects", label: "Projects" },
              { id: "skills", label: "Skills" },
              { id: "about", label: "About" },
              { id: "contact", label: "Contact" },
            ].map((link) => {
              const isActive = active === (link.id as typeof active);
              return (
                <Button
                  key={link.id}
                  asChild
                  size="sm"
                  variant={isActive ? "outlineUnderline" : "outline"}
                  className="rounded-full"
                >
                  <a
                    href={`#${link.id}`}
                    onClick={() => setActive(link.id as typeof active)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </a>
                </Button>
              );
            })}
            {/* <a href={INFO.resumeUrl} className="ml-2"> */}
              <a
              href={INFO.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="ml-2"
            >
              <Button className="rounded-2xl shadow-sm animate-bounce"
              style={{ animationDuration: "2s" }}>
                <Download className="h-4 w-4 mr-2" />
                Resume
              </Button>
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="hero" className="max-w-6xl mx-auto px-4 pt-12 pb-8 scroll-mt-[var(--nav-height)]">
        <div className="grid md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{INFO.role}</h1>
            <p className="mt-4 text-neutral-700 leading-relaxed">
              {/* I build clean, efficient, and reliable software with a focus on clear logic, good structure, and meaningful user impact. */}
              I've loved computers since I was a kid - now I turn that passion into writing clean, reliable software built on clear logic and purpose.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={`mailto:${INFO.email}`}>
                <Button variant="outline" className="rounded-2xl">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
              </a>
              <a href={INFO.linkedin} target="_blank" rel="noreferrer">
                <Button variant="outline" className="rounded-2xl">
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
       <section id="projects" className="max-w-6xl mx-auto px-4 py-10 scroll-mt-[var(--nav-height)]">            {/* scroll-mt-16  */}
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
      <section id="skills" className="max-w-6xl mx-auto px-4 py-10 scroll-mt-[var(--nav-height)]">
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
      <section id="about" className="max-w-6xl mx-auto px-4 py-10 scroll-mt-[var(--nav-height)]">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">About</h2>
        <p className="text-neutral-700 max-w-3xl leading-relaxed">
          Full-stack & data-oriented software engineer with experience building scalable backends,
           intelligent data pipelines, and modern React frontends.
            Skilled in Python, TypeScript, and experienced with C++, Java, and C#.
             Passionate about transforming data into impactful software products while maintaining clean architecture,
              great developer experience, and a balance between speed, quality, and trust.
        </p>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-6xl mx-auto px-4 py-12 scroll-mt-[var(--nav-height)]">
        <div className="rounded-3xl p-6 border bg-white shadow-sm">
          <h2 className="text-2xl font-semibold tracking-tight mb-2">Let’s talk</h2>
          <p className="text-neutral-700 mb-4">
            Open to full-time or freelance roles. Best way to reach me: Email, LinkedIn and Whatsapp.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${INFO.email}`}>
              <Button variant="outline"className="rounded-2xl">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
            </a>
            <a href={INFO.linkedin} target="_blank" rel="noreferrer">
              <Button variant="outline" className="rounded-2xl">
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
          © {new Date().getFullYear()} • {INFO.name} • {INFO.role}
        </footer>
      </section>

      {/* Back to top floating button */}
      <button
        type="button"
        onClick={scrollTop}
        aria-label="Back to top"
        className={[
          "fixed bottom-6 right-6 z-[60]",
          "rounded-full border bg-white/80 backdrop-blur shadow-md",
          "p-3 hover:bg-white transition-all",
          showTop ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none translate-y-2"
        ].join(" ")}
      >
        <ArrowUp className="h-5 w-5" />
      </button>

    </main>
  );
}
