interface Project {
    id: number;
    title: string;
    description: string;
    type: 'opensource' | 'school';
    technologies: string[];
    link?: string;
}

async function getOpenSourceProjects(): Promise<Project[]> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
            ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
            : 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/projects?type=opensource`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch open source projects');
        return res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default async function OpenSourcePage() {
    const projects = await getOpenSourceProjects();

    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight mb-4">Open Source Projects</h1>
            <p className="text-neutral-400 text-sm mb-6">
                Explore public repositories and community-driven coding initiatives.
            </p>
            <div className="grid gap-4">
                {projects.map((project) => (
                    <div key={project.id} className="p-4 border border-neutral-800 rounded-lg bg-neutral-900">
                        <h2 className="text-xl font-semibold text-white">{project.title}</h2>
                        <p className="text-neutral-300 text-sm mt-1">{project.description}</p>
                        <div className="flex gap-2 mt-3">
                            {project.technologies.map((tech) => (
                                <span key={tech} className="px-2 py-1 text-xs bg-neutral-800 text-indigo-300 rounded">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}