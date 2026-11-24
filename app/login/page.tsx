'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { authenticate, type LoginState } from '@/lib/actions';

const initialState: LoginState = {
    message: null,
};

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(
        authenticate,
        initialState
    );

    return (
        <div className="max-w-md mx-auto px-4 py-12">
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
                    Sign In
                </h1>
                <p className="text-neutral-400 text-sm">
                    Sign in to manage projects in your portfolio.
                </p>
            </div>

            <form
                action={formAction}
                className="space-y-5 p-6 border border-neutral-800 rounded-lg bg-neutral-900"
            >
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-neutral-200 mb-1.5"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@example.com"
                        className="w-full px-3 py-2 rounded-lg border border-neutral-700 bg-neutral-950 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                    />
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-neutral-200 mb-1.5"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        minLength={6}
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        className="w-full px-3 py-2 rounded-lg border border-neutral-700 bg-neutral-950 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                    />
                </div>

                {state.message && (
                    <div
                        aria-live="polite"
                        className="p-3 rounded-lg border border-red-800 bg-red-950/60 text-xs text-red-300"
                    >
                        {state.message}
                    </div>
                )}

                <div className="flex items-center justify-between gap-3 pt-2">
                    <Link
                        href="/projects"
                        className="text-xs text-neutral-400 hover:text-indigo-300 transition"
                    >
                        ← Back to Projects
                    </Link>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
                    >
                        {isPending ? 'Signing in...' : 'Sign In'}
                    </button>
                </div>
            </form>
        </div>
    );
}