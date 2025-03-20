"use client"
import { DataTable } from "@/components/data.table"
import { Button } from "@/components/ui/button"
import { Product } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, FilePenLine, MoreHorizontal, Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import React from "react"

export default function ProductTable({ data }: { data: Product[] }) {
    const router = useRouter();
    const columns: ColumnDef<Product>[] = [
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
            header: "Description",
            cell: ({ row }) => <div>{row.getValue("description")}</div>,
        },
        {
            accessorKey: "imageUrl",
            header: "ImageUrl",
            cell: ({ row }) => <div>{row.getValue("imageUrl")}</div>,
        },
        {
            accessorKey: "price",
            header: "Price",
            cell: ({ row }) => <div>${row.getValue("price")}</div>,
        },
        {
            accessorKey: "promotionPrice",
            header: "Promotion Price",
            cell: ({ row }) => <div>${row.getValue("promotionPrice") || "N/A"}</div>,
        },
        {
            accessorKey: "categoryId",
            header: "Category ID",
            cell: ({ row }) => <div>{row.getValue("categoryId")}</div>,
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
                <div className="flex space-x-2">
                    <FilePenLine className="cursor-pointer hover:text-[blue]" />
                    <Trash className="cursor-pointer hover:text-[red]" />
                </div>
            ),
        },
    ]

    const handleRowAction = (row: any) => {
        router.push(`product/${row.id}`)
    }

    return (
        <DataTable
            data={data}
            columns={columns}
            handleClickRow={handleRowAction}
            filterableColumns={["name", "price"]}
        />
    )
}
