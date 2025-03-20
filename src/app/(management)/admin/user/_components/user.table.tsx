"use client"
import { DataTable } from "@/components/data.table"
import { Button } from "@/components/ui/button"
import { User } from "@prisma/client"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, FilePenLine, MoreHorizontal, Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import React from "react"

export default function UserTable({ data }: { data: User[] }) {
    const router = useRouter();
    const columns: ColumnDef<User>[] = [

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
            accessorKey: "email",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown />
                </Button>
            ),
            cell: ({ row }) => <div>{row.getValue("email")}</div>,
        },
        {
            accessorKey: "phone",
            header: "Phone",
            cell: ({ row }) => <div>{row.getValue("phone")}</div>,
        },
        {
            accessorKey: "role",
            header: "Role",
            cell: ({ row }) => <div>{row.getValue("role")}</div>,
        },
        {
            accessorKey: "createdAt",
            header: "Created At",
            cell: ({ row }) => {
                const [createdAt, setCreatedAt] = React.useState<string>("")

                React.useEffect(() => {
                    const date = new Date(row.getValue("createdAt"))
                    setCreatedAt(date.toLocaleString()) // Human-readable format
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
                    setUpdatedAt(date.toLocaleString()) // Human-readable format
                }, [row.getValue("updatedAt")])

                return <div>{updatedAt}</div>
            },
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <FilePenLine className="cursor-pointer hover:text-[blue]" />
                        <Trash className="cursor-pointer hover:text-[red]" />
                    </div>
                )
            },
        },
    ]
    const handleRowAction = (row: any) => {
        router.push(`user/${row.id}`)
    }

    return (
        <DataTable
            data={data}
            columns={columns}
            handleClickRow={handleRowAction}
            filterableColumns={["name", "email"]}
        />
    )
}