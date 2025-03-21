import { db } from "@/lib/prisma";
import { Service } from "@prisma/client";
import { NextResponse } from "next/server";

// Get all services
export async function GET() {
    try {
        const services = await db.service.findMany();
        const response: IBackendRes<{ services: Service[] }> = {
            statusCode: 200,
            message: "Fetched all services.",
            data: {
                services
            }
        };

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to retrieve services' }, { status: 500 });
    }
}

// Get services by branch ID


// Create a new service (POST)
export async function POST(request: Request) {
    try {
        const { name, description, price, imageUrl, branchIds } = await request.json();

        // Ensure branchIds is an array
        if (!Array.isArray(branchIds) || branchIds.length === 0) {
            return NextResponse.json({ error: "At least one branchId is required" }, { status: 400 });
        }
        // Step 1: Create the service
        const newService = await db.service.create({
            data: {
                name,
                description,
                price,
                imageUrl,
                // Step 2: Link service to multiple branches
                branches: {
                    create: branchIds.map((branchId) => ({
                        branch: {
                            connect: { id: branchId },
                        },
                    })),
                },
            },
        });

        const response: IBackendRes<{ service: Service }> = {
            statusCode: 201,
            message: "Service created and linked to branches successfully.",
            data: { service: newService },
        };

        return NextResponse.json(response, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
    }
}
// Update an existing service (PUT)

export async function PUT(request: Request) {
    try {
        const { id, name, description, price, imageUrl, branchIds } = await request.json();

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
