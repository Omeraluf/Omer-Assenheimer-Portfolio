// src/App.tsx
import logo from "/android-chrome-512x512.png";
import { useEffect } from "react";
import { Github, Mail, Linkedin, Phone, MapPin, ArrowUp, ExternalLinkIcon, GraduationCap, Eye} from "lucide-react";
import { useState } from "react";
import { Button } from "./components/ui/button";
import { EmailButton } from "./components/ui/EmailButton";
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/card";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import PreviewButton from "./components/ui/PreviewButton";




// —— QUICK EDIT AREA ——
const INFO = {
  name: "Omer Assenheimer",
  role: "Software Engineer Data-Oriented",
  location: "Israel",
  email: "Omeraluf@gmail.com",
  phone: "054-2105916",
  linkedin: "https://www.linkedin.com/in/omer-assenheimer",
  github: "https://github.com/omeraluf",
  resumeUrl: "/Omer-Assenheimer-CV-Software-Engineer-2025.pdf",
};

type Project = {
  title: string;
  blurb: string;
  tech: string[];
  live: string;
  repo: string;
  videoSrc: string;
};

const PROJECTS: Project[] = [
  {
    title: "Israeli News Monitor",
    blurb:
      "A platform that analyzes Israeli news articles to reveal cross-outlet trends.",
    tech: ["Python", "Pandas", "NLP", "Sentiment Analysis", "Data Processing", "Web Scraping"],
    live: "#",
    repo: "https://github.com/Omeraluf/israeli-media-monitor",
    videoSrc: "",
  },
  {
  title: "DeepFake Detector",
  blurb: "An AI-powered web application that detects manipulated videos and images using deep learning models built with TensorFlow and PyTorch.",
  tech: ["Python", "Streamlit", "TensorFlow", "Keras", "PyTorch", "OpenCV"],
  live: "#",
  repo: "https://github.com/omeraluf",
  videoSrc: "/previews/DeepFake Detector.mp4",
  },
  {
    title: "Structural Risk Monitor", //"IoT Building Safety Monitor", Building Stability Tracker
    blurb:
      "A monitoring system for detecting structural risks from real-time sensor data.",
    tech: ["Python", "FastAPI", "MongoDB", "WebSockets", "Grafana"],
    live: "#",
    repo: "https://github.com/omeraluf",
    videoSrc: "",
  },
  {
    title: "Job Listings Scraper",
    blurb:
      "A tool that collects remote job listings and organizes them into structured data.",
    tech: ["Python", "BeautifulSoup", "Requests", "Pandas"],
    live: "#",
    repo: "https://github.com/Omeraluf/Remote-jobs-scraper",
    videoSrc: "",
  },
  {
  title: "Wizard E-Commerce Platform",
  blurb:
    "A 'Harry Potter'-themed E-commerce website for browsing magical items, managing a cart, and completing purchases.",
  tech: ["C#", "ASP.NET Core MVC", "Razor", "SQL Server", "HTML", "CSS", "JavaScript"],
  live: "#",
  repo: "https://github.com/omeraluf",
  videoSrc: "",
  },
  {
    title: "School Risk Predictor",
    blurb:
      "A predictive model that identifies school safety risk factors using ML.",
    tech: ["Pandas", "scikit-learn", "XGBoost", "Matplotlib", "Kaggle"],
    live: "https://drive.google.com/drive/folders/1tEmx-MxRnJQODJ4_HkSGVskL3Y8UyFXA?usp=sharing",
    repo: "https://github.com/Omeraluf/School-Saftey-Risk-Prediction",
    videoSrc: "",
  },
];

const SKILLS = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind", "Shadcn UI"] },
  { group: "Backend", items: ["FastAPI", "Node", "REST", "WebSockets", "Auth"] },
  { group: "Data", items: ["Pandas", "scikit-learn", "TensorFlow", "SQL", "Seaborn", "ETL", "MongoDB"] },
  { group: "DevOps", items: ["Git", "Docker", "CI/CD", "Vercel"] }
];

//const LANGUAGES = ["Python", "Java", "C", "C++", "SQL", "NoSQL", "HTML", "CSS", "Assembly", "Linux", "Jupyter Notebook"];                             // Add it whenever


export default function App() {
  const [active, setActive] = useState<"hero" | "projects" | "skills" | "about" | "contact">("projects");
  const scrollTo = useSmoothScroll();

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
  useEffect(() => {
  const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));
  if (!sections.length) return;

  // How much of the viewport counts as "active zone":
  // top 30% to bottom 40% (tweak if you like)
  const observer = new IntersectionObserver(
    (entries) => {
      // Pick the most visible entry that’s intersecting
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible?.target?.id) {
        setActive(visible.target.id as typeof active);
      }

      // Bottom-of-page fallback: ensure the last section highlights when you hit the end
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom && sections.length) {
        setActive(sections[sections.length - 1].id as typeof active);
      }
    },
    {
      // Shrink the root so a section becomes "active" when it’s in the central band
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: [0.05, 0.2, 0.4, 0.6, 0.8], // multiple thresholds for smoother updates
    }
  );

  sections.forEach((s) => observer.observe(s));
  return () => observer.disconnect();
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
          <button
          onClick={() => {
            scrollTo("hero");       // smooth scroll
            setActive("hero");      // update active highlight
          }}
          className="font-semibold tracking-tight text-lg flex items-center gap-3"
        >
            <img src={logo} alt="OA Logo" className="h-8 w-8" />
            <span>{INFO.name}</span>
          </button>
          <nav className="flex items-center gap-2 text-sm">
            {[
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
                  size="sm"
                  variant={isActive ? "primaryBlue" : "outline"}
                  className="rounded-full"
                  onClick={() => {
                    scrollTo(link.id);                // 👈 smooth scroll instead of href
                    setActive(link.id as typeof active);
                  }}
                >
                  {link.label}
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
              <Button className="rounded-2xl shadow-sm"                                  //animate-bounce
              style={{ animationDuration: "2s" }}>
                <ExternalLinkIcon className="h-4 w-4 mr-2" />
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
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight max-w-md ">{INFO.role}</h1>
            {/* <p className="text-neutral-600 text-sm md:text-base mt-1">
              B.Sc. in Software Engineering
            </p> */}

            <p className="mt-4 text-neutral-700 leading-relaxed">
              {/* I build clean, efficient, and reliable software with a focus on clear logic, good structure, and meaningful user impact. */}
              With an open mind and ambition to tackle challenges, I thrive as a
              team player and strive to bring curiosity and creativity to every challenge.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={`mailto:${INFO.email}`}>
                <EmailButton email={INFO.email} />
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
                <CardTitle className="text-base">Details</CardTitle>
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

                <p className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  {"BSc Software Engineering"}
                </p>

                {/* <p className="flex items-center gap-2>
                  <BookOpen className="h-4 w-4 inline-block mr-2" />
                  {B.Sc. Software Engineering}
                </p> */}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects */}
       <section
        id="projects"
        className="max-w-6xl mx-auto px- py-2 scroll-mt-[var(--nav-height)]">
        <h2 className="text-2xl font-semibold tracking-tight mb-6">
          {/* text-[#3588db] */}
          Featured Projects
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {PROJECTS.map((p, i) => (
            <Card
              key={i}
              className="rounded-2xl hover:shadow-md transition-shadow flex flex-col h-full"
            >
              <CardHeader>
                <CardTitle className="text-lg">{p.title}</CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col flex-grow">
                <p className="text-sm text-neutral-700 mb-3">{p.blurb}</p>

                <ul className="flex flex-wrap gap-2 mb-auto">
                  {p.tech.map((t) => (
                    <li
                      key={t}
                      className="text-xs bg-neutral-100 rounded-full px-2.5 py-1"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex gap-2 pt-4">
                  {/* <a href={p.live} target="_blank" rel="noreferrer"> */}
                    {/* <Button size="sm" className="rounded-xl " variant="default"> */}
                      
                      {/* <PreviewButton src="/previews/DeepFake Detector.mp4" /> */}
                      {/* <PreviewButton
                        src="/previews/DeepFake Detector.mp4"
                        poster="/previews/DeepFake Detector.jpg"
                        label="Preview"
                        
                      /> */}
                      {/* Preview */}
                    {/* </Button> */}
                    <div>
                      <PreviewButton
                        variant="default"
                        videoSrc={p.videoSrc}
                        popPlacement="top"
                        className = "rounded-xl size-sm"
                      >
                        <Eye className="h-4 w-4 mr-2"  />
                        Preview
                      </PreviewButton>
                    </div>

                  {/* </a> */}
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
                    <li key={i}
                    className="text-xs bg-neutral-100 rounded-full px-2.5 py-1 inline-block mb-1">
                      {i}</li>
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
          Full-stack and data-oriented software engineer experienced in building scalable backends,
           intelligent data pipelines, and modern React frontends. Skilled in Python, C++, C, Java,
            and C#. Passionate about bridging data engineering and artificial intelligence to create
             software that learns, adapts, and delivers real-world results while maintaining clean
              architecture and a strong focus on performance, scalability, and reliability.
        </p>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-6xl mx-auto px-4 py-12 scroll-mt-[var(--nav-height)]">
        <div className="rounded-3xl p-6 border bg-white shadow-sm">
          <h2 className="text-2xl font-semibold tracking-tight mb-2">Let's talk</h2>
          {/* <p className="text-neutral-700 mb-4">
            Open to full-time or freelance roles. Best way to reach me: Email, LinkedIn and Whatsapp.
          </p> */}
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${INFO.email}`}>
              <EmailButton email={INFO.email} />
            </a>
            <a href={INFO.linkedin} target="_blank" rel="noreferrer">
              <Button variant="outline" className="rounded-2xl">
                <Linkedin className="h-4 w-4 mr-2" />
                Connect
              </Button>
            </a>
            <a href={`https://wa.me/${INFO.phone.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noreferrer">
              <Button variant="outline" className="rounded-2xl">
                <Phone className="h-4 w-4 mr-2" />
                WhatsApp
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
