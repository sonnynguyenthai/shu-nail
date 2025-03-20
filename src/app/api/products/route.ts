import { db } from "@/lib/prisma";
import { Product, Service } from "@prisma/client";
import { NextResponse } from "next/server";

// Get all services
export async function GET() {
    try {
        const products = await db.product.findMany();
        const response: IBackendRes<{ products: Product[] }> = {
            statusCode: 200,
            message: "Fetched all products.",
            data: {
                products
            }
        };
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to retrieve products' }, { status: 500 });
    }
}

// Get services by branch ID

