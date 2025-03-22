"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
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
import { Branch, Role, Service } from "@prisma/client";
import { toast } from "sonner";
import { handleUploadFile } from "@/actions/file";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MenuWithBadge from "@/components/menu.with.badge";
import { CategoryFormValues, categorySchema } from "@/app/lib/schemas/category.schema";
export function CategoryForm({ loading, setLoading }: { loading: boolean, setLoading: (loading: boolean) => void }) {
    const [open, setOpen] = useState(false);
    const [services, setServices] = useState<Branch[]>([]);
    useEffect(() => {
        const fetchBranches = async () => {
            const response = await sendRequest<IBackendRes<{ services: Branch[] }>>({
                method: "GET",
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services`,
            });
            if (response.error) {
                return;
            }
            setServices(response?.data?.services || []);
        }
        fetchBranches();
    }, [])
    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: "",
            description: "",
            serviceName: ""
        },
    });
    async function onSubmit({ serviceName, ...data }: CategoryFormValues) {
        setLoading(true);
        const serviceId = services.find(service => service.name === serviceName)?.id;
        try {
            const response = await sendRequest<IBackendRes<{ service: Service }>>({
                method: "POST",
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`,
                body: { ...data, serviceId },
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
                        Add New Category
                    </p>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[1000px] overflow-auto">
                <DialogHeader>
                    <DialogTitle>Create New Category</DialogTitle>
                    <DialogDescription>
                        Add a new category to your portfolio. Fill out the form below.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Detailed name of your category..." {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter a descriptive name for your category
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
                                            placeholder="Detailed description of your category..."
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
                            name="serviceName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Service</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a service of your category..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {services.map(service => (
                                                <SelectItem key={service.id} value={service.name}>{service.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Provide a service description of what the category includes
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end gap-4 pt-4">
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? "Creating..." : "Create Category"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}