"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

import { projects } from "@/data/projects";

const sizeByProjectId: Record<string, "small" | "medium" | "large"> = {
    shopease: "large",
    "employee-tracking": "medium",
    "drone-survey": "medium",
    "market-research-agent": "small",
    bloodlink: "small",
};

export function BentoGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 md:p-8 max-w-7xl mx-auto">
            {projects.map((project, index) => {
                const size = sizeByProjectId[project.id] ?? "small";

                return (
                <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={cn(
                        "relative group overflow-hidden rounded-3xl border border-border bg-card aspect-square",
                        size === "large" && "md:col-span-2 md:row-span-2",
                        size === "medium" && "md:col-span-1",
                        size === "small" && "md:col-span-1"
                    )}
                >
                    <Link href={`/work/${project.slug}`} className="absolute inset-0">
                        <span className="sr-only">Open {project.title}</span>
                    </Link>

                    <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                        <div className="rounded-2xl border border-white/10 bg-black/25 backdrop-blur px-4 py-3">
                            <p className="text-[10px] font-mono text-white/75">{project.category}</p>
                            <h3 className="mt-1 text-xl md:text-2xl font-bold text-white tracking-tight">
                                {project.title}
                            </h3>
                        </div>
                    </div>
                </motion.div>
                );
            })}
        </div>
    );
}
