import { sql } from '@vercel/postgres';

export interface Project {
    id: number;
    title: string;
    description: string;
    type: 'opensource' | 'school';
    technologies: string[];
    link?: string;
}

const ITEMS_PER_PAGE = 6;

function sanitize(query: string) {
    return query.trim().slice(0, 100).replace(/[%_\\]/g, '\\$&');
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
        SELECT * FROM projects WHERE id = ${id}
    `;
    return rows[0] ?? null;
}

export async function fetchFilteredProjects(
    query: string,
    currentPage: number
): Promise<Project[]> {
    const page = Math.max(1, Math.floor(currentPage) || 1);
    const offset = (page - 1) * ITEMS_PER_PAGE;
    const pattern = `%${sanitize(query)}%`;

    const { rows } = await sql<Project>`
        SELECT * FROM projects
        WHERE title ILIKE ${pattern}
           OR description ILIKE ${pattern}
           OR EXISTS (SELECT 1 FROM unnest(technologies) t WHERE t ILIKE ${pattern})
        ORDER BY id
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return rows;
}

export async function fetchProjectsPages(query: string): Promise<number> {
    const pattern = `%${sanitize(query)}%`;

    const { rows } = await sql`
        SELECT COUNT(*) FROM projects
        WHERE title ILIKE ${pattern}
           OR description ILIKE ${pattern}
           OR EXISTS (SELECT 1 FROM unnest(technologies) t WHERE t ILIKE ${pattern})
    `;
    return Math.max(1, Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE));
}