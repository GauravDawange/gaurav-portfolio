"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState, useEffect } from "react";

import { projects, type Project } from "@/data/projects";

const projectAccentById: Record<string, string> = {
    shopease: "from-purple-500/15 to-blue-500/15",
    "employee-tracking": "from-emerald-500/15 to-sky-500/15",
    "drone-survey": "from-indigo-500/15 to-sky-500/15",
    "market-research-agent": "from-purple-500/15 to-violet-500/15",
    bloodlink: "from-rose-500/15 to-orange-500/15",
};

function ProjectModal({
    project,
    onClose,
}: {
    project: Project;
    onClose: () => void;
}) {
    const [currentImg, setCurrentImg] = useState<number | null>(null);

    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        const originalHeight = document.body.style.height;
        document.body.style.overflow = "hidden";
        document.body.style.height = "100vh";
        return () => {
            document.body.style.overflow = originalOverflow;
            document.body.style.height = originalHeight;
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-xl overflow-y-auto"
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
                <button
                    type="button"
                    aria-label="Close"
                    onClick={onClose}
                    className="fixed top-4 right-4 md:top-8 md:right-8 z-[110] w-10 h-10 md:w-12 md:h-12 rounded-full bg-card/70 border border-border flex items-center justify-center text-foreground hover:bg-accent/70 transition-all hover:scale-110"
                >
                    <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>

                <div className="relative w-full aspect-[21/9] rounded-2xl md:rounded-3xl overflow-hidden mb-8 md:mb-12">
                    <Image src={project.image} alt={project.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                    <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8">
                        <span className="inline-block px-3 py-1 rounded-full bg-card/70 border border-border text-xs font-mono text-foreground/70 mb-3">
                            {project.category}
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white tracking-tight">
                            {project.title}
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
                    <div className="lg:col-span-2 space-y-6">
                        <div>
                            <h3 className="text-lg md:text-xl font-bold text-foreground mb-3">About the Project</h3>
                            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        {project.features.length > 0 && (
                            <div>
                                <h3 className="text-lg md:text-xl font-bold text-foreground mb-3">Key Features</h3>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {project.features.map((feature, i) => (
                                        <motion.li
                                            key={feature}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.04 }}
                                            className="flex items-start gap-2 text-sm text-muted-foreground"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                            {feature}
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3">
                                Tech Stack
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((t) => (
                                    <span
                                        key={t}
                                        className="px-3 py-1.5 rounded-full bg-card/60 border border-border text-xs text-foreground/80"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {project.links.length > 0 && (
                            <div>
                                <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3">
                                    Links
                                </h4>
                                <div className="flex flex-col gap-3">
                                    {project.links.map((link) => (
                                        <a
                                            key={link.url}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-primary text-primary-foreground font-medium text-sm transition-transform hover:scale-[1.01] active:scale-[0.98]"
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

                {project.screenshots.length > 0 && (
                    <div className="mb-12">
                        <h3 className="text-lg md:text-xl font-bold text-foreground mb-6">App Screenshots</h3>

                        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-6 snap-x snap-mandatory no-scrollbar px-2">
                            {project.screenshots.map((ss, i) => {
                                const isDesktop = project.screenshotLayout === "desktop";
                                return (
                                    <motion.div
                                        key={ss.src}
                                        initial={{ opacity: 0, y: 18 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="shrink-0 snap-center cursor-pointer group"
                                        onClick={() => setCurrentImg(i)}
                                    >
                                        <div className={`relative ${isDesktop ? 'w-[280px] sm:w-[360px] md:w-[440px] aspect-[16/10] rounded-xl' : 'w-[180px] sm:w-[200px] md:w-[240px] aspect-[9/19.5] rounded-[1.5rem] md:rounded-[2rem]'} overflow-hidden border-2 border-border bg-card shadow-xl group-hover:border-primary/50 transition-all group-hover:scale-[1.03]`}>
                                            <Image src={ss.src} alt={ss.label} fill className="object-cover" />
                                        </div>
                                        <p className="text-xs text-muted-foreground text-center mt-2 group-hover:text-foreground/80 transition-colors">
                                            {ss.label}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <AnimatePresence>
                            {currentImg !== null && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed inset-0 z-[120] bg-background/95 flex items-center justify-center"
                                    onClick={() => setCurrentImg(null)}
                                >
                                    <button
                                        type="button"
                                        aria-label="Previous"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentImg((idx) => (idx === null ? idx : Math.max(0, idx - 1)));
                                        }}
                                        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-card/70 flex items-center justify-center text-foreground hover:bg-accent/70 transition-all z-10"
                                    >
                                        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                                    </button>
                                    <button
                                        type="button"
                                        aria-label="Next"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentImg((idx) =>
                                                idx === null ? idx : Math.min(project.screenshots.length - 1, idx + 1),
                                            );
                                        }}
                                        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-card/70 flex items-center justify-center text-foreground hover:bg-accent/70 transition-all z-10"
                                    >
                                        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                                    </button>

                                    <motion.div
                                        key={currentImg}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className={`relative ${project.screenshotLayout === "desktop" ? 'w-[90vw] max-w-[800px] md:max-w-[1000px] aspect-[16/10] rounded-xl' : 'w-[280px] sm:w-[320px] md:w-[380px] aspect-[9/19.5] rounded-[2rem] md:rounded-[2.5rem]'} overflow-hidden border-2 border-border shadow-2xl`}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Image
                                            src={project.screenshots[currentImg].src}
                                            alt={project.screenshots[currentImg].label}
                                            fill
                                            className="object-cover"
                                        />
                                    </motion.div>

                                    <p className="absolute bottom-6 md:bottom-12 text-muted-foreground text-sm">
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

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
    const gradient = projectAccentById[project.id] ?? "from-purple-500/15 to-blue-500/15";

    return (
        <div
            className="group relative w-full overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur text-left transition-colors hover:bg-card/80 cursor-pointer"
            onClick={onClick}
        >
            <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-20 transition-opacity duration-500 group-hover:opacity-35 ${gradient}`}
            />

            <div className="relative">
                <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <span className="inline-flex items-center rounded-full border border-border bg-background/50 px-2.5 py-1 text-[10px] font-mono text-foreground/70">
                                {project.category}
                            </span>
                            <h3 className="mt-2 text-lg md:text-xl font-bold tracking-tight text-foreground truncate">
                                {project.title}
                            </h3>
                        </div>
                        <ArrowUpRight className="mt-1 h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>

                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {project.description}
                    </p>

                    <div className="mt-4 flex items-center gap-3">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-border bg-background/40">
                            <Image src={project.image} alt={project.title} fill className="object-cover" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.slice(0, 3).map((t) => (
                                <span
                                    key={t}
                                    className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-foreground"
                                >
                                    {t}
                                </span>
                            ))}
                            {project.tech.length > 3 && (
                                <span className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground">
                                    +{project.tech.length - 3}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Project Links */}
                    {project.links.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2 pt-3 border-t border-border/50">
                            {project.links.map((link) => (
                                <a
                                    key={link.url}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 px-3 py-1.5 text-[11px] font-medium text-foreground/80 hover:text-foreground hover:border-primary/50 hover:bg-primary/10 transition-all"
                                >
                                    {link.label === "GitHub" && (
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                                        </svg>
                                    )}
                                    {link.label === "Live" && (
                                        <ArrowUpRight className="w-3.5 h-3.5" />
                                    )}
                                    {link.label === "Drive Link" && (
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                                            <path d="M7.71 3.5L1.15 15l4.58 7.5h13.54l4.58-7.5L17.29 3.5H7.71zm-.58 1h2.87l-6 10H1.73l5.4-10zm8.58 0h2.87l5.4 10h-2.27l-6-10zM9.13 4.5l6 10H9l-6-10h6.13zm6.74 0l6 10H15.6l-6-10h6.27zM2.29 15.5h19.42l-4 6.5H6.29l-4-6.5z"/>
                                        </svg>
                                    )}
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export function Projects() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <>
            <section className="relative bg-background py-12 md:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
                    <div className="mb-8 md:mb-12 text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-20%" }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="text-4xl sm:text-5xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 tracking-tighter"
                        >
                            Projects
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project, i) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 0.55, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
                )}
            </AnimatePresence>
        </>
    );
}
