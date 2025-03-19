"use client"; // If using Next.js with App Router
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AlignJustify } from "lucide-react";
import { usePathname, useRouter } from "next/navigation"; // Use 'react-router-dom' if not using Next.js
import path from "path";
import { useEffect } from "react";

const AdminSheet = () => {
    const router = useRouter(); // Next.js navigation
    const pathName = usePathname()
    useEffect(() => {
        if (pathName === "admin") {
            router.push("admin/user")
        }
    }, [pathName])

    const menuItems = [
        { label: "Users", path: "user" },
        { label: "Categories", path: "category" },
        { label: "Products", path: "product" },
        { label: "Services", path: "service" },
        { label: "Branches", path: "branch" },
    ];

    return (
        <Sheet>
            <SheetTrigger asChild>
                <AlignJustify className="cursor-pointer hover:w-8 h-8" />
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
                            onClick={() => router.push(item.path)}
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