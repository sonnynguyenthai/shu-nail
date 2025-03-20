"use client"; // If using Next.js with App Router
import { useState, useEffect } from "react";
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AlignJustify } from "lucide-react";
import { usePathname, useRouter } from "next/navigation"; // Use 'react-router-dom' if not using Next.js

const AdminSheet = () => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
        if (pathName === "/admin") {
            router.push("/admin/user");
        }
        setOpen(false); // Close sheet when path changes
    }, [pathName, router]);

    const menuItems = [
        { label: "Users", path: "/admin/user" },
        { label: "Categories", path: "/admin/category" },
        { label: "Products", path: "/admin/product" },
        { label: "Services", path: "/admin/service" },
        { label: "Branches", path: "/admin/branch" },
    ];

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <AlignJustify
                    className="cursor-pointer hover:w-8 h-8"
                    onClick={() => setOpen(true)}
                />
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
                <SheetHeader>
                    <SheetTitle>Navigation</SheetTitle>
                    <SheetDescription>Select a section to navigate.</SheetDescription>
                </SheetHeader>
                <div className="grid gap-2 py-4">
                    {menuItems.map((item, index) => (
                        <Button
                            key={index}
                            variant="ghost"
                            className="justify-start text-left w-full"
                            onClick={() => {
                                router.push(item.path);
                                setOpen(false); // Close the sheet after clicking
                            }}
                        >
                            {item.label}
                        </Button>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default AdminSheet;