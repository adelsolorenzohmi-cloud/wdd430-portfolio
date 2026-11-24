import Link from 'next/link';
import { getProjects } from '@/lib/projects-db';
import DeleteProjectButton from '@/components/DeleteProjectButton';
import { auth } from '@/auth';

export default async function SchoolProjectList() {
    const [projects, session] = await Promise.all([
        getProjects('school'),
        auth(),
    ]);
    const isAuthenticated = !!session?.user;

    if (projects.length === 0) {
        return (
            <p className="text-neutral-400 text-center py-8">
                No school projects found.
            </p>
        );
    }

    return (
        <div className="grid gap-4">
            {projects.map((project) => (
                <div
                    key={project.id}
                    className="p-4 border border-neutral-800 rounded-lg bg-neutral-900 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"
                >
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold text-white">{project.title}</h2>
                        <p className="text-neutral-300 text-sm mt-1">{project.description}</p>
                        <div className="flex gap-2 mt-3 flex-wrap">
                            {project.technologies?.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-2 py-1 text-xs bg-neutral-800 text-indigo-300 rounded"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {isAuthenticated && (
                        <div className="flex items-center gap-2 shrink-0">
                            <Link
                                href={`/projects/${project.id}/edit`}
                                className="px-3 py-1.5 rounded border border-neutral-700 text-neutral-200 text-xs font-medium hover:border-indigo-400 hover:text-indigo-300 transition"
                            >
                                Edit
                            </Link>
                            <DeleteProjectButton id={project.id} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}