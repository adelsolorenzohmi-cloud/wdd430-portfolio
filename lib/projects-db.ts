import { sql } from '@vercel/postgres';

export interface Project {
    id: number;
    title: string;
    description: string;
    type: 'opensource' | 'school';
    technologies: string[];
    link?: string | null;
    year_completed?: number | null;
}

export interface User {
    id: number;
    name: string;
    email: string;
    passwordHash: string;
}

const ITEMS_PER_PAGE = 6;

function sanitize(query: string) {
    return query.trim().slice(0, 100).replace(/[%_\\]/g, '\\$&');
}

async function ensureUsersTable() {
    await sql`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL
        )
    `;
}

export async function getUserByEmail(email: string): Promise<User | null> {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
        return null;
    }

    await ensureUsersTable();

    const { rows } = await sql<{
        id: number;
        name: string;
        email: string;
        password_hash: string;
    }>`
        SELECT id, name, email, password_hash
        FROM users
        WHERE LOWER(email) = ${normalizedEmail}
        LIMIT 1
    `;

    const user = rows[0];
    if (!user) {
        return null;
    }

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        passwordHash: user.password_hash,
    };
}

export async function getProjects(type?: string | null): Promise<Project[]> {
    if (type) {
        const { rows } = await sql<Project>`
            SELECT * FROM projects WHERE type = ${type} ORDER BY id
        `;
        return rows;
    }
    const { rows } = await sql<Project>`SELECT * FROM projects ORDER BY id`;
    return rows;
}

export async function getProjectById(id: number): Promise<Project | null> {
    const { rows } = await sql<Project>`
        SELECT * FROM projects WHERE id = ${id} LIMIT 1
    `;
    return rows[0] ?? null;
}

export async function fetchFilteredProjects(
    query: string,
    currentPage: number
): Promise<Project[]> {
    const safePage = Number.isInteger(currentPage) && currentPage > 0 ? currentPage : 1;
    const offset = (safePage - 1) * ITEMS_PER_PAGE;
    const search = `%${sanitize(query)}%`;

    const { rows } = await sql<Project>`
        SELECT *
        FROM projects
        WHERE
            title ILIKE ${search} OR
            description ILIKE ${search} OR
            type ILIKE ${search} OR
            array_to_string(technologies, ', ') ILIKE ${search}
        ORDER BY id DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return rows;
}

export async function fetchProjectsPages(query: string): Promise<number> {
    const search = `%${sanitize(query)}%`;

    const { rows } = await sql<{ count: string }>`
        SELECT COUNT(*) AS count
        FROM projects
        WHERE
            title ILIKE ${search} OR
            description ILIKE ${search} OR
            type ILIKE ${search} OR
            array_to_string(technologies, ', ') ILIKE ${search}
    `;

    const totalCount = Number(rows[0]?.count ?? 0);
    return Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));
}