"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const navItems = [
    { name: "Home", path: "#home" },
    { name: "About", path: "#about" },
    { name: "Work", path: "#work" },
    { name: "Contact", path: "#contact" },
];

export function Navbar() {
    const [activeSection, setActiveSection] = useState("#home");
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

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

            // Update scrolled state
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        // Initialize scrolled state on load
        handleScroll();

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        const originalHeight = document.body.style.height;
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
            document.body.style.height = "100vh";
        } else {
            document.body.style.overflow = "";
            document.body.style.height = "";
        }
        return () => {
            document.body.style.overflow = originalOverflow;
            document.body.style.height = originalHeight;
        };
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
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300",
                    scrolled
                        ? "border-border bg-background shadow-sm"
                        : "border-transparent bg-transparent"
                )}
            >
                <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 md:px-12">
                    <Link
                        href="#home"
                        onClick={(e) => scrollToSection(e, "#home")}
                        className="text-base md:text-lg font-semibold tracking-tight text-foreground hover:text-foreground/80 transition-colors"
                    >
                        Gaurav
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            {navItems.map((item) => {
                                const isActive = activeSection === item.path;
                                return (
                                    <a
                                        key={item.path}
                                        href={item.path}
                                        onClick={(e) => scrollToSection(e, item.path)}
                                        className={cn(
                                            "relative rounded-full px-3 py-2 text-sm font-medium transition-colors cursor-pointer",
                                            isActive
                                                ? "text-foreground"
                                                : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        {item.name}
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-indicator"
                                                className="absolute inset-x-3 -bottom-0.5 h-px bg-primary"
                                                transition={{ duration: 0.3 }}
                                            />
                                        )}
                                    </a>
                                );
                            })}
                        </div>
                        <ThemeToggle />
                    </div>

                    {/* Mobile actions */}
                    <div className="md:hidden flex items-center gap-1">
                        <ThemeToggle />
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background/50 text-foreground"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile fullscreen menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[55] bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6 md:hidden"
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
                                        isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {item.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="mobile-nav-indicator"
                                            className="h-[2px] bg-primary mt-1 rounded-full"
                                        />
                                    )}
                                </motion.a>
                            );
                        })}

                        <div className="pt-6">
                            <ThemeToggle />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
