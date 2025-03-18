import { NextResponse } from 'next/server';
import { checkUser } from '@/actions/user';
import { User } from '@prisma/client';

// Get user by ID (GET)
export async function GET() {
    try {
        // Ensure the user is authenticated
        const user = await checkUser();

        if (!user) {
            return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
        }

        // Fetch the user by ID
        const response: IBackendRes<{ user: User }> = {
            statusCode: 200,
            message: "Fetch user.",
            data: {
                user
            }
        }  // Get all users or modify this to get a specific user
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to retrieve user' }, { status: 500 });
    }
}
