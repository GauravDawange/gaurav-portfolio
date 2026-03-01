import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const projectsData: Record<string, {
    title: string;
    category: string;
    description: string;
    image: string;
    tech: string[];
    features: string[];
    links: { label: string; url: string }[];
    screenshots: { src: string; label: string }[];
}> = {
    "intelligent-market-research-agent": {
        title: "Intelligent Market Research Agent",
        category: "AI-Powered Research Platform",
        description: "A full-stack AI-powered research platform designed and implemented using Python/FastAPI and Next.js, enabling users to generate comprehensive market analysis reports through autonomous agent orchestration. Architected an autonomous market research system using Python and CrewAI, coordinating multiple AI agents to conduct deep-dive analysis and generate comprehensive reports.",
        image: "/images/projects/market-research-agent.svg",
        tech: ["Python", "FastAPI", "Next.js", "CrewAI", "Google Gemini Pro", "Tavily Search", "Tailwind CSS"],
        features: [
            "Autonomous multi-agent market research using CrewAI",
            "Google Gemini Pro & Tavily Search APIs for real-time web scraping",
            "Fact verification & advanced NLP for data synthesis",
            "High-performance RESTful API with FastAPI",
            "Background task management for concurrent long-running research",
            "Real-time status polling with dynamic markdown rendering",
            "Modern responsive UI built with Next.js & Tailwind CSS",
        ],
        links: [],
        screenshots: [],
    },
    "flight-booking-system": {
        title: "Flight Booking System",
        category: "Full-Stack Web Application",
        description: "Designed and implemented the backend of a flight booking web application using Spring Boot and MySQL, enabling users to search, book, and manage flight reservations efficiently. Built secure, scalable RESTful APIs for user registration, flight search, booking, and cancellation features. Integrated Spring Security for user authentication, session management, and role-based access control.",
        image: "/images/projects/flight-booking.svg",
        tech: ["Java", "Spring Boot", "MySQL", "Spring Security", "JPA/Hibernate", "Postman", "Git"],
        features: [
            "Secure RESTful APIs for registration, flight search, booking & cancellation",
            "Relational database schema design with JPA/Hibernate CRUD operations",
            "Spring Security for authentication, session management & role-based access",
            "Robust service & repository layers for booking logic & validation",
            "Global exception handling with Postman-tested API validation",
            "Flight availability checks & user data validation",
            "SDLC principles with Git-based frontend collaboration",
        ],
        links: [],
        screenshots: [],
    },
};

const getProject = (slug: string) => {
    return projectsData[slug] || null;
};

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = getProject(slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background pt-24 md:pt-32 pb-16 md:pb-20 px-4 sm:px-6 md:px-12">
            <Link href="/#work" className="inline-flex items-center text-white/60 hover:text-white mb-6 md:mb-8 transition-colors text-sm">
                <ArrowLeft className="mr-2 w-4 h-4" /> Back to Work
            </Link>

            {/* Hero */}
            <div className="relative w-full aspect-[16/7] md:aspect-[21/9] rounded-2xl md:rounded-3xl overflow-hidden mb-8 md:mb-12">
                <Image src={project.image} alt={project.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-white/70 mb-2">
                        {project.category}
                    </span>
                    <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white tracking-tighter">{project.title}</h1>
                </div>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16">
                <div className="lg:col-span-2 space-y-6">
                    <div>
                        <h2 className="text-lg md:text-xl font-bold text-white mb-3">About the Project</h2>
                        <p className="text-sm md:text-lg text-white/70 leading-relaxed">{project.description}</p>
                    </div>

                    {project.features.length > 0 && (
                        <div>
                            <h2 className="text-lg md:text-xl font-bold text-white mb-3">Key Features</h2>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {project.features.map((f, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-3">Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map(t => (
                                <span key={t} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/70">{t}</span>
                            ))}
                        </div>
                    </div>

                    {project.links.length > 0 && (
                        <div>
                            <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-3">Download</h3>
                            <div className="flex flex-col gap-3">
                                {project.links.map((link, i) => (
                                    <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        {link.label}
                                        <ArrowUpRight className="w-4 h-4" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Screenshots */}
            {project.screenshots.length > 0 && (
                <div>
                    <h2 className="text-lg md:text-xl font-bold text-white mb-6">App Screenshots</h2>
                    <div className="flex gap-4 md:gap-6 overflow-x-auto pb-6 no-scrollbar">
                        {project.screenshots.map((ss, i) => (
                            <div key={i} className="shrink-0">
                                <div className="relative w-[180px] sm:w-[200px] md:w-[240px] aspect-[9/19.5] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border-2 border-white/10 bg-neutral-900 shadow-xl hover:border-purple-500/50 transition-all hover:scale-[1.03]">
                                    <Image src={ss.src} alt={ss.label} fill className="object-cover" />
                                </div>
                                <p className="text-xs text-white/40 text-center mt-2">{ss.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </main>
    );
}
