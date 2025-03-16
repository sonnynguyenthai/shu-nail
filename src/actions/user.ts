import { currentUser } from '@clerk/nextjs/server';
import { db } from '@/lib/prisma';
export const checkUser = async () => {
    const user = await currentUser();
    if (!user) {
        return null;
    }

    try {
        const LoggedInUser = await db.user.findUnique({
            where: {
                id: user.id,
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