import Link from 'next/link';

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col flex-1 p-6 max-w-4xl mx-auto w-full">
            <div className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight text-white mb-4">Projects Dashboard</h2>
                <nav className="flex gap-4 border-b border-neutral-800 pb-3 text-sm">
                    <Link href="/projects" className="text-neutral-300 hover:text-indigo-400 transition">
                        Overview
                    </Link>
                    <Link href="/projects/opensource" className="text-neutral-300 hover:text-indigo-400 transition">
                        Open Source
                    </Link>
                    <Link href="/projects/school" className="text-neutral-300 hover:text-indigo-400 transition">
                        School
                    </Link>
                    <Link href="/projects/settings" className="text-neutral-300 hover:text-indigo-400 transition">
                        Settings
                    </Link>
                </nav>
            </div>
            <div className="flex-1">{children}</div>
        </div>
    );
}