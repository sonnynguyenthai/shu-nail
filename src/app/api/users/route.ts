// src/app/api/users/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';  // Prisma client
import { checkUser } from '@/actions/user';

// Update user (PUT)
export async function PUT(request: Request) {
    try {
        const { id, location,
            membershipLevel,
            profileCompletion, ...userInfo } = await request.json();  // Get data from request body
        const user = await checkUser(); // Ensure the user is authenticated with Clerk

        if (!user) {
            return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
        }

        const updatedUser = await db.user.update({
            where: { id },
            data: userInfo
        });

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
}

// Delete user (DELETE)
export async function DELETE(request: Request) {
    try {
        const { id } = await request.json(); // Get data from request body
        const user = await checkUser(); // Ensure the user is authenticated with Clerk

        if (!user) {
            return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
        }

        const deletedUser = await db.user.delete({
            where: { id },
        });

        return NextResponse.json(deletedUser, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
    }
}
