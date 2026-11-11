import { Suspense } from 'react';
import SchoolProjectList from '@/app/ui/school-project-list';
import ProjectCardSkeleton from '@/app/ui/skeletons';

export default function SchoolProjectsPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight mb-4">School Projects</h1>
            <p className="text-neutral-400 text-sm mb-6">
                Explore academic coursework and software development assignments below.
            </p>

            <Suspense fallback={<ProjectCardSkeleton />}>
                <SchoolProjectList />
            </Suspense>
        </div>
    );
}