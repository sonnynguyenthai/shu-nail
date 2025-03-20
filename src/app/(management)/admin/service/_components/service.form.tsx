"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { use, useEffect, useRef, useState } from "react";
import { ImagePlus, Plus } from "lucide-react";
import { ServiceFormValues, serviceSchema } from "@/app/lib/schemas/service.schema";
import { sendRequest } from "@/utils/api";
import { Service } from "@prisma/client";
import { toast } from "sonner";
import { handleUploadFile } from "@/actions/file";
import Image from "next/image";
export function ServiceForm({ loading, setLoading }: { loading: boolean, setLoading: (loading: boolean) => void }) {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState<File | null | string>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const form = useForm<ServiceFormValues>({
        resolver: zodResolver(serviceSchema),
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            imageUrl: "",
        },
    });
    const handleFileChange = async (file: File) => {
        if (!file) {
            toast.error("Please select a file.");
            return;
        }
        const resUploadFile = await handleUploadFile("services", file);
        if (!resUploadFile) {
            toast.error("Failed to upload file. Please try again.");
            return;
        }
        setFile(resUploadFile);
        form.setValue("imageUrl", resUploadFile);
    }
    useEffect(() => { console.log(file); }, [file]);
    async function onSubmit(data: ServiceFormValues) {
        setLoading(true);
        try {
            const response = await sendRequest<IBackendRes<{ service: Service }>>({
                method: "POST",
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services`,
                body: data,
            })
            if (response.data) {
                toast.success("Service created successfully");
            }
            form.reset();
            setOpen(false);
        } catch (error) {
            toast.error("Failed to create service");
            console.error("Error creating service:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    <p className="hidden sm:block">
                        Add New Service
                    </p>

                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Create New Service</DialogTitle>
                    <DialogDescription>
                        Add a new service to your portfolio. Fill out the form below.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Service Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Premium Consultation" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter a descriptive name for your service
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Detailed description of your service..."
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Provide a detailed description of what the service includes
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="99.99"
                                            {...field}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormDescription>Set the price for your service</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image URL</FormLabel>
                                    <FormControl>
                                        <div className="flex gap-2">
                                            <Input placeholder="https://example.com/image.jpg" {...field} />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                onClick={() => fileInputRef.current?.click()}
                                            >
                                                <ImagePlus className="h-4 w-4 cursor-pointer" />
                                                <Input
                                                    ref={fileInputRef}
                                                    className="hidden"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
                                                />
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormDescription>
                                        Provide a URL for the service image
                                    </FormDescription>
                                    <FormMessage />
                                    <>
                                        {file && (
                                            <FormItem>
                                                <Image
                                                    width={200}
                                                    height={200}
                                                    src={file as string ?? ""}
                                                    alt="Service Image " className="rounded-xl"
                                                />
                                            </FormItem>
                                        )}
                                    </>
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end gap-4 pt-4">
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? "Creating..." : "Create Service"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}