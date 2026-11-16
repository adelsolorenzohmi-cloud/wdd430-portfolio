'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const currentYear = new Date().getFullYear();

const ProjectFormSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, { message: 'Title must be at least 3 characters.' }),
    description: z
        .string()
        .trim()
        .min(20, { message: 'Description must be at least 20 characters.' }),
    technologies: z
        .string()
        .trim()
        .min(2, { message: 'Add at least one technology.' }),
    yearCompleted: z.coerce
        .number({ invalid_type_error: 'Year completed must be a valid number.' })
        .int({ message: 'Year must be a whole number.' })
        .gte(2000, { message: 'Year must be 2000 or later.' })
        .lte(currentYear, { message: `Year cannot be greater than ${currentYear}.` }),
    type: z.enum(['school', 'opensource']).default('school'),
    link: z
        .string()
        .trim()
        .refine((val) => val === '' || /^https?:\/\/.+/.test(val), {
            message: 'Link must be a valid URL starting with http:// or https://',
        })
        .optional()
        .default(''),
});

export type State = {
    errors?: {
        title?: string[];
        description?: string[];
        technologies?: string[];
        yearCompleted?: string[];
        type?: string[];
        link?: string[];
    };
    message?: string | null;
};

export type ProjectFormState = State;

async function ensureYearCompletedColumn() {
    await sql`
    ALTER TABLE projects
    ADD COLUMN IF NOT EXISTS year_completed INTEGER
  `;
}

export async function createProject(
    prevState: State,
    formData: FormData
): Promise<State> {
    const validatedFields = ProjectFormSchema.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
        technologies: formData.get('technologies'),
        yearCompleted: formData.get('yearCompleted'),
        type: formData.get('type') || 'school',
        link: formData.get('link') ?? '',
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing or invalid fields. Failed to create project.',
        };
    }

    const { title, description, technologies, yearCompleted, type, link } =
        validatedFields.data;

    const technologiesArray = technologies
        .split(',')
        .map((tech) => tech.trim())
        .filter(Boolean);

    if (technologiesArray.length === 0) {
        return {
            errors: { technologies: ['Add at least one technology.'] },
            message: 'Missing or invalid fields. Failed to create project.',
        };
    }

    const cleanLink = link && link.length > 0 ? link : null;

    try {
        await ensureYearCompletedColumn();
        await sql`
      INSERT INTO projects (title, description, type, technologies, link, year_completed)
      VALUES (
        ${title},
        ${description},
        ${type},
        ${technologiesArray as unknown as string},
        ${cleanLink},
        ${yearCompleted}
      )
    `;
    } catch (error) {
        console.error('Database Error (createProject):', error);
        return {
            message: 'Database Error: Failed to create project.',
        };
    }

    revalidatePath('/projects');
    revalidatePath('/projects/school');
    revalidatePath('/projects/opensource');
    redirect('/projects');
}

export async function updateProject(
    id: number,
    prevState: State,
    formData: FormData
): Promise<State> {
    const validatedFields = ProjectFormSchema.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
        technologies: formData.get('technologies'),
        yearCompleted: formData.get('yearCompleted'),
        type: formData.get('type') || 'school',
        link: formData.get('link') ?? '',
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing or invalid fields. Failed to update project.',
        };
    }

    const { title, description, technologies, yearCompleted, type, link } =
        validatedFields.data;

    const technologiesArray = technologies
        .split(',')
        .map((tech) => tech.trim())
        .filter(Boolean);

    if (technologiesArray.length === 0) {
        return {
            errors: { technologies: ['Add at least one technology.'] },
            message: 'Missing or invalid fields. Failed to update project.',
        };
    }

    const cleanLink = link && link.length > 0 ? link : null;

    try {
        await ensureYearCompletedColumn();
        await sql`
      UPDATE projects
      SET title = ${title},
          description = ${description},
          type = ${type},
          technologies = ${technologiesArray as unknown as string},
          link = ${cleanLink},
          year_completed = ${yearCompleted}
      WHERE id = ${id}
    `;
    } catch (error) {
        console.error('Database Error (updateProject):', error);
        return {
            message: 'Database Error: Failed to update project.',
        };
    }

    revalidatePath('/projects');
    revalidatePath('/projects/school');
    revalidatePath('/projects/opensource');
    redirect('/projects');
}

export async function deleteProject(id: number): Promise<void> {
    try {
        await sql`DELETE FROM projects WHERE id = ${id}`;
    } catch (error) {
        console.error('Database Error (deleteProject):', error);
        throw new Error('Failed to delete project.');
    }

    revalidatePath('/projects');
    revalidatePath('/projects/school');
    revalidatePath('/projects/opensource');
}