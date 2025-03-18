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
        const { name, description, price, imageUrl, categories } = await request.json();

        const newService = await db.service.create({
            data: {
                name,
                description,
                price,
                imageUrl,
                categories: {
                    connect: categories?.map((categoryId: string) => ({ id: categoryId })) // Associating categories
                }
            }
        });

        const response: IBackendRes<{ service: Service }> = {
            statusCode: 201,
            message: "Service created successfully.",
            data: {
                service: newService
            }
        };
        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
    }
}

// Update an existing service (PUT)
export async function PUT(request: Request) {
    try {
        const { id, name, description, price, imageUrl, categories } = await request.json();

        const updatedService = await db.service.update({
            where: { id },
            data: {
                name,
                description,
                price,
                imageUrl,
                categories: {
                    connect: categories?.map((categoryId: string) => ({ id: categoryId })) // Updating categories
                }
            }
        });

        const response: IBackendRes<{ service: Service }> = {
            statusCode: 200,
            message: "Service updated successfully.",
            data: {
                service: updatedService
            }
        };
        return NextResponse.json(response, { status: 200 });
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

        return NextResponse.json({ message: "Service deleted successfully." }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
    }
}
