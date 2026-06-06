"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const reduceMotion = useReducedMotion();

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 60, damping: 24 });
    const springY = useSpring(mouseY, { stiffness: 60, damping: 24 });

    useEffect(() => {
        if (typeof window === "undefined") return;
        if (reduceMotion) return;
        const canHover = window.matchMedia?.("(pointer: fine)")?.matches;
        if (!canHover) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            mouseX.set((e.clientX - innerWidth / 2) / 12);
            mouseY.set((e.clientY - innerHeight / 2) / 12);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY, reduceMotion]);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            ref={sectionRef}
            className="relative isolate flex min-h-[100dvh] items-center overflow-hidden bg-background pt-20"
        >
            {/* Gradient blob */}
            <motion.div
                style={{ x: springX, y: springY }}
                className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-20 blur-[90px] mix-blend-multiply dark:opacity-30 dark:mix-blend-screen"
            />

            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-12">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14 items-center">
                    {/* Left */}
                    <div className="space-y-6">
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-sm font-medium tracking-wide text-muted-foreground"
                        >
                            Flutter Developer • Pune, India
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.05 }}
                            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground"
                        >
                            Hi, I&apos;m{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
                                Gaurav Dawange
                            </span>
                            .
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground"
                        >
                            I build reliable, user-focused mobile and web applications using Flutter. Clean architecture, optimal performance, and seamless user experiences are my defaults.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.15 }}
                            className="flex flex-col sm:flex-row gap-3"
                        >
                            <Button onClick={() => scrollTo("work")} className="rounded-full">
                                View Work <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button onClick={() => scrollTo("contact")} variant="outline" className="rounded-full">
                                Contact <ArrowDown className="ml-2 h-4 w-4" />
                            </Button>
                        </motion.div>
                    </div>

                    {/* Right */}
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="rounded-3xl border border-border bg-card/60 backdrop-blur p-6 sm:p-8"
                    >
                        <div className="space-y-6">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Focus</p>
                                <p className="mt-2 text-lg font-semibold text-foreground">Flutter Apps • State Management • Dart</p>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Mobile-first Flutter development, clean UI flows, and responsive cross-platform layouts.
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Core Stack</p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {["Flutter", "Dart", "Provider", "GetX", "Bloc", "Firebase", "Clean Architecture", "MVVM", "REST APIs", "ASP.NET Core", "Docker"].map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-foreground"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
