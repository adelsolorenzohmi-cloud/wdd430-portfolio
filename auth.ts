import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { authConfig } from './auth.config';
import { getUserByEmail } from '@/lib/projects-db';

const CredentialsSchema = z.object({
    email: z.string().trim().email(),
    password: z.string().min(6),
});

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsed = CredentialsSchema.safeParse(credentials);
                if (!parsed.success) {
                    return null;
                }

                const email = parsed.data.email.toLowerCase();
                const password = parsed.data.password;

                const user = await getUserByEmail(email);
                if (!user || !user.passwordHash) {
                    return null;
                }

                const passwordsMatch = await bcrypt.compare(password, user.passwordHash);
                if (!passwordsMatch) {
                    return null;
                }

                return {
                    id: String(user.id),
                    name: user.name,
                    email: user.email,
                };
            },
        }),
    ],
});