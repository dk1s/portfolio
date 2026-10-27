import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { projectImages } from "@/data/projectImages";

export interface HeroData {
  name: string;
  role: string;
  tagline: string;
  company: string;
  location: string;
  availability: string;
  description: string;
  githubUrl: string;
  linkedinUrl: string;
  email: string;
}

export interface AboutData {
  bio: string[];
  languages: string[];
  focus: string[];
}

export interface Value {
  title: string;
  description: string;
}

export interface Certification {
  name: string;
  issuer: string;
}

export interface Project {
  title: string;
  description: string;
  /** Key for a lucide-react icon. See src/components/ProjectIcon.tsx */
  icon: string;
  image?: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  type: string;
  highlights: string[];
}

export interface Skill {
  name: string;
  level: number;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  grade: string;
}

export interface SkillsData {
  frontend: Skill[];
  backend: Skill[];
  experience: Experience[];
  education: Education[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface ContactInfo {
  email: string;
  location: string;
  github: string;
  linkedin: string;
}

export interface PortfolioData {
  hero: HeroData;
  about: AboutData;
  values: Value[];
  certifications: Certification[];
  projects: Project[];
  skills: SkillsData;
  stats: Stat[];
  contact: ContactInfo;
}

export const defaultPortfolioData: PortfolioData = {
  hero: {
    name: "Deepak Kumar",
    role: "Software Developer",
    tagline: "Open to new roles & freelance work",
    company: "86 Agency",
    location: "Bihar, India",
    availability: "Available for hire",
    description:
      "I build responsive web applications with React, Next.js, TypeScript and Tailwind CSS — shipping production features for logistics, sports, events and fintech products.",
    githubUrl: "https://github.com/dk1s",
    linkedinUrl: "https://www.linkedin.com/in/deepak-kumar-8084387128-ece",
    email: "deepakkumarplacee@gmail.com",
  },
  about: {
    bio: [
      "I'm a Software Developer at 86 Agency, where I build responsive web applications using React, Next.js, TypeScript, and Tailwind CSS. I've contributed to products including Logyxpress, CricArabia and Cric 11 (Fantasy) — shipping features that run in production for real users.",
      "With a B.Tech in Electronics & Communication Engineering from Bihar Engineering University (7.71 CGPA), I bring a strong analytical foundation to software development. I'm proficient in state management with Redux and Zustand, and I love building CRUD applications that stay maintainable as they grow.",
      "When I'm not coding, you'll find me contributing to open-source projects, playing chess, or exploring robotics. I'm always eager to learn and take on new challenges.",
    ],
    languages: ["English (Proficient)", "Hindi (Native)"],
    focus: [
      "React & Next.js architecture",
      "TypeScript and clean code",
      "State management (Redux, Zustand)",
      "REST & real-time APIs",
      "Responsive, accessible UI",
      "Tailwind CSS design systems",
    ],
  },
  values: [
    {
      title: "Quick Learner",
      description: "Rapidly adapting to new technologies and frameworks with a strong analytical mindset.",
    },
    {
      title: "Clean Code",
      description: "Writing maintainable, well-structured code following best practices and modern standards.",
    },
    {
      title: "Problem Solver",
      description: "Delivering innovative solutions through technical expertise and creative thinking.",
    },
    {
      title: "Goal-Oriented",
      description: "Focused on delivering results and exceeding expectations in every project.",
    },
  ],
  certifications: [
    { name: "The Ultimate React Course 2025", issuer: "Udemy" },
    { name: "Web Development", issuer: "Internshala" },
    { name: "JavaScript For Beginners", issuer: "Udemy" },
    { name: "Programming With Python", issuer: "Internshala" },
    { name: "Geo-processing With Python", issuer: "ISRO (IIRS), Dehradun" },
    { name: "IT Essential & Cybersecurity", issuer: "CISCO Network Academy" },
  ],




  projects: [
    {
      title: "Logyxpress",
      description:
        "End-to-end logistics and delivery management platform. Built responsive interfaces with React/Next.js, integrated RESTful APIs, implemented real-time tracking, and managed complex state with Redux for seamless order management.",
      icon: "Package",
      image: new URL("@/assets/images/LogyXpress_logo.png", import.meta.url).href,
      tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "API Integration"],
      liveUrl: "https://app.logyxps.com/",
      githubUrl: "#",
      featured: true,
      type: "Professional",
      highlights: ["Real-time tracking", "CRUD operations", "State management"],
    },
    {
      title: "A Plus One Admin",
      description:
        "Marketplace operations console for A Plus One services. Admin dashboard to manage vendors, orders, users, services, and platform operations with role-based access control.",
      icon: "Boxes",
      image: new URL("@/assets/images/aplus1_admin.png", import.meta.url).href,
      tags: ["React", "TypeScript", "Admin Panel", "Dashboard"],
      liveUrl: "https://admin-service.weare86.in/",
      githubUrl: "#",
      featured: true,
      type: "Professional",
      highlights: ["Operations dashboard", "Role-based access", "Service management"],
    },
    {
      title: "CricCross",
      description:
        "A standardised cricket skill and fitness circuit with 11 stations, one score, run the same way in every city. Platform for event discovery, slot booking, and performance tracking for cricket players.",
      icon: "Trophy",
      image: new URL("@/assets/images/criccross_logo.png", import.meta.url).href,
      tags: ["React", "TypeScript", "Tailwind CSS", "Event Booking"],
      liveUrl: "https://criccross.com/",
      githubUrl: "#",
      featured: true,
      type: "Professional",
      highlights: ["11-station circuit", "Event booking", "Standardized scoring"],
    },
    {
      title: "86 Agency",
      description:
        "Official website of 86 Agency - a senior-only software development company building custom platforms, cloud infrastructure and AI systems for fintech, healthcare and SaaS teams.",
      icon: "Globe",
      image: new URL("@/assets/images/86-agency-logo.webp", import.meta.url).href,
      tags: ["React", "Next.js", "TypeScript", "Corporate Website"],
      liveUrl: "https://weare86.com/",
      githubUrl: "#",
      featured: true,
      type: "Professional",
      highlights: ["Corporate website", "Brand presence", "Service showcase"],
    },
    {
      title: "Quilence OS",
      description:
        "From-scratch ARM64 mobile operating system roadmap and implementation. Building bootloader, kernel, memory management, scheduler, processes, drivers, filesystem, graphics, window manager, system apps, app runtime, and security from the ground up, tested in QEMU.",
      icon: "Boxes",
      tags: ["C", "Assembly", "Rust", "C++", "ARM64", "Kernel", "OS Development", "QEMU"],
      liveUrl: "#",
      githubUrl: "https://github.com/dk1s/quilence",
      featured: false,
      type: "Personal",
      highlights: ["Custom kernel", "ARM64 boot", "Memory & scheduler", "Graphics & WM"],
    },
    {
      title: "CricArabia",
      description:
        "Cricket platform for the Arabian region. Developed responsive UI components, integrated live match APIs for real-time scores, implemented Zustand for efficient state management, and built interactive data visualizations.",
      icon: "Globe",
      image: new URL("@/assets/images/Cric_Arabia.png", import.meta.url).href,
      tags: ["React", "TypeScript", "Tailwind CSS", "Zustand", "REST API", "Real-time Data"],
      liveUrl: "https://cricarabia.com/",
      githubUrl: "#",
      featured: true,
      type: "Professional",
      highlights: ["Live scores", "API integration", "Zustand state"],
    },
    {
      title: "Cric 11 (Fantasy)",
      description:
        "Feature-rich fantasy cricket application with team building, live scoring, and competitive leaderboards. Implemented complex state management with Redux, real-time updates via Socket.IO, and responsive mobile-first design.",
      icon: "Trophy",
      image: new URL("@/assets/images/Cric_Arabia.png", import.meta.url).href,
      tags: ["React", "Next.js", "TypeScript", "Redux", "Socket.IO", "Tailwind CSS"],
      liveUrl: "https://cric11.com",
      githubUrl: "#",
      featured: true,
      type: "Professional",
      highlights: ["Socket.IO chat", "Real-time updates", "Redux state"],
    },
    {
      title: "CricketGyan",
      description:
        "Full-featured cricket platform covering live scores, series, rankings, schedules, statistics, news, photos, videos and teams — powered by real-time Socket.IO updates, Redux state management and RTK Query for efficient data fetching.",
      icon: "Radio",
      image: new URL("@/assets/images/cricketgyan_logo.jpg", import.meta.url).href,
      tags: ["React", "Redux", "Tailwind CSS", "Socket.IO", "TypeScript", "RTK Query"],
      liveUrl: "https://cricketgyan.com/",
      githubUrl: "#",
      featured: true,
      type: "Professional",
      highlights: ["Live scores", "Socket.IO", "Series & rankings"],
    },
    {
      title: "FireSetGo",
      description:
        "Dynamic event and activity booking platform. Built complete frontend with React, integrated payment APIs, implemented user authentication flows, and created intuitive booking interfaces with smooth animations.",
      icon: "Flame",
      image: new URL("@/assets/images/FSG_logo.png", import.meta.url).href,
      tags: ["React", "Next.js", "TypeScript", "API Integration", "Zustand", "Tailwind CSS"],
      liveUrl: "https://app.firesetgo.com/",
      githubUrl: "#",
      featured: true,
      type: "Professional",
      highlights: ["Payment integration", "User auth", "Booking system"],
    },
    {
      title: "EventBooking",
      description:
        "Comprehensive event management and ticket booking system. Developed responsive event listings, integrated calendar APIs, built real-time seat selection, and implemented chat support via Socket.IO for customer assistance.",
      icon: "Ticket",
      image: new URL("@/assets/images/FSG_logo.png", import.meta.url).href,
      tags: ["React", "TypeScript", "Socket.IO", "Redux", "REST API", "Tailwind CSS"],
      liveUrl: "https://event-booking.firesetgo.com/",
      githubUrl: "#",
      featured: true,
      type: "Professional",
      highlights: ["Chat support", "Seat selection", "Calendar integration"],
    },
    {
      title: "VisaNet",
      description:
        "Visa application and immigration services platform. Created multi-step application forms, integrated document upload APIs, built status tracking dashboard, and implemented secure data handling with form validation.",
      icon: "Plane",
      tags: ["React", "Next.js", "TypeScript", "Zustand", "API Integration", "Zod"],
      liveUrl: "https://app.locapay.co.ke/",
      githubUrl: "#",
      featured: true,
      type: "Professional",
      highlights: ["Multi-step forms", "Document upload", "Status tracking"],
    },
    {
      title: "Portfolio Website",
      description:
        "A responsive personal portfolio showcasing skills, projects and achievements, built with React, TypeScript and Tailwind CSS with smooth scroll animations and a full light and dark theme.",
      icon: "LayoutTemplate",
      tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      liveUrl: "https://dk1s.github.io/Portfolio/",
      githubUrl: "https://github.com/dk1s/Portfolio",
      featured: false,
      type: "Personal",
      highlights: ["Responsive", "Animations", "Theming"],
    },
    {
      title: "Anti-Sleep Alarm System",
      description:
        "B.Tech project: developed an anti-sleep alarm with smart glasses that detects driver fatigue through eye-tracking sensors and alerts to prevent road accidents.",
      icon: "Eye",
      tags: ["IoT", "Electronics", "Sensors", "Safety Systems", "Arduino"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
      type: "Academic",
      highlights: ["Eye tracking", "Safety alert", "IoT sensors"],
    },
    {
      title: "Wireless Mobile Charging",
      description:
        "Diploma project: developed a wireless charging system enabling efficient, contactless power transfer using electromagnetic induction technology for modern smartphones.",
      icon: "BatteryCharging",
      tags: ["Electronics", "Electromagnetic Induction", "Power Transfer", "Hardware"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
      type: "Academic",
      highlights: ["Wireless power", "EM induction", "Hardware design"],
    },
  ],
  skills: {
    frontend: [
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 90 },
      { name: "SQL", level: 85 },
      { name: "React.js", level: 90 },
      { name: "Next.js", level: 90 },
      { name: "Redux Toolkit", level: 85 },
      { name: "Zustand", level: 85 },
      { name: "RTK Query", level: 85 },
      { name: "Tailwind CSS", level: 95 },
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 95 },
    ],
    backend: [
      { name: "WebSocket", level: 85 },
      { name: "Agora SDK", level: 80 },
      { name: "Socket.io", level: 90 },
      { name: "REST API Integration", level: 90 },
      { name: "Git", level: 90 },
      { name: "GitHub", level: 90 },
      { name: "Postman", level: 90 },
      { name: "Salesforce Supersets", level: 80 },
      { name: "n8n", level: 80 },
      { name: "WordPress", level: 80 },
      { name: "SEO Management", level: 80 },
      { name: "UI/UX Design", level: 80 },
      { name: "AI Automation", level: 85 },
      { name: "Workflow Automation", level: 85 },
      { name: "OpenAI API", level: 85 },
      { name: "Google Gemini API", level: 85 },
      { name: "Prompt Engineering", level: 90 },
      { name: "Claude Code", level: 90 },
      { name: "Gemini CLI", level: 90 },
      { name: "OpenAI Codex", level: 90 },
      { name: "OpenCode", level: 90 },
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 85 },
      { name: "REST APIs", level: 90 },
      { name: "MongoDB", level: 80 },
      { name: "JWT Authentication", level: 85 },
      { name: "Python", level: 75 },
      { name: "MS Office", level: 85 },
    ],
    experience: [
      {
        title: "Software Developer",
        company: "86 Agency",
        period: "03/2025 - Present",
        description:
          "Building responsive web apps using React, Next.js, TypeScript, and Tailwind CSS with CRUD operations and state management (Redux, Zustand). Contributed to products including Logyxpress, CricArabia and Cric 11 (Fantasy).",
      },
      {
        title: "Salesforce Developer Virtual Internship",
        company: "Smart Internz",
        period: "12/2023 - 01/2024",
        description:
          "8-week internship with hands-on Experimental Learning Program containing Bootcamps. Completed Superset certification.",
      },
      {
        title: "Industrial Training - Telecommunications",
        company: "DRM Office, Indian Railways",
        period: "09/2019 - 10/2019",
        description:
          "4-week industrial training in Telecommunications at the DRM Office, Katihar. Gained practical experience in railway communication systems.",
      },
    ],
    education: [
      {
        degree: "B.Tech in Electronics & Communication Engineering",
        institution: "Bihar Engineering University, Araria",
        period: "12/2021 - 08/2024",
        grade: "7.71 CGPA",
      },
      {
        degree: "Diploma in Electronics Engineering",
        institution: "State Board of Technical Education, Katihar",
        period: "09/2016 - 12/2020",
        grade: "7.88 CGPA",
      },
      {
        degree: "Matriculation",
        institution: "Central Board of Secondary Education, Purnea",
        period: "05/2015 - 05/2016",
        grade: "9.0 CGPA",
      },
    ],
  },
  stats: [
    { value: "10", label: "Projects shipped" },
    { value: "6", label: "Certifications earned" },
    { value: "5+", label: "Years in tech" },
    { value: "8+", label: "Core technologies" },
  ],
  contact: {
    email: "deepakkumarplacee@gmail.com",
    location: "Bihar, India",
    github: "github.com/dk1s",
    linkedin: "Deepak Kumar",
  },
};

const STORAGE_KEY = "portfolio_data_v4";
const ADMIN_PASSWORD_KEY = "portfolio_admin_password";
const DEFAULT_PASSWORD = "admin123"; // User should change this

interface PortfolioContextType {
  data: PortfolioData;
  updateData: (newData: Partial<PortfolioData>) => void;
  updateSection: <K extends keyof PortfolioData>(
    section: K,
    newData: PortfolioData[K]
  ) => void;
  resetToDefault: () => void;
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  changePassword: (oldPassword: string, newPassword: string) => boolean;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<PortfolioData>;
        const merged = { ...defaultPortfolioData, ...parsed };
        const visanet = merged.projects?.find((p) => p.title === "VisaNet");
        const visanetImage = (visanet as Project & { image?: string } | undefined)?.image;
        if (
          !merged.projects?.find((p) => p.title === "CricCross") ||
          !merged.projects?.find((p) => p.title === "A Plus One Admin") ||
          !merged.projects?.find((p) => p.title === "86 Agency") ||
          !merged.projects?.find((p) => p.title === "Quilence OS") ||
          merged.projects.filter((p) => p.title === "Quilence OS").length > 1 ||
          (visanetImage && (visanetImage.includes("A_Plus") || visanetImage.includes("aplus")))
        ) {
          merged.projects = defaultPortfolioData.projects;
        }
        return merged;
      }
      return defaultPortfolioData;
    } catch {
      return defaultPortfolioData;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("portfolio_auth") === "true";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const updateData = (newData: Partial<PortfolioData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const updateSection = <K extends keyof PortfolioData>(
    section: K,
    newData: PortfolioData[K]
  ) => {
    setData((prev) => ({ ...prev, [section]: newData }));
  };

  const resetToDefault = () => {
    setData(defaultPortfolioData);
    localStorage.removeItem(STORAGE_KEY);
  };

  const login = (password: string) => {
    const storedPassword = localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_PASSWORD;
    if (password === storedPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem("portfolio_auth", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("portfolio_auth");
  };

  const changePassword = (oldPassword: string, newPassword: string) => {
    const storedPassword = localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_PASSWORD;
    if (oldPassword === storedPassword) {
      localStorage.setItem(ADMIN_PASSWORD_KEY, newPassword);
      return true;
    }
    return false;
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        updateData,
        updateSection,
        resetToDefault,
        isAuthenticated,
        login,
        logout,
        changePassword,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
