import { db } from "@/lib/prisma";
import { Branch } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const branches = await db.branch.findMany();
        const response: IBackendRes<{ branches: Branch[] }> = {
            statusCode: 200,
            message: "Fetched all branches.",
            data: {
                branches
            }
        };
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to retrieve branches' }, { status: 500 });
    }
}
// Create branch (POST)
export async function POST(request: Request) {
    try {
        const { name, address, phone, imageUrl, services } = await request.json();

        const newBranch = await db.branch.create({
            data: {
                name,
                address,
                phone,
                imageUrl,
                services: {
                    connect: services?.map((serviceId: string) => ({ id: serviceId })) // Associating services
                }
            }
        });

        const response: IBackendRes<{ branch: Branch }> = {
            statusCode: 201,
            message: "Branch created successfully.",
            data: {
                branch: newBranch
            }
        };
        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create branch' }, { status: 500 });
    }
}

// Update branch (PUT)
export async function PUT(request: Request) {
    try {
        const { id, name, address, phone, imageUrl, services } = await request.json();

        const updatedBranch = await db.branch.update({
            where: { id },
            data: {
                name,
                address,
                phone,
                imageUrl,
                services: {
                    connect: services?.map((serviceId: string) => ({ id: serviceId })) // Updating services
                }
            }
        });

        const response: IBackendRes<{ branch: Branch }> = {
            statusCode: 200,
            message: "Branch updated successfully.",
            data: {
                branch: updatedBranch
            }
        };
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to update branch' }, { status: 500 });
    }
}