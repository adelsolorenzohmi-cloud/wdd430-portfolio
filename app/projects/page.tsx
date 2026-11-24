import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchFilteredProjects, fetchProjectsPages } from '@/lib/projects-db';
import { ProjectSearch } from '@/components/ProjectSearch';
import Pagination from '@/components/Pagination';
import DeleteProjectButton from '@/components/DeleteProjectButton';
import { auth } from '@/auth';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Projects Overview',
    description: 'Explore all open source contributions and academic coursework in the portfolio.',
};

async function NewProjectButton() {
    const session = await auth();
    if (!session?.user) {
        return null;
    }

    return (
        <Link
            href="/projects/create"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition shrink-0"
        >
            + New Project
        </Link>
    );
}

async function ProjectList({
    searchParamsPromise,
}: {
    searchParamsPromise: Promise<{ query?: string; page?: string }>;
}) {
    const [resolvedParams, session] = await Promise.all([
        searchParamsPromise,
        auth(),
    ]);
    const isAuthenticated = !!session?.user;
    const query = resolvedParams?.query || '';
    const currentPage = Number(resolvedParams?.page) || 1;

    const projects = await fetchFilteredProjects(query, currentPage);

    if (projects.length === 0) {
        return <p className="text-neutral-400 text-center py-8">No projects found.</p>;
    }

    return (
        <div className="grid gap-4">
            {projects.map((project) => (
                <div
                    key={project.id}
                    className="p-4 border border-neutral-800 rounded-lg bg-neutral-900 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"
                >
                    <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h2 className="text-xl font-semibold text-white">{project.title}</h2>
                            <span className="px-2 py-0.5 text-xs rounded bg-neutral-800 text-neutral-300 capitalize">
                                {project.type}
                            </span>
                        </div>
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
                        {project.link && (
                            <p className="mt-3">
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-indigo-400 hover:underline"
                                >
                                    View Repository / Live Demo →
                                </a>
                            </p>
                        )}
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">
                        Projects Overview
                    </h1>
                    <p className="text-neutral-400 text-sm">
                        Explore all open source contributions and academic coursework below.
                    </p>
                </div>

                <Suspense fallback={null}>
                    <NewProjectButton />
                </Suspense>
            </div>

            <Suspense
                fallback={<div className="text-neutral-400 text-sm mb-6">Loading search...</div>}
            >
                <ProjectSearch />
            </Suspense>

            <Suspense
                fallback={<div className="text-neutral-400 text-sm py-4">Loading projects...</div>}
            >
                <ProjectList searchParamsPromise={props.searchParams} />
            </Suspense>

            <Suspense fallback={null}>
                <PaginationWrapper searchParamsPromise={props.searchParams} />
            </Suspense>
        </div>
    );
}