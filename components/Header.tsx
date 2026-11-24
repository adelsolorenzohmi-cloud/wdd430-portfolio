import Link from 'next/link';
import { connection } from 'next/server';
import { auth, signOut } from '@/auth';

export default async function Header() {
    await connection();
    const session = await auth();

    return (
        <header className="border-b border-gray-800 bg-gray-950 text-white">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
                <Link href="/" className="text-lg font-semibold">
                    Portfolio
                </Link>

                <nav className="flex items-center gap-6 text-sm">
                    <Link href="/projects" className="hover:text-gray-300">
                        Projects
                    </Link>

                    {session?.user ? (
                        <>
                            <Link href="/projects/create" className="hover:text-gray-300">
                                New Project
                            </Link>
                            <span className="text-gray-400">{session.user.email}</span>
                            <form
                                action={async () => {
                                    'use server';
                                    await signOut({ redirectTo: '/' });
                                }}
                            >
                                <button
                                    type="submit"
                                    className="rounded bg-gray-800 px-3 py-1.5 text-sm hover:bg-gray-700"
                                >
                                    Sign Out
                                </button>
                            </form>
                        </>
                    ) : (
                        <Link
                            href="/api/auth/signin"
                            className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium hover:bg-blue-500"
                        >
                            Sign In
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
}