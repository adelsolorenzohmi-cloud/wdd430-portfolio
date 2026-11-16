'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { Project } from '@/lib/projects-db';
import { updateProject, State } from '@/lib/actions';

const initialState: State = {
    message: null,
    errors: {},
};

export default function EditProjectForm({ project }: { project: Project }) {
    const updateProjectWithId = updateProject.bind(null, project.id);
    const [state, formAction, isPending] = useActionState(
        updateProjectWithId,
        initialState
    );
    const currentYear = new Date().getFullYear();

    return (
        <form
            action={formAction}
            className="space-y-5 p-6 border border-neutral-800 rounded-lg bg-neutral-900"
        >
            {/* Title */}
            <div>
                <label
                    htmlFor="title"
                    className="block text-sm font-medium text-neutral-200 mb-1.5"
                >
                    Project Title <span className="text-red-400">*</span>
                </label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    defaultValue={project.title}
                    aria-describedby="title-error"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-700 bg-neutral-950 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                />
                <div id="title-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.title?.map((error) => (
                        <p key={error} className="mt-1.5 text-xs text-red-400">
                            {error}
                        </p>
                    ))}
                </div>
            </div>

            {/* Description */}
            <div>
                <label
                    htmlFor="description"
                    className="block text-sm font-medium text-neutral-200 mb-1.5"
                >
                    Description <span className="text-red-400">*</span>
                </label>
                <textarea
                    id="description"
                    name="description"
                    rows={4}
                    required
                    defaultValue={project.description}
                    aria-describedby="description-error"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-700 bg-neutral-950 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                />
                <div id="description-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.description?.map((error) => (
                        <p key={error} className="mt-1.5 text-xs text-red-400">
                            {error}
                        </p>
                    ))}
                </div>
            </div>

            {/* Technologies */}
            <div>
                <label
                    htmlFor="technologies"
                    className="block text-sm font-medium text-neutral-200 mb-1.5"
                >
                    Technologies (comma-separated) <span className="text-red-400">*</span>
                </label>
                <input
                    id="technologies"
                    name="technologies"
                    type="text"
                    required
                    defaultValue={project.technologies?.join(', ') ?? ''}
                    aria-describedby="technologies-error"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-700 bg-neutral-950 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                />
                <div id="technologies-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.technologies?.map((error) => (
                        <p key={error} className="mt-1.5 text-xs text-red-400">
                            {error}
                        </p>
                    ))}
                </div>
            </div>

            {/* Year Completed */}
            <div>
                <label
                    htmlFor="yearCompleted"
                    className="block text-sm font-medium text-neutral-200 mb-1.5"
                >
                    Year Completed <span className="text-red-400">*</span>
                </label>
                <input
                    id="yearCompleted"
                    name="yearCompleted"
                    type="number"
                    min={2000}
                    max={currentYear}
                    required
                    defaultValue={project.year_completed ?? currentYear}
                    aria-describedby="yearCompleted-error"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-700 bg-neutral-950 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                />
                <div id="yearCompleted-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.yearCompleted?.map((error) => (
                        <p key={error} className="mt-1.5 text-xs text-red-400">
                            {error}
                        </p>
                    ))}
                </div>
            </div>

            {/* Category / Type */}
            <div>
                <label
                    htmlFor="type"
                    className="block text-sm font-medium text-neutral-200 mb-1.5"
                >
                    Category
                </label>
                <select
                    id="type"
                    name="type"
                    defaultValue={project.type}
                    aria-describedby="type-error"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-700 bg-neutral-950 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                >
                    <option value="school">School</option>
                    <option value="opensource">Open Source</option>
                </select>
                <div id="type-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.type?.map((error) => (
                        <p key={error} className="mt-1.5 text-xs text-red-400">
                            {error}
                        </p>
                    ))}
                </div>
            </div>

            {/* Repository / Live Link (Optional) */}
            <div>
                <label
                    htmlFor="link"
                    className="block text-sm font-medium text-neutral-200 mb-1.5"
                >
                    Project URL <span className="text-neutral-500">(optional)</span>
                </label>
                <input
                    id="link"
                    name="link"
                    type="url"
                    defaultValue={project.link ?? ''}
                    placeholder="https://github.com/adelsolorenzohmi-cloud/..."
                    aria-describedby="link-error"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-700 bg-neutral-950 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                />
                <div id="link-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.link?.map((error) => (
                        <p key={error} className="mt-1.5 text-xs text-red-400">
                            {error}
                        </p>
                    ))}
                </div>
            </div>

            {/* Form-level error banner */}
            {state.message && (
                <div
                    aria-live="polite"
                    className="p-3 rounded-lg border border-red-800 bg-red-950/60 text-xs text-red-300"
                >
                    {state.message}
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
                <Link
                    href="/projects"
                    className="px-4 py-2 rounded-lg border border-neutral-700 text-neutral-300 text-sm font-medium hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                >
                    Cancel
                </Link>
                <button
                    type="submit"
                    disabled={isPending}
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
                >
                    {isPending ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </form>
    );
}