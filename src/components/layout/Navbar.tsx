"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
    { name: "Home", path: "#home" },
    { name: "About", path: "#about" },
    { name: "Work", path: "#work" },
    { name: "Contact", path: "#contact" },
];

export function Navbar() {
    const [activeSection, setActiveSection] = useState("#home");
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(item => item.path.substring(1));
            let current = "";
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 200 && rect.bottom >= 200) {
                        current = section;
                    }
                }
            }
            if (current) setActiveSection("#" + current);
            if (window.scrollY < 100) setActiveSection("#home");
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setMobileOpen(false);
        const element = document.getElementById(href.substring(1));
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:py-6 md:px-12 pointer-events-none"
            >
                <Link
                    href="#home"
                    onClick={(e) => scrollToSection(e, "#home")}
                    className="text-lg md:text-xl font-bold tracking-tighter pointer-events-auto mix-blend-difference text-white"
                >
                    PORTFOLIO
                </Link>

                {/* Desktop nav */}
                <div className="hidden md:flex gap-6 pointer-events-auto">
                    {navItems.map((item) => {
                        const isActive = activeSection === item.path;
                        return (
                            <a
                                key={item.path}
                                href={item.path}
                                onClick={(e) => scrollToSection(e, item.path)}
                                className={cn(
                                    "relative text-sm font-medium transition-colors hover:text-white/80 mix-blend-difference text-white cursor-pointer",
                                    isActive ? "text-white" : "text-white/60"
                                )}
                            >
                                {item.name}
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-indicator"
                                        className="absolute -bottom-1 left-0 right-0 h-px bg-white"
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </a>
                        );
                    })}
                </div>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden pointer-events-auto mix-blend-difference text-white z-[60] relative"
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </motion.nav>

            {/* Mobile fullscreen menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[55] bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
                    >
                        {navItems.map((item, i) => {
                            const isActive = activeSection === item.path;
                            return (
                                <motion.a
                                    key={item.path}
                                    href={item.path}
                                    onClick={(e) => scrollToSection(e, item.path)}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ delay: i * 0.08, duration: 0.4 }}
                                    className={cn(
                                        "text-3xl font-bold tracking-tight transition-colors cursor-pointer",
                                        isActive ? "text-white" : "text-white/40 hover:text-white/70"
                                    )}
                                >
                                    {item.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="mobile-nav-indicator"
                                            className="h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 mt-1 rounded-full"
                                        />
                                    )}
                                </motion.a>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
