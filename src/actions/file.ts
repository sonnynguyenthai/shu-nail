import { sendRequestFile } from "@/utils/api";


export const handleUploadFile = async (target: string, file: File) => {
    const formData = new FormData();
    if (file) {
        formData.append("file", file);
        formData.append("target", target);
    }
    const resUploadFile = await sendRequestFile<IBackendRes<{ fileName: string }>>({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/s3-upload`,
        body: formData
    });
    return (process.env.NEXT_PUBLIC_AWS_S3_AVATAR_FOLDER ?? "") + resUploadFile.data?.fileName;
};