import { db } from "@/lib/prisma";
import { Branch, Service } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const serviceId = searchParams.get("serviceId");

        // Check if serviceId is provided
        if (!serviceId) {
            return NextResponse.json({ error: "serviceId is required" }, { status: 400 });
        }

        // Fetch the services linked to the provided serviceId through the BranchService model
        const branchServices = await db.branchService.findMany({
            where: {
                serviceId: serviceId, // Find all BranchService entries that match the given branchId
            },
            include: {
                branch: true, // Include the associated service in the result
            },
        });
        // Extract the services from the branchServices result
        const branches = branchServices.map((branchService) => branchService.branch);
        const response: IBackendRes<{ branches: Branch[] }> = {
            statusCode: 200,
            message: "Fetch branches for service.",
            data: {
                branches
            }
        }
        // Return the list of services
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to retrieve services by branch" }, { status: 500 });
    }
}

