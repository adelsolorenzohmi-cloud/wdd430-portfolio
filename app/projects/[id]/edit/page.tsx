import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getProjectById } from '@/lib/projects-db';
import EditProjectForm from '@/components/EditProjectForm';

async function EditProjectLoader({
    paramsPromise,
}: {
    paramsPromise: Promise<{ id: string }>;
}) {
    const resolvedParams = await paramsPromise;
    const id = Number(resolvedParams.id);

    if (!Number.isInteger(id) || id <= 0) {
        notFound();
    }

    const project = await getProjectById(id);

    if (!project) {
        notFound();
    }

    return <EditProjectForm project={project} />;
}

export default function EditProjectPage(props: {
    params: Promise<{ id: string }>;
}) {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
                    Edit Project
                </h1>
                <p className="text-neutral-400 text-sm">
                    Update the project details below and save your changes.
                </p>
            </div>

            <Suspense
                fallback={
                    <div className="p-6 border border-neutral-800 rounded-lg bg-neutral-900 text-neutral-400 text-sm">
                        Loading project details...
                    </div>
                }
            >
                <EditProjectLoader paramsPromise={props.params} />
            </Suspense>
        </div>
    );
}