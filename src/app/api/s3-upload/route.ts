import { db } from "@/lib/prisma";
import { Service } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { File } from "buffer";
import { v4 as uuidv4 } from 'uuid';

if (!process.env.NEXT_PUBLIC_AWS_S3_REGION || !process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID || !process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY) {
    throw new Error("AWS S3 environment variables are not properly set.");
}

const s3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY
    }
});

const uploadFileToS3 = async (fileBuffer: Buffer, target: string, fileName: string) => {
    const uniqueFileName = `${uuidv4()}-${fileName}`
    const params = {
        Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
        Key: `uploads/${target}/${uniqueFileName}`,
        Body: fileBuffer,
        ContentType: "image/jpg"
    }
    const command = new PutObjectCommand(params);
    await s3Client.send(command)
    return uniqueFileName
}

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

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file");
        const target = formData.get("target");
        if (!file) {
            return NextResponse.json({ error: 'File is required.' }, { status: 400 });

        }
        if (!(file instanceof File)) {
            return NextResponse.json({ error: 'Invalid file type.' }, { status: 400 });
        }
        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = await uploadFileToS3(buffer, target as string, file.name)
        const response = {
            statusCode: 201,
            message: "Upload File.",
            data: {
                fileName
            }
        };
        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to upload file.' }, { status: 500 });
    }
}
