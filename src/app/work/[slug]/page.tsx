import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { projectsBySlug } from "@/data/projects";
const getProject = (slug: string) => projectsBySlug[slug] ?? null;

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
            <Link href="/work" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 md:mb-8 transition-colors text-sm">
                <ArrowLeft className="mr-2 w-4 h-4" /> Back to Projects
            </Link>

            {/* Hero */}
            <div className="relative w-full aspect-[16/7] md:aspect-[21/9] rounded-2xl md:rounded-3xl overflow-hidden mb-8 md:mb-12">
                <Image src={project.image} alt={project.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8">
                    <span className="inline-block px-3 py-1 rounded-full bg-background/60 border border-border text-xs font-mono text-foreground/80 mb-2">
                        {project.category}
                    </span>
                    <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white tracking-tighter">{project.title}</h1>
                </div>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16">
                <div className="lg:col-span-2 space-y-6">
                    <div>
                        <h2 className="text-lg md:text-xl font-bold text-foreground mb-3">About the Project</h2>
                        <p className="text-sm md:text-lg text-muted-foreground leading-relaxed">{project.description}</p>
                    </div>

                    {project.features.length > 0 && (
                        <div>
                            <h2 className="text-lg md:text-xl font-bold text-foreground mb-3">Key Features</h2>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {project.features.map((f, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
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
                        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3">Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map(t => (
                                <span key={t} className="px-3 py-1.5 rounded-full bg-card/60 border border-border text-xs text-foreground/80">{t}</span>
                            ))}
                        </div>
                    </div>

                    {project.links.length > 0 && (
                        <div>
                            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3">Links</h3>
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
                    <h2 className="text-lg md:text-xl font-bold text-foreground mb-6">App Screenshots</h2>
                    <div className="flex gap-4 md:gap-6 overflow-x-auto pb-6 no-scrollbar snap-x snap-mandatory">
                        {project.screenshots.map((ss, i) => {
                            const isDesktop = project.screenshotLayout === "desktop";
                            return (
                                <div key={i} className="shrink-0 snap-center">
                                    <div className={`relative ${isDesktop ? 'w-[280px] sm:w-[360px] md:w-[440px] aspect-[16/10] rounded-xl' : 'w-[180px] sm:w-[200px] md:w-[240px] aspect-[9/19.5] rounded-[1.5rem] md:rounded-[2rem]'} overflow-hidden border-2 border-white/10 bg-neutral-900 shadow-xl hover:border-purple-500/50 transition-all hover:scale-[1.03]`}>
                                        <Image src={ss.src} alt={ss.label} fill className="object-cover" />
                                    </div>
                                    <p className="text-xs text-muted-foreground text-center mt-2">{ss.label}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </main>
    );
}
