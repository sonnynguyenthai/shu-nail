import { currentUser } from '@clerk/nextjs/server';
import { db } from '@/lib/prisma';
import { User, Role } from '@prisma/client';
export const checkUser = async () => {
    const user = await currentUser();
    if (!user) {
        return null;
    }
    try {
        const LoggedInUser = await db.user.findUnique({
            where: {
                clerkUserId: user.id,
            },
        });
        if (LoggedInUser) {
            return LoggedInUser;
        }

        const newUser = await db.user.create({
            data: {
                clerkUserId: user.id,
                name: user.fullName || '',
                imageUrl: user.imageUrl,
                email: user.emailAddresses[0].emailAddress,
                role: "CUSTOMER"
            },
        });
        return newUser;
    } catch (error: any) {
        console.error(error.message);
        throw new Error(error);
    }
};

export const getAllUsers: () => Promise<User[] | null> = async () => {
    const user = await currentUser();
    if (!user) {
        return null;
    }
    try {
        return db.user.findMany();
    } catch (error: any) {
        console.error(error.message);
        throw new Error(error);
    }
}

export const getUserDetails: (id: string) => Promise<User | null> = async (id: string) => {
    const user = await currentUser();
    if (!user) {
        return null;
    }

    try {
        const userDetails = await db.user.findUnique({
            where: {
                id: id, // Searching by user ID
            }
        });

        return userDetails;
    } catch (error: any) {
        console.error(error.message);
        throw new Error(error);
    }
};