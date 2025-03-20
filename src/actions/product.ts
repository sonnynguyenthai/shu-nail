import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Product } from "@prisma/client";

export const getAllProducts: () => Promise<Product[] | null> = async () => {
    const user = await currentUser();
    if (!user) {
        return null;
    }
    try {
        return db.product.findMany();
    } catch (error: any) {
        console.error(error.message);
        throw new Error(error);
    }
}
