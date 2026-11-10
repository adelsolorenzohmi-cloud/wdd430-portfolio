import { NextResponse } from 'next/server';
import { getProjectById } from '@/lib/projects-db';

export async function GET(
    request: Request,
    { params }: { params: { id: string } | Promise<{ id: string }> }
) {
    // Await params to ensure compatibility with Next.js dynamic routing requirements
    const resolvedParams = await Promise.resolve(params);
    const id = Number(resolvedParams.id);

    // Validate if the ID is a valid number (returns 400 Bad Request if not)
    if (isNaN(id)) {
        return NextResponse.json({ error: 'Invalid project ID format' }, { status: 400 });
    }

    // Fetch the project from the database asynchronously
    const project = await getProjectById(id);

    // Return 404 Not Found if the project doesn't exist
    if (!project) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Return the project data successfully
    return NextResponse.json(project);
}