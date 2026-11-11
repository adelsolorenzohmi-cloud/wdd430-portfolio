import { Suspense } from 'react';
import { getProjects } from '@/lib/projects-db';

async function SchoolProjectList() {
    const projects = await getProjects();
    // Filter for school projects if necessary, or display them
    const schoolProjects = projects.filter((p) => p.category?.toLowerCase() === 'school' || p.type?.toLowerCase() === 'school');

    return (
        <div className="grid gap-4">
            {schoolProjects.map((project) => (
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
    );
}

export default function SchoolProjectsPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight mb-4">School Projects</h1>
            <p className="text-neutral-400 text-sm mb-6">
                Explore academic coursework and software development assignments below.
            </p>

            <Suspense fallback={<div className="text-neutral-400 text-sm py-4">Loading school projects...</div>}>
                <SchoolProjectList />
            </Suspense>
        </div>
    );
}