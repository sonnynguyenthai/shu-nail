"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Bell, Camera, CreditCard, Loader2, LogOut, Pencil, Save, Settings, Shield } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Role, User } from "@prisma/client";
import { sendRequest, sendRequestFile } from "@/utils/api";
import { toast } from "sonner";
import { handleUploadFile } from "@/actions/file";
import Link from "next/link";

export default function UserDetails({ user }: { user: User }) {
    const [userInfo, setUserInfo] = useState({
        ...user,
        location: "New York, USA",
        membershipLevel: "Gold",
        profileCompletion: 85,
    });
    const [file, setFile] = useState<File | null | string>();
    const [isSaving, setIsSaving] = useState(false);
    const avatarRef = useRef<HTMLInputElement>(null);

    const bookings = [
        {
            id: "1234",
            date: "December 24, 2023",
            status: "completed",
            service: "Premium Consultation",
            amount: "$150.00"
        },
        {
            id: "1235",
            date: "December 26, 2023",
            status: "upcoming",
            service: "Strategy Session",
            amount: "$200.00"
        },
        {
            id: "1236",
            date: "December 28, 2023",
            status: "pending",
            service: "Workshop",
            amount: "$299.00"
        },

    ];

    const reviews = [
        {
            rating: 4,
            comment: "Great service! Would definitely recommend.",
            date: "December 25, 2023",
            likes: 12
        },
        {
            rating: 5,
            comment: "Exceptional experience. The team went above and beyond.",
            date: "December 20, 2023",
            likes: 8
        }
    ];

    const handleFileChange = async (file: File) => {
        if (!file) {
            toast.error("Please select a file.");
            return;
        }
        const resUploadFile = await handleUploadFile("avatars", file);
        if (!resUploadFile) {
            setIsSaving(false);
            toast.error("Failed to upload file. Please try again.");
            return;
        }
        setUserInfo({ ...userInfo, imageUrl: resUploadFile });
        setFile(resUploadFile);
    }

    const handleSaveChanges = async () => {
        setIsSaving(true);
        if (!file) {
            toast.error("Please select a file.");
            return;
        }

        const response = await sendRequest<IBackendRes<{ user: User }>>({
            method: "PUT",
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`,
            body: userInfo
        })
        if (response.error) {
            toast.error("Failed to update profile. Please try again.");
            setIsSaving(false);
            return;
        }
        toast.success("Profile updated successfully.");
        setIsSaving(false);

    };

    return (
        <div className="max-w-7xl mx-auto px-4">
            {/* Profile Header */}
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-6">
                        <div className="relative group">
                            <Avatar className="h-32 w-32 ring-4 ring-purple-50" >
                                <Link href={userInfo.imageUrl ?? "#"}>
                                    <AvatarImage src={userInfo.imageUrl} />
                                </Link>
                                <AvatarFallback className="text-3xl">JS</AvatarFallback>
                            </Avatar>
                            <Button size="icon" variant="outline" onClick={() => avatarRef.current?.click()} className="absolute bottom-2 right-2 rounded-full h-8 w-8 bg-white group-hover:bg-gray-50">
                                <Camera className="h-4 w-4" />
                            </Button>
                            <Input
                                ref={avatarRef}
                                className="hidden"
                                type="file"
                                accept="image/*"
                                onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-bold">{userInfo.name}</h1>
                                <Badge variant="secondary" className="bg-purple-100 text-purple-700">{userInfo.membershipLevel}</Badge>
                            </div>
                            <p className="text-gray-500 mt-1">{userInfo.location}</p>
                            <div className="mt-4">
                                <p className="text-sm text-gray-600 mb-2">Profile Completion</p>
                                <div className="flex items-center gap-4">
                                    <Progress value={userInfo.profileCompletion} className="w-48" />
                                    <span className="text-sm font-medium">{userInfo.profileCompletion}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">Delete Account</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction className="bg-red-500 hover:bg-red-600">Delete Account</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>

            <Tabs defaultValue="personal" className="space-y-6">
                <TabsList className="bg-white rounded-lg shadow-sm p-1">
                    <TabsTrigger value="personal" className="cursor-pointer">Personal Information</TabsTrigger>
                    <TabsTrigger value="activity" className="cursor-pointer">Activity</TabsTrigger>
                </TabsList>

                <TabsContent value="personal">
                    <Card>
                        <CardHeader>
                            <h2 className="text-xl font-semibold">Personal Information</h2>
                            <p className="text-sm text-gray-500">Update your personal details and contact information</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Full Name</label>
                                    <Input value={userInfo?.name} onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email</label>
                                    <Input value={userInfo?.email} onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Phone Number</label>
                                    <Input value={userInfo?.phone || ""} onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Role</label>
                                    <Select
                                        value={userInfo?.role}
                                        onValueChange={(value) => setUserInfo({ ...userInfo, role: value as Role })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="CUSTOMER">Customer</SelectItem>
                                            <SelectItem value="ADMIN">Admin</SelectItem>
                                            <SelectItem value="EMPLOYEE">Employee</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Location</label>
                                    <Input value={userInfo?.location} onChange={(e) => setUserInfo({ ...userInfo, location: e.target.value })} />
                                </div>
                            </div>
                            <Button className="mt-6" onClick={handleSaveChanges}>
                                {isSaving ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4 mr-2" />
                                        Save
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="activity">
                    <div className="grid grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <h2 className="text-xl font-semibold">Recent Bookings</h2>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {bookings.map((booking) => (
                                        <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <div>
                                                <p className="font-medium">{booking.service}</p>
                                                <p className="text-sm text-gray-500">Booking #{booking.id}</p>
                                                <p className="text-sm text-gray-500">{booking.date}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold">{booking.amount}</p>
                                                <Badge
                                                    className={`mt-2 ${booking.status === "completed" ? "bg-green-700" :
                                                        booking.status === "upcoming" ? "bg-red-700" : "outline"
                                                        }`}
                                                >
                                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <h2 className="text-xl font-semibold">Recent Reviews</h2>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {reviews.map((review, index) => (
                                        <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <div className="flex items-center gap-1 mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg
                                                        key={i}
                                                        className={`h-5 w-5 ${i < review.rating ? "text-yellow-400" : "text-gray-200"}`}
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                                <span className="text-sm text-gray-500 ml-2">• {review.likes} likes</span>
                                            </div>
                                            <p className="text-gray-700">{review.comment}</p>
                                            <p className="text-sm text-gray-500 mt-2">{review.date}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}