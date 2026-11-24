import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const pathname = nextUrl.pathname;

            const isProtected =
                pathname.startsWith('/dashboard') ||
                pathname === '/projects/create' ||
                pathname === '/projects/settings' ||
                /^\/projects\/[^/]+\/edit(?:\/|$)/.test(pathname);

            if (isProtected) {
                if (isLoggedIn) return true;
                return false;
            }

            if (isLoggedIn && pathname === '/login') {
                return Response.redirect(new URL('/projects', nextUrl));
            }

            return true;
        },
    },
    providers: [],
} satisfies NextAuthConfig;