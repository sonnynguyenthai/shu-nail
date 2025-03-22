"use client"
import { DataTable } from "@/components/data.table"
import { Button } from "@/components/ui/button"
import { Service } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Eye, FilePenLine, Loader2, Settings2, Sparkles, Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"
import { ServiceForm } from "./service.form"
import { sendRequest } from "@/utils/api"
import { toast } from "sonner"
import { AlertDialogHeader, AlertDialogFooter, AlertDialogTrigger, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from "@/components/ui/alert-dialog"

export default function ServiceTable() {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false)
    const [data, setData] = React.useState<Service[]>([])

    useEffect(() => {
        if (!loading) {
            fetchServices()
        }
    }, [loading])
    const columns: ColumnDef<Service>[] = [
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
            accessorKey: "price",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Price
                    <ArrowUpDown />
                </Button>
            ),
            cell: ({ row }) => <div>${row.getValue("price")}</div>,
        },
        {
            accessorKey: "createdAt",
            header: "Created At",
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
            header: "Updated At",
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
        const response = await sendRequest<IBackendRes<{ services: Service[] }>>({
            method: "GET",
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services`,
        })
        if (response.error) {
            toast.error("Failed to fetch services")
            return
        }
        setData(response?.data?.services || [])
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
                                <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold tracking-tight">Services</h1>
                            </div>
                            <div className="flex items-center gap-2">
                                <Settings2 className="h-4 w-4 text-muted-foreground" />
                                <p className="text-muted-foreground text-lg">
                                    Manage and organize your service offerings
                                </p>
                            </div>
                        </div>
                        <ServiceForm loading={loading} setLoading={setLoading} />
                    </div>
                </div>
            </div>
            <div className="px-8 py-8">
                {
                    loading ? <Loader2 className="h-10 w-10 animate-spin" /> : (
                        <DataTable
                            data={data}
                            columns={columns}
                            filterableColumns={["name", "price"]}
                        />
                    )
                }
            </div>


        </>
    )
}
