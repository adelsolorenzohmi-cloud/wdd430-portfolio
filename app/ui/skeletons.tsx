export default function ProjectCardSkeleton() {
    return (
        <div className="animate-pulse grid gap-4">
            {[1, 2].map((i) => (
                <div key={i} className="p-4 border border-neutral-800 rounded-lg bg-neutral-900 space-y-3">
                    <div className="h-6 w-48 rounded bg-neutral-800" />
                    <div className="h-4 w-full rounded bg-neutral-800" />
                    <div className="flex gap-2">
                        <div className="h-5 w-16 rounded bg-neutral-800" />
                        <div className="h-5 w-20 rounded bg-neutral-800" />
                    </div>
                </div>
            ))}
        </div>
    );
}