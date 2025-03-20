import { db } from "@/lib/prisma";
import { Service } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const branchId = searchParams.get("branchId");

        // Check if branchId is provided
        if (!branchId) {
            return NextResponse.json({ error: "branchId is required" }, { status: 400 });
        }

        // Fetch the services linked to the provided branchId through the BranchService model
        const branchServices = await db.branchService.findMany({
            where: {
                branchId: branchId, // Find all BranchService entries that match the given branchId
            },
            include: {
                service: true, // Include the associated service in the result
            },
        });

        // Extract the services from the branchServices result
        const services = branchServices.map((branchService) => branchService.service);
        const response: IBackendRes<{ services: Service[] }> = {
            statusCode: 200,
            message: "Fetch services for branch.",
            data: {
                services
            }
        }
        // Return the list of services
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to retrieve services by branch" }, { status: 500 });
    }
}

