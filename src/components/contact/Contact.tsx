"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Send, Loader2, CheckCircle2 } from "lucide-react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { submitContactForm } from "@/actions/contact";

export function Contact() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const formRef = useRef<HTMLFormElement>(null);

    // Shared Mouse Follow Effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth physics
    const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            const x = e.clientX - innerWidth / 2;
            const y = e.clientY - innerHeight / 2;

            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    async function handleSubmit(formData: FormData) {
        setStatus("submitting");
        const result = await submitContactForm(formData);

        if (result.success) {
            setStatus("success");
            formRef.current?.reset();
        } else {
            setStatus("error");
            setErrorMessage(result.error || "Something went wrong");
            setTimeout(() => setStatus("idle"), 3000);
        }
    }

    return (
        <div className="relative min-h-screen bg-background text-white py-16 md:py-24 px-4 sm:px-6 md:px-12 flex items-center justify-center overflow-hidden">
            {/* Gradient Blob Background */}
            <motion.div
                style={{ x: springX, y: springY }}
                className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full blur-[80px] md:blur-[100px] opacity-20 pointer-events-none mix-blend-screen z-0"
            />

            <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">

                {/* Left Column: Job Seeker Info */}
                <div className="space-y-8 md:space-y-12 flex flex-col justify-center">
                    <div>
                        <p className="text-purple-400 font-medium mb-3 md:mb-4 tracking-wider uppercase text-sm">Contact</p>
                        <h2 className="text-3xl sm:text-4xl md:text-7xl font-bold leading-tight mb-4 md:mb-6">
                            Ready to <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                                Start a Project?
                            </span>
                        </h2>
                        <p className="text-base md:text-xl text-white/60 max-w-md leading-relaxed">
                            Always interested in discussing new projects and opportunities.
                        </p>
                    </div>

                    <div className="space-y-4 md:space-y-6">
                        <div className="flex items-center gap-3 md:gap-4 p-4 md:p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                            <div className="w-11 h-11 md:w-14 md:h-14 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform shrink-0">
                                <Mail className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm md:text-lg font-medium tracking-wide truncate">gauravdawange07@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 md:gap-6">
                        <a href="https://linkedin.com/in/gaurav-dawange-b90176267" target="_blank" rel="noopener noreferrer" className="w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#0077b5] hover:border-[#0077b5] hover:scale-110 transition-all text-white group">
                            <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
                        </a>
                        <a href="https://github.com/GauravDawange" target="_blank" rel="noopener noreferrer" className="w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all text-white">
                            <Github className="w-5 h-5 md:w-6 md:h-6" />
                        </a>
                    </div>
                </div>

                {/* Right Column: Form / Success Message */}
                <div className="bg-neutral-900/50 backdrop-blur-xl p-5 sm:p-8 md:p-12 rounded-2xl md:rounded-[2.5rem] border border-white/10 relative overflow-hidden shadow-2xl min-h-[450px] md:min-h-[600px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {status === "success" ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="text-center space-y-6"
                            >
                                <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                                </div>
                                <h3 className="text-3xl font-bold text-white">Message Sent!</h3>
                                <p className="text-white/60 max-w-sm mx-auto">
                                    Thank you for reaching out. I've received your message and will update you shortly.
                                </p>
                                <Button
                                    onClick={() => setStatus("idle")}
                                    variant="outline"
                                    className="mt-8 rounded-full border-white/10 hover:bg-white/10"
                                >
                                    Send Another Message
                                </Button>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                ref={formRef}
                                action={handleSubmit}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                className="space-y-6 w-full relative z-10"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white/60 ml-1">Your Name</label>
                                        <input
                                            name="name"
                                            type="text"
                                            required
                                            placeholder="John Doe"
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-white/20"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white/60 ml-1">Your Email</label>
                                        <input
                                            name="email"
                                            type="email"
                                            required
                                            placeholder="john@example.com"
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-white/20"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/60 ml-1">Subject</label>
                                    <input
                                        name="subject"
                                        type="text"
                                        required
                                        placeholder="Subject"
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-white/20"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/60 ml-1">Message</label>
                                    <textarea
                                        name="message"
                                        rows={5}
                                        required
                                        placeholder="Tell me about..."
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none placeholder:text-white/20"
                                    />
                                </div>

                                {status === "error" && (
                                    <p className="text-red-400 text-sm text-center">{errorMessage}</p>
                                )}

                                <Button
                                    disabled={status === "submitting"}
                                    type="submit"
                                    className="w-full h-14 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-lg shadow-lg shadow-purple-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {status === "submitting" ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>Send Message <Send className="ml-2 w-5 h-5" /></>
                                    )}
                                </Button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
}
