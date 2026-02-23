"use client";

import { portfolioData } from "@/data/portfolio";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, ArrowUpRight, Printer } from "lucide-react";
export default function PortfolioPage() {
    return (
        <div className="container mx-auto p-6 md:p-12 lg:p-16 max-w-4xl space-y-24 animate-in fade-in duration-700 print:p-0 print:py-8 print:space-y-12 max-w-[850px]">
            {/* Header Section */}
            <section className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">{portfolioData.personal.name}</h1>
                        <p className="text-xl md:text-2xl text-muted-foreground font-light">{portfolioData.personal.role}</p>
                    </div>
                    <Button variant="outline" onClick={() => window.print()} className="print:hidden w-full sm:w-auto shrink-0">
                        <Printer className="mr-2 h-4 w-4" />
                        Save as PDF
                    </Button>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 text-sm font-mono text-muted-foreground">
                    <span>{portfolioData.personal.email}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{portfolioData.personal.location}</span>
                </div>
                <p className="text-base md:text-lg leading-relaxed max-w-2xl pt-4">
                    {portfolioData.personal.about}
                </p>
            </section>

            {/* Experience Section */}
            <section className="space-y-12">
                <div className="flex items-center gap-4">
                    <h2 className="text-3xl font-bold tracking-tight">Experience</h2>
                    <Separator className="flex-1" />
                </div>
                <div className="space-y-12">
                    {portfolioData.experience.map((exp) => (
                        <div key={exp.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 group">
                            <div className="md:col-span-1 text-sm font-mono text-muted-foreground pt-1">
                                {exp.period}
                            </div>
                            <div className="md:col-span-3 space-y-4">
                                <div>
                                    <h3 className="text-xl font-semibold">{exp.role}</h3>
                                    <p className="text-primary font-medium">{exp.company}</p>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-muted-foreground leading-relaxed">
                                        {exp.description}
                                    </p>
                                    {'details' in exp && exp.details && (
                                        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
                                            {exp.details.map((detail, idx) => (
                                                <li key={idx} className="leading-relaxed">{detail}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {exp.technologies.map(tech => (
                                        <Badge key={tech} variant="secondary" className="px-2 py-0.5 rounded-sm">
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Education Section */}
            <section className="space-y-12">
                <div className="flex items-center gap-4">
                    <h2 className="text-3xl font-bold tracking-tight">Education</h2>
                    <Separator className="flex-1" />
                </div>
                <div className="space-y-8">
                    {portfolioData.education.map((edu) => (
                        <div key={edu.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
                            <div className="md:col-span-1 text-sm font-mono text-muted-foreground pt-1">
                                {edu.period}
                            </div>
                            <div className="md:col-span-3">
                                <h3 className="text-xl font-semibold">{edu.degree}</h3>
                                <p className="text-muted-foreground">{edu.institution}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Activities Section */}
            <section className="space-y-12">
                <div className="flex items-center gap-4">
                    <h2 className="text-3xl font-bold tracking-tight">Activities</h2>
                    <Separator className="flex-1" />
                </div>
                <div className="space-y-8">
                    {portfolioData.activities.map((activity) => (
                        <div key={activity.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
                            <div className="md:col-span-1 text-sm font-mono text-muted-foreground pt-1">
                                {activity.period}
                            </div>
                            <div className="md:col-span-3">
                                <h3 className="text-xl font-semibold">{activity.title}</h3>
                                <p className="text-muted-foreground">{activity.description}</p>
                                {activity.data && (
                                    <div className="mt-4">
                                        <a href={activity.data} target="_blank" rel="noopener noreferrer" className="print:hidden">
                                            <Button variant="outline" size="sm">
                                                View <ArrowUpRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </a>
                                        <a href={activity.data} target="_blank" rel="noopener noreferrer" className="hidden print:block text-sm text-primary hover:underline mt-1 break-all">
                                            {activity.data}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Skills Section */}
            <section className="space-y-12 pb-24">
                <div className="flex items-center gap-4">
                    <h2 className="text-3xl font-bold tracking-tight">Technical Skills</h2>
                    <Separator className="flex-1" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <h4 className="text-lg font-medium text-foreground/80">Frontend</h4>
                        <div className="flex flex-col gap-2">
                            {portfolioData.skills.frontend.map(skill => (
                                <span key={skill} className="text-muted-foreground">{skill}</span>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-lg font-medium text-foreground/80">Backend</h4>
                        <div className="flex flex-col gap-2">
                            {portfolioData.skills.backend.map(skill => (
                                <span key={skill} className="text-muted-foreground">{skill}</span>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-lg font-medium text-foreground/80">Tools & Platforms</h4>
                        <div className="flex flex-col gap-2">
                            {portfolioData.skills.tools.map(skill => (
                                <span key={skill} className="text-muted-foreground">{skill}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
