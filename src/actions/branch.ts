import { db } from "@/lib/prisma"

export const callFetchAllBranches = async () => {
    try {
        const branches = await db.branch.findMany();
        return branches;
    } catch (error) {
        console.error("Error fetching branches:", error);
        throw error;
    }
}