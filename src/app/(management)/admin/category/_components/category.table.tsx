"use client"
import { DataTable } from "@/components/data.table"
import { Button } from "@/components/ui/button"
import { Category, Service } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Eye, Loader2, Settings2, Sparkles, Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"
import { sendRequest } from "@/utils/api"
import { toast } from "sonner"
import { AlertDialogHeader, AlertDialogFooter, AlertDialogTrigger, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { CategoryForm } from "./category.form"

export default function CategoryTable() {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false)
    const [data, setData] = React.useState<(Category & { serviceName: string })[]>([])

    useEffect(() => {
        if (!loading) {
            fetchServices()
        }
    }, [loading])
    const columns: ColumnDef<Category>[] = [
        {
            accessorKey: "id",
            header: "ID",
            cell: ({ row }) => <div>{row.getValue("id")}</div>,
        },
        {
            accessorKey: "name",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown />
                </Button>
            ),
            cell: ({ row }) => <div>{row.getValue("name")}</div>,
        },
        {
            accessorKey: "description",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                >
                    Description
                    <ArrowUpDown />
                </Button>
            ),
            cell: ({ row }) => <div className="truncate">{row.getValue("description")}</div>,
        },
        {
            accessorKey: "serviceName",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Service Name
                    <ArrowUpDown />
                </Button>
            ),
            cell: ({ row }) => <div className="truncate">{row.getValue("serviceName")}</div>,
        },
        {
            accessorKey: "createdAt",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    CreatedAt
                    <ArrowUpDown />
                </Button>
            ),
            cell: ({ row }) => {
                const [createdAt, setCreatedAt] = React.useState<string>("")

                React.useEffect(() => {
                    const date = new Date(row.getValue("createdAt"))
                    setCreatedAt(date.toLocaleString())
                }, [row.getValue("createdAt")])

                return <div>{createdAt}</div>
            },
        },
        {
            accessorKey: "updatedAt",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    UpdatedAt
                    <ArrowUpDown />
                </Button>
            ),
            cell: ({ row }) => {
                const [updatedAt, setUpdatedAt] = React.useState<string>("")

                React.useEffect(() => {
                    const date = new Date(row.getValue("updatedAt"))
                    setUpdatedAt(date.toLocaleString())
                }, [row.getValue("updatedAt")])

                return <div>{updatedAt}</div>
            },
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => (
                <div className="flex space-x-1">
                    <Eye className="cursor-pointer hover:text-[blue]" onClick={() => handleViewDetails(row.original.id)} />
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Trash className="cursor-pointer hover:text-[red]" onClick={(e) => {
                                e.stopPropagation();
                            }} />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your
                                    service and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={(e) => {
                                    e.stopPropagation();
                                }}>Cancel</AlertDialogCancel>
                                <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={(e) => handleDelete(row.original?.id, e)}>Remove</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            ),
        },
    ]

    const handleViewDetails = (id: string) => {
        router.push(`service/${id}`)
    }
    const fetchServices = async () => {
        const resCategories = await sendRequest<IBackendRes<{ categories: Category[] }>>({
            method: "GET",
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`,
        })
        if (resCategories.error) {
            toast.error(resCategories.error)
            return
        }
        const fetchedCategories = resCategories?.data?.categories;
        const categories = await Promise.all(fetchedCategories?.map(async (category): Promise<Category & { serviceName: string }> => {
            const resService = await sendRequest<IBackendRes<{ service: Service }>>({
                method: "GET",
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services/${category?.serviceId}`,
            })
            if (resService.error) {
                toast.error(resService.error)
                return { ...category, serviceName: "" };
            }
            const serviceName = resService?.data?.service?.name || "";
            return { ...category, serviceName }
        }) || [])
        setData(categories)
    }

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        setLoading(true);
        const response = await sendRequest<IBackendRes<null>>({
            method: "DELETE",
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services`,
            body: { id },
        })
        if (response.error) {
            setLoading(false)
            toast.error("Failed to delete service")
            return
        }
        fetchServices()
        setLoading(false)
        toast.success("Service deleted successfully")
    }

    return (
        <>
            <div className="border-b">
                <div className="px-8 py-12">
                    <div className="flex items-center justify-between">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Sparkles className="h-6 w-6 text-primary" />
                                <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold tracking-tight">Categories</h1>
                            </div>
                            <div className="flex items-center gap-2">
                                <Settings2 className="h-4 w-4 text-muted-foreground" />
                                <p className="text-muted-foreground text-lg">
                                    Manage and organize your categories offerings
                                </p>
                            </div>
                        </div>
                        <CategoryForm loading={loading} setLoading={setLoading} />
                    </div>
                </div>
            </div>
            <div className="px-8 py-8">
                {
                    loading ? <Loader2 className="h-10 w-10 animate-spin" /> : (
                        <DataTable
                            data={data}
                            columns={columns}
                            filterableColumns={["name", "serviceName"]}
                        />
                    )
                }
            </div>


        </>
    )
}
