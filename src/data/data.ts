export const INFO = {
  name: "Omer Assenheimer",
  role: "Software Engineer Data-Oriented",
  location: "Israel",
  email: "Omeraluf@gmail.com",
  phone: "054-2105916",
  linkedin: "https://www.linkedin.com/in/omer-assenheimer",
  github: "https://github.com/omeraluf",
  resumeUrl: "/Omer-Assenheimer-CV-Software-Engineer-2025.pdf",
} as const;

export const SKILLS = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind", "Shadcn UI"] },
  { group: "Backend", items: ["FastAPI", "Node", "REST", "WebSockets", "Auth"] },
  { group: "Data", items: ["Pandas", "scikit-learn", "TensorFlow", "SQL", "Seaborn", "ETL", "MongoDB"] },
  { group: "DevOps", items: ["Git", "Docker", "CI/CD", "Vercel"] }
] as const;

//const LANGUAGES = ["Python", "Java", "C", "C++", "SQL", "NoSQL", "HTML", "CSS", "Assembly", "Linux", "Jupyter Notebook"];                             // Add it whenever

type Project = {
  title: string;
  blurb: string;
  tech: string[];
  live: string;
  repo: string;
  videoSrc: string;
};

export const PROJECTS: Project[] = [
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
] as const;