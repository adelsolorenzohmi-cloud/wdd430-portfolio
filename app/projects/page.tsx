'use client';

import { useState, useEffect } from 'react';

interface Project {
    id: number;
    title: string;
    description: string;
    type: 'opensource' | 'school';
    technologies: string[];
    link?: string;
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/projects')
            .then((res) => res.json())
            .then((data) => {
                setProjects(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight mb-4">Projects Overview</h1>
            <p className="text-neutral-400 text-sm mb-6">
                Explore all open source contributions and academic coursework below.
            </p>
            {loading ? (
                <p className="text-neutral-400">Loading projects...</p>
            ) : (
                <div className="grid gap-4">
                    {projects.map((project) => (
                        <div key={project.id} className="p-4 border border-neutral-800 rounded-lg bg-neutral-900">
                            <h2 className="text-xl font-semibold text-white">{project.title}</h2>
                            <p className="text-neutral-300 text-sm mt-1">{project.description}</p>
                            <div className="flex gap-2 mt-3 flex-wrap">
                                {project.technologies.map((tech) => (
                                    <span key={tech} className="px-2 py-1 text-xs bg-neutral-800 text-indigo-300 rounded">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}