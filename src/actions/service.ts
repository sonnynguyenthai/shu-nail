import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Product, Service } from "@prisma/client";

export const getAllServices: () => Promise<Service[] | null> = async () => {
    const user = await currentUser();
    if (!user) {
        return null;
    }
    try {
        return db.service.findMany();
    } catch (error: any) {
        console.error(error.message);
        throw new Error(error);
    }
}


export const getServiceById: (id: string) => Promise<Service | null> = async (id) => {
    const user = await currentUser();
    if (!user) {
        return null;
    }
    try {
        return db.service.findUnique({
            where: { id },

        });
    } catch (error: any) {
        console.error(error.message);
        throw new Error(error);
    }
}