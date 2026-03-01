"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence } from "framer-motion";

interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    image: string;
    tech: string[];
    links: { label: string; url: string }[];
    gradient: string;
    features: string[];
    screenshots: { src: string; label: string }[];
}

const projects: Project[] = [
    {
        id: 1,
        title: "Intelligent Market Research Agent",
        category: "AI-Powered Research Platform",
        description: "A full-stack AI-powered research platform that enables users to generate comprehensive market analysis reports through autonomous agent orchestration. Architected with Python and CrewAI, coordinating multiple AI agents to conduct deep-dive analysis.",
        image: "/images/projects/market-research-agent.svg",
        tech: ["Python", "FastAPI", "Next.js", "CrewAI", "Google Gemini Pro", "Tavily Search", "Tailwind CSS"],
        links: [],
        gradient: "from-purple-500/20 to-violet-500/20",
        features: [
            "Autonomous multi-agent market research using CrewAI",
            "Google Gemini Pro & Tavily Search for real-time web scraping",
            "Fact verification & advanced NLP for data synthesis",
            "High-performance RESTful API with FastAPI",
            "Background task management for concurrent research",
            "Real-time status polling with dynamic markdown rendering",
            "Modern responsive UI with Next.js & Tailwind CSS",
        ],
        screenshots: [],
    },
    {
        id: 2,
        title: "Flight Booking System",
        category: "Full-Stack Web Application",
        description: "A backend-focused flight booking web application built with Spring Boot and MySQL, enabling users to search, book, and manage flight reservations efficiently with secure authentication and role-based access control.",
        image: "/images/projects/flight-booking.svg",
        tech: ["Java", "Spring Boot", "MySQL", "Spring Security", "JPA/Hibernate", "Postman"],
        links: [],
        gradient: "from-sky-500/20 to-indigo-500/20",
        features: [
            "Secure RESTful APIs for registration, search, booking & cancellation",
            "Relational database schema design with JPA/Hibernate",
            "Spring Security authentication, session management & RBAC",
            "Robust service & repository layers with validation",
            "Global exception handling for clean error responses",
            "Flight availability checks & booking logic",
            "SDLC principles with Git-based collaboration",
        ],
        screenshots: [],
    },
];

// Project Detail Modal
function ProjectModal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
    const [currentImg, setCurrentImg] = useState(0);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl overflow-y-auto"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative max-w-6xl mx-auto my-8 md:my-16 px-4 sm:px-6"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="fixed top-4 right-4 md:top-8 md:right-8 z-[110] w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110"
                >
                    <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>

                {/* Hero image */}
                <div className="relative w-full aspect-[21/9] rounded-2xl md:rounded-3xl overflow-hidden mb-8 md:mb-12">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8">
                        <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-white/70 mb-3">
                            {project.category}
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white tracking-tight">{project.title}</h2>
                    </div>
                </div>

                {/* Content grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
                    {/* Description */}
                    <div className="lg:col-span-2 space-y-6">
                        <div>
                            <h3 className="text-lg md:text-xl font-bold text-white mb-3">About the Project</h3>
                            <p className="text-sm md:text-base text-white/60 leading-relaxed">{project.description}</p>
                        </div>

                        {project.features.length > 0 && (
                            <div>
                                <h3 className="text-lg md:text-xl font-bold text-white mb-3">Key Features</h3>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {project.features.map((f, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="flex items-start gap-2 text-sm text-white/70"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                                            {f}
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-3">Tech Stack</h4>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map(t => (
                                    <span key={t} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/70">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {project.links.length > 0 && (
                            <div>
                                <h4 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-3">Download</h4>
                                <div className="flex flex-col gap-3">
                                    {project.links.map((link, i) => (
                                        <a
                                            key={i}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
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

                {/* Screenshots Gallery */}
                {project.screenshots.length > 0 && (
                    <div className="mb-12">
                        <h3 className="text-lg md:text-xl font-bold text-white mb-6">App Screenshots</h3>

                        {/* Phone mockup carousel */}
                        <div className="relative">
                            <div className="flex gap-4 md:gap-6 overflow-x-auto pb-6 snap-x snap-mandatory no-scrollbar px-2">
                                {project.screenshots.map((ss, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.06 }}
                                        className="shrink-0 snap-center cursor-pointer group"
                                        onClick={() => setCurrentImg(i)}
                                    >
                                        <div className="relative w-[180px] sm:w-[200px] md:w-[240px] aspect-[9/19.5] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border-2 border-white/10 bg-neutral-900 shadow-xl group-hover:border-purple-500/50 transition-all group-hover:scale-[1.03]">
                                            <Image
                                                src={ss.src}
                                                alt={ss.label}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <p className="text-xs text-white/40 text-center mt-2 group-hover:text-white/70 transition-colors">{ss.label}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Lightbox for selected screenshot */}
                        <AnimatePresence>
                            {currentImg >= 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed inset-0 z-[120] bg-black/95 flex items-center justify-center"
                                    onClick={() => setCurrentImg(-1)}
                                >
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setCurrentImg(Math.max(0, currentImg - 1)); }}
                                        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all z-10"
                                    >
                                        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setCurrentImg(Math.min(project.screenshots.length - 1, currentImg + 1)); }}
                                        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all z-10"
                                    >
                                        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                                    </button>
                                    <motion.div
                                        key={currentImg}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="relative w-[280px] sm:w-[320px] md:w-[380px] aspect-[9/19.5] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border-2 border-white/20 shadow-2xl"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Image
                                            src={project.screenshots[currentImg].src}
                                            alt={project.screenshots[currentImg].label}
                                            fill
                                            className="object-cover"
                                        />
                                    </motion.div>
                                    <p className="absolute bottom-6 md:bottom-12 text-white/60 text-sm">
                                        {project.screenshots[currentImg].label} — {currentImg + 1}/{project.screenshots.length}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}

function ProjectCard({ project, onClick }: { project: typeof projects[0]; onClick: () => void }) {
    return (
        <div
            onClick={onClick}
            className="group relative h-[60vh] md:h-[70vh] w-[85vw] md:w-[70vw] shrink-0 rounded-2xl md:rounded-[3rem] overflow-hidden border border-white/10 bg-neutral-900/50 backdrop-blur-xl snap-center cursor-pointer"
        >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br opacity-20 transition-opacity duration-500 group-hover:opacity-40 ${project.gradient}`} />

            <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
                {/* Image Side */}
                <div className="relative h-1/2 md:h-full overflow-hidden">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-neutral-900 to-transparent opacity-80" />
                </div>

                {/* Content Side */}
                <div className="relative p-5 sm:p-6 md:p-16 flex flex-col justify-center h-1/2 md:h-full z-10">
                    <div className="mb-auto">
                        <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] md:text-xs font-mono text-white/60 mb-3 md:mb-6">
                            {project.category}
                        </span>
                        <h3 className="text-2xl sm:text-3xl md:text-6xl font-bold text-white mb-2 md:mb-6 leading-tight">
                            {project.title}
                        </h3>
                        <p className="text-xs sm:text-sm md:text-xl text-white/60 leading-relaxed max-w-md line-clamp-2 md:line-clamp-none">
                            {project.description}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-8">
                        {project.tech.slice(0, 4).map(t => (
                            <span key={t} className="px-2 py-0.5 md:px-3 md:py-1 bg-black/40 border border-white/5 rounded-lg text-[10px] md:text-sm text-white/40">
                                {t}
                            </span>
                        ))}
                        {project.tech.length > 4 && (
                            <span className="px-2 py-0.5 md:px-3 md:py-1 bg-black/40 border border-white/5 rounded-lg text-[10px] md:text-sm text-white/40">
                                +{project.tech.length - 4}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-2 text-purple-400 text-xs md:text-sm font-medium group-hover:gap-3 transition-all">
                        <span>View Project</span>
                        <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function Projects() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

    return (
        <>
            <section ref={targetRef} className="relative h-auto md:h-[300vh] bg-background">
                <div className="relative md:sticky top-0 h-auto md:h-screen flex flex-col justify-center overflow-hidden py-8 md:py-0">

                    <div className="mb-6 md:mb-12 px-4 md:px-12 text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl sm:text-5xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 tracking-tighter"
                        >
                            Projects
                        </motion.h2>
                    </div>

                    <div className="relative w-full">
                        {/* Desktop: Scroll-linked horizontal */}
                        <div className="hidden md:block pl-12">
                            <motion.div style={{ x }} className="flex gap-16 w-max">
                                {projects.map((project, i) => (
                                    <ProjectCard key={i} project={project} onClick={() => setSelectedProject(project)} />
                                ))}
                            </motion.div>
                        </div>

                        {/* Mobile: Horizontal scroll */}
                        <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-8 w-full no-scrollbar">
                            {projects.map((project, i) => (
                                <ProjectCard key={i} project={project} onClick={() => setSelectedProject(project)} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Project Detail Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
                )}
            </AnimatePresence>
        </>
    );
}
