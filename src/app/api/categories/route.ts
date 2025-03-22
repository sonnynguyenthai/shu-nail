import { db } from "@/lib/prisma";
import { Category, Service } from "@prisma/client";
import { NextResponse } from "next/server";

// Get all categories
export async function GET() {
    try {
        const categories = await db.category.findMany({
            orderBy: {
                updatedAt: 'desc' // Sorting by latest first
            }
        });
        const response: IBackendRes<{ categories: Category[] }> = {
            statusCode: 200,
            message: "Fetched all categories.",
            data: {
                categories
            }
        };

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to retrieve categories' }, { status: 500 });
    }
}

// Get services by branch ID


// Create a new service (POST)
export async function POST(request: Request) {
    try {
        const { name, description, serviceId } = await request.json();

        const newCategory = await db.category.create({
            data: {
                name,
                description,
                serviceId,
            },
        });

        const response: IBackendRes<{ category: Category }> = {
            statusCode: 201,
            message: "Create Category.",
            data: { category: newCategory },
        };

        return NextResponse.json(response, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
    }
}
// Update an existing service (PUT)

export async function PUT(request: Request) {
    try {
        const { id, name, active, description, price, imageUrl, branchIds } = await request.json();

        await db.branchService.deleteMany({
            where: {
                serviceId: id,
            },
        });
        const updatedService = await db.service.update({
            where: { id },
            data: {
                name,
                description,
                price,
                imageUrl,
                active,
                branches: {
                    create: branchIds.map((branchId: string) => ({
                        branch: {
                            connect: { id: branchId },
                        },
                    })),
                },
            },
        });

        return NextResponse.json({
            statusCode: 200,
            message: "Service updated successfully.",
            data: { service: updatedService },
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
    }
}

// Delete a service (DELETE)
export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        await db.branchService.deleteMany({
            where: {
                serviceId: id,
            },
        });
        await db.service.delete({ where: { id } });
        const response: IBackendRes<null> = {
            statusCode: 200,
            message: "Service updated successfully.",
            data: null
        };
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
    }
}
