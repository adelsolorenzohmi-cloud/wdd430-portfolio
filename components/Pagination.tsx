'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const createPageURL = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    const linkClass = 'px-3 py-1 rounded border border-neutral-700 text-neutral-300 hover:text-indigo-400 transition';
    const disabledClass = 'px-3 py-1 rounded border border-neutral-800 text-neutral-600 cursor-not-allowed';

    return (
        <div className="flex items-center justify-center gap-4 mt-8 text-sm">
            {currentPage > 1 ? (
                <Link href={createPageURL(currentPage - 1)} className={linkClass}>
                    ← Previous
                </Link>
            ) : (
                <span className={disabledClass}>← Previous</span>
            )}

            <span className="text-neutral-400">
                Page {currentPage} of {totalPages}
            </span>

            {currentPage < totalPages ? (
                <Link href={createPageURL(currentPage + 1)} className={linkClass}>
                    Next →
                </Link>
            ) : (
                <span className={disabledClass}>Next →</span>
            )}
        </div>
    );
}