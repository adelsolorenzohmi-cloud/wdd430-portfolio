'use client';

import { useFormStatus } from 'react-dom';
import { deleteProject } from '@/lib/actions';

function SubmitDeleteButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            onClick={(e) => {
                if (!window.confirm('Are you sure you want to delete this project?')) {
                    e.preventDefault();
                }
            }}
            className="px-3 py-1.5 rounded border border-red-800/70 bg-red-950/40 text-red-300 text-xs font-medium hover:bg-red-900/60 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
        >
            {pending ? 'Deleting...' : 'Delete'}
        </button>
    );
}

export default function DeleteProjectButton({ id }: { id: number }) {
    const deleteProjectWithId = deleteProject.bind(null, id);

    return (
        <form action={deleteProjectWithId}>
            <SubmitDeleteButton />
        </form>
    );
}