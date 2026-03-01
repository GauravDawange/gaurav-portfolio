"use client";

import { useRef, useEffect } from "react";
import { useScroll, useTransform, motion, useSpring, useMotionValue } from "framer-motion";

import { Variants } from "framer-motion";

const letterVariants: Variants = {
    hidden: { opacity: 0, y: 100, rotateX: -90 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            delay: i * 0.05,
            duration: 0.8,
            type: "spring",
            bounce: 0.4
        }
    })
};

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // 3D Tilt & Mouse Follow
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics for the blob
    const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

    // Tilt values for the text
    const tiltX = useTransform(springY, [-500, 500], [15, -15]);
    const tiltY = useTransform(springX, [-500, 500], [-15, 15]);

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

    const word1 = "SOFTWARE";
    const word2 = "ENGINEER";

    return (
        <section ref={containerRef} className="relative h-[100dvh] w-full overflow-hidden flex items-center justify-center bg-background perspective-[1000px]">

            {/* Vivid Background Gradient Blob - Follows Mouse */}
            <motion.div
                style={{ x: springX, y: springY }}
                className="absolute z-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full blur-[80px] md:blur-[100px] opacity-30 mix-blend-screen pointer-events-none"
            />

            {/* Main Content with 3D Tilt */}
            <motion.div
                style={{
                    y,
                    opacity,
                    rotateX: tiltX,
                    rotateY: tiltY,
                    transformStyle: "preserve-3d"
                }}
                className="relative z-10 text-center flex flex-col items-center justify-center w-full px-4"
            >
                <div className="flex flex-col items-center leading-none">
                    {/* First Word */}
                    <div className="flex overflow-hidden">
                        {word1.split("").map((char, i) => (
                            <motion.span
                                key={i}
                                custom={i}
                                variants={letterVariants}
                                initial="hidden"
                                animate="visible"
                                className="text-[13vw] sm:text-[12vw] md:text-[11vw] font-black tracking-tighter text-white inline-block hover:text-purple-400 transition-colors duration-300"
                            >
                                {char}
                            </motion.span>
                        ))}
                    </div>

                    {/* Second Word */}
                    <div className="flex overflow-hidden">
                        {word2.split("").map((char, i) => (
                            <motion.span
                                key={i}
                                custom={i + word1.length} // Offset delay
                                variants={letterVariants}
                                initial="hidden"
                                animate="visible"
                                className="text-[13vw] sm:text-[12vw] md:text-[11vw] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 inline-block"
                            >
                                {char}
                            </motion.span>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="mt-8 md:mt-16 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 w-full max-w-2xl px-4 md:px-8"
                >
                    <div className="text-center sm:text-left">
                        <p className="text-xs md:text-sm text-white/40 uppercase tracking-widest mb-1">Profile</p>
                        <p className="text-base md:text-lg text-white font-medium">Gaurav Dawange</p>
                    </div>
                    <div className="text-center sm:text-right">
                        <p className="text-xs md:text-sm text-white/40 uppercase tracking-widest mb-1">Located</p>
                        <p className="text-base md:text-lg text-white font-medium">Pune, India</p>
                    </div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5, duration: 1 }}
                    className="absolute -bottom-16 md:bottom-[-80px] left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center p-1"
                    >
                        <motion.div className="w-1 h-2 bg-white/40 rounded-full" />
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}
