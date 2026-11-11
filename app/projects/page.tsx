import { fetchFilteredProjects, fetchProjectsPages } from '@/lib/projects-db';
import { ProjectSearch } from '@/components/ProjectSearch';
import Pagination from '@/components/Pagination';
import { Suspense } from 'react';

async function ProjectList({
    searchParamsPromise,
}: {
    searchParamsPromise: Promise<{ query?: string; page?: string }>;
}) {
    const resolvedParams = await searchParamsPromise;
    const query = resolvedParams?.query || '';
    const currentPage = Number(resolvedParams?.page) || 1;

    const projects = await fetchFilteredProjects(query, currentPage);

    if (projects.length === 0) {
        return <p className="text-neutral-400 text-center py-8">No projects found.</p>;
    }

    return (
        <div className="grid gap-4">
            {projects.map((project) => (
                <div key={project.id} className="p-4 border border-neutral-800 rounded-lg bg-neutral-900">
                    <h2 className="text-xl font-semibold text-white">{project.title}</h2>
                    <p className="text-neutral-300 text-sm mt-1">{project.description}</p>
                    <div className="flex gap-2 mt-3 flex-wrap">
                        {project.technologies?.map((tech) => (
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

async function PaginationWrapper({
    searchParamsPromise,
}: {
    searchParamsPromise: Promise<{ query?: string; page?: string }>;
}) {
    const resolvedParams = await searchParamsPromise;
    const query = resolvedParams?.query || '';
    const totalPages = await fetchProjectsPages(query);

    return <Pagination totalPages={totalPages} />;
}

export default function ProjectsPage(props: {
    searchParams: Promise<{ query?: string; page?: string }>;
}) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold tracking-tight mb-4 text-white">Projects Overview</h1>
            <p className="text-neutral-400 text-sm mb-6">
                Explore all open source contributions and academic coursework below.
            </p>

            <Suspense fallback={<div className="text-neutral-400 text-sm mb-6">Loading search...</div>}>
                <ProjectSearch />
            </Suspense>

            <Suspense fallback={<div className="text-neutral-400 text-sm py-4">Loading projects...</div>}>
                <ProjectList searchParamsPromise={props.searchParams} />
            </Suspense>

            <Suspense fallback={null}>
                <PaginationWrapper searchParamsPromise={props.searchParams} />
            </Suspense>
        </div>
    );
}