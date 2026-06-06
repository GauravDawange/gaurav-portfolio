"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

function TiltCard({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion();

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 120, damping: 22 });
    const mouseY = useSpring(y, { stiffness: 120, damping: 22 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["8deg", "-8deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-8deg", "8deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (reduceMotion) return;
        if (!ref.current) return;
        const canHover = window.matchMedia?.("(pointer: fine)")?.matches;
        if (!canHover) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;

        const xPct = mouseXFromCenter / width;
        const yPct = mouseYFromCenter / height;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        if (reduceMotion) return;
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden border border-border bg-card shadow-2xl transition-all duration-200 ease-out"
        >
            <div
                style={{ transform: "translateZ(36px)" }}
                className="absolute inset-4 rounded-2xl border border-border z-10 pointer-events-none"
            />
            {children}
        </motion.div>
    );
}

export function AboutSection() {
    const reduceMotion = useReducedMotion();

    // Shared Mouse Follow Effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 70, damping: 24 });
    const springY = useSpring(mouseY, { stiffness: 70, damping: 24 });

    useEffect(() => {
        if (reduceMotion) return;
        const canHover = window.matchMedia?.("(pointer: fine)")?.matches;
        if (!canHover) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX - innerWidth / 2) / 12;
            const y = (e.clientY - innerHeight / 2) / 12;

            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY, reduceMotion]);

    return (
        <div className="relative isolate min-h-screen flex items-center justify-center bg-background py-16 md:py-20 lg:py-0 overflow-hidden">

            {/* Vivid Background Gradient Blob */}
            <motion.div
                style={{ x: springX, y: springY }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full blur-[80px] md:blur-[100px] opacity-15 mix-blend-multiply dark:opacity-20 dark:mix-blend-screen pointer-events-none z-0"
            />

            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 max-w-7xl mx-auto z-10 relative px-4 sm:px-6">

                {/* Left Column: sticky profile */}
                <div className="relative flex items-center justify-center lg:h-[80vh] self-center">
                    <TiltCard>
                        <Image
                            src="/images/profile.jpg"
                            alt="Gaurav Dawange"
                            fill
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-500 ease-in-out scale-100 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />

                        <div className="absolute bottom-8 left-8 right-8 transform translate-z-20">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 1.2 }}
                                className="space-y-1"
                            >
                                <p className="text-purple-300 dark:text-purple-400 font-medium tracking-wide">Hello, I&apos;m</p>
                                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">Gaurav Dawange</h1>
                                <p className="text-white/70 text-sm mt-2">Software Engineer • Pune, India</p>
                            </motion.div>
                        </div>
                    </TiltCard>
                </div>

                {/* Right Column: Content - Compacted */}
                <div className="flex flex-col justify-center space-y-8 py-12 lg:py-0">

                    {/* About Me & Skills Group */}
                    <div className="space-y-6">
                        <motion.section
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-3">
                                <span className="w-6 h-[2px] bg-primary inline-block" />
                                About Me
                            </h2>
                            <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                                Software Engineer based in Pune, specializing in Flutter development with experience in modern web technologies. Passionate about building high-performance, scalable cross-platform applications, I thrive on solving complex problems and delivering high-quality digital solutions.
                            </p>
                        </motion.section>

                        {/* Technologies */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3">Technologies</h2>
                            <div className="flex flex-wrap gap-1.5">
                                {[
                                    "Flutter", "Dart", "Provider", "GetX", "Bloc", "Firebase",
                                    "Clean Architecture", "MVVM", "REST APIs",
                                    "React", "Next.js", "Java", "Spring Boot", "Python", "ASP.NET Core",
                                    "AWS", "Docker"
                                ].map((skill) => (
                                    <motion.div
                                        key={skill}
                                        whileHover={{ y: -5, scale: 1.05 }}
                                        className="px-3 py-1 rounded-full bg-card/60 border border-border text-foreground/80 hover:text-foreground hover:border-primary/40 hover:bg-accent/40 transition-all cursor-default text-xs font-medium backdrop-blur-sm"
                                    >
                                        {skill}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Tools & Platforms */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3">Tools & Platforms</h2>
                            <div className="flex flex-wrap gap-1.5">
                                {[
                                    "Codemagic", "Bitbucket", "Git", "Figma", "Jira", "VS Code",
                                    "App Store", "Play Store"
                                ].map((tool) => (
                                    <motion.div
                                        key={tool}
                                        whileHover={{ y: -5, scale: 1.05 }}
                                        className="px-3 py-1 rounded-full bg-card/60 border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-accent/40 transition-all cursor-default text-xs font-medium backdrop-blur-sm"
                                    >
                                        {tool}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Education */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h2 className="text-lg font-bold text-foreground mb-3">Education</h2>
                            <div className="space-y-4 relative border-l border-border pl-4 ml-1.5">
                                <div className="relative">
                                    <span className="absolute -left-[23px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background" />
                                    <span className="text-xs text-primary font-mono">2023 - 2025</span>
                                    <h3 className="text-sm text-foreground font-medium mt-0.5">MCA</h3>
                                    <p className="text-muted-foreground text-xs">Pimpri Chinchwad University</p>
                                    <p className="text-[10px] text-muted-foreground/70 mt-0.5">Completed</p>
                                </div>
                                <div className="relative">
                                    <span className="absolute -left-[23px] top-1.5 w-2.5 h-2.5 rounded-full bg-muted-foreground/30 ring-4 ring-background" />
                                    <span className="text-xs text-muted-foreground font-mono">2021 - 2023</span>
                                    <h3 className="text-sm text-foreground font-medium mt-0.5">Bachelor&apos;s in CS</h3>
                                    <p className="text-muted-foreground text-xs">Pune University</p>
                                    <p className="text-[10px] text-muted-foreground/70 mt-0.5">Completed</p>
                                </div>
                            </div>
                        </motion.section>

                        {/* Experience */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <h2 className="text-lg font-bold text-foreground mb-3">Experience</h2>
                            <div className="space-y-3">
                                {[
                                    { year: "January 2025 – Present", role: "Software Engineer", company: "Alhat Holdings" },
                                    { year: "April 2024 – July 2024", role: "Software Developer Intern", company: "HashedBit Innovations" },
                                ].map((job, i) => (
                                    <div key={i} className="group flex flex-col items-start border-b border-border/60 pb-2 last:border-0 hover:bg-accent/40 p-2 -mx-2 rounded-lg transition-colors cursor-default">
                                        <h3 className="text-foreground font-medium text-xs group-hover:text-primary transition-colors">{job.role}</h3>
                                        <p className="text-muted-foreground text-[10px] mt-0.5">{job.company}</p>
                                        <span className="text-[10px] text-primary font-mono bg-primary/10 px-1.5 py-0.5 rounded mt-1">{job.year}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.section>
                    </div>
                </div>
            </div>
        </div>
    );
}
