import { db } from "@/lib/prisma";
import { Service } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;
    try {
        if (id) {
            const service = await db.service.findUnique({
                where: {
                    id
                },
                select: {
                    id: true,
                    name: true
                }
            })
            if (!service) {
                return NextResponse.json({ error: "Service not found" }, { status: 404 });
            }

            const response: IBackendRes<{ service: { id: string, name: string } }> = {
                statusCode: 200,
                message: "Fetch service by Id.",
                data: {
                    service
                }
            }
            // Return the list of services
            return NextResponse.json(response, { status: 200 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to retrieve services by branch" }, { status: 500 });
    }
}

