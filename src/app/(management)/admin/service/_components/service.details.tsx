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
import { ArrowLeft, Bell, Camera, CreditCard, Loader2, LogOut, Pencil, Save, Settings, Shield } from "lucide-react";
import { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import { Branch, Service, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ServiceFormValues, serviceSchema } from "@/app/lib/schemas/service.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { handleUploadFile } from "@/actions/file";
import { sendRequest } from "@/utils/api";
import MenuWithBadge from "@/components/menu.with.badge";
import { Switch } from "@/components/ui/switch";
import { get } from "http";

export default function ServiceDetails({ service }: { service: Service }) {
    const [serviceInfo, setServiceInfo] = useState({
        ...service,
        location: "New York, USA",
        membershipLevel: "Gold",
        profileCompletion: 85,
    });
    const serviceImageUrlRef = useRef<HTMLInputElement>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [branches, setBranches] = useState<Branch[]>([]);
    const [selectedBranchNames, setSelectedBranchNames] = useState<string[]>([]);
    const [active, setActive] = useState<boolean>(service.active)
    const { setValue, getValues, formState: { errors }, register, handleSubmit } = useForm<ServiceFormValues>({
        resolver: zodResolver(serviceSchema),
        defaultValues: {
            name: service.name,
            description: service.description,
            price: service.price,
            imageUrl: service.imageUrl || "",
        },
    });

    const [file, setFile] = useState<File | null | string>(service.imageUrl);

    const router = useRouter();
    useEffect(() => {
        const fetchBranches = async () => {
            const [resBranchesOfService, resBranches] = await Promise.all([
                sendRequest<IBackendRes<{ branches: Branch[] }>>({
                    method: "GET",
                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/branches/get-by-service`,
                    queryParams: { serviceId: service.id }
                }),
                sendRequest<IBackendRes<{ branches: Branch[] }>>({
                    method: "GET",
                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/branches`,
                    queryParams: { serviceId: service.id }
                })
            ]);
            if (resBranches.error || resBranchesOfService.error) {
                toast.error("Failed to fetch branches. Please try again.");
                return;
            }
            setSelectedBranchNames(resBranchesOfService?.data?.branches.map((branch) => branch.name) || []);
            setBranches(resBranches?.data?.branches || []);
        }
        fetchBranches();
    }, [])

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
        const resUploadFile = await handleUploadFile("services", file);
        if (!resUploadFile) {
            setIsSaving(false);
            toast.error("Failed to upload file. Please try again.");
            return;
        }
        setFile(resUploadFile);
        setValue("imageUrl", resUploadFile);
    }

    const handleSaveChanges = async (data: ServiceFormValues) => {
        setIsSaving(true);
        if (!file) {
            toast.error("Please select a file.");
            setIsSaving(false);
            return;
        }
        const branchIds = branches.filter(branch => selectedBranchNames.includes(branch.name)).map(branch => branch.id);
        const updateService = { ...service, ...data, imageUrl: file, branchIds, active }
        const response = await sendRequest<IBackendRes<{ services: Service[] }>>({
            method: "PUT",
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services`,
            body: updateService
        })
        if (response.error) {
            toast.error("Failed to update profile. Please try again.");
            setIsSaving(false);
            return;
        }
        toast.success("Profile updated successfully.");
        setIsSaving(false);
    }

    return (
        <div>
            {/* Profile Header */}
            <Button variant="ghost" onClick={() => router.back()} >
                <ArrowLeft className="w-8 h-6" />
            </Button>
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <div className="flex justify-center space-y-4 sm:space-y-0 sm:justify-between items-start flex-wrap ">
                    <div className="flex items-center gap-6">
                        <div className="relative group">
                            <Avatar className="h-50 w-50 ring-4 ring-purple-50">
                                <AvatarImage src={getValues("imageUrl")} />
                                <AvatarFallback className="text-3xl">JS</AvatarFallback>
                            </Avatar>
                            <Button size="icon" variant="outline" onClick={() => serviceImageUrlRef.current?.click()} className="absolute bottom-2 right-2 rounded-full h-8 w-8 bg-white group-hover:bg-gray-50">
                                <Camera className="h-4 w-4" />
                            </Button>
                            <Input
                                {...register("imageUrl")}
                                ref={serviceImageUrlRef}
                                className="hidden"
                                type="file"
                                accept="image/*"
                                onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
                            />
                        </div>
                        <div className="hidden sm:block">
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-bold">{serviceInfo.name}</h1>
                                <Badge variant="secondary" className="bg-purple-100 text-purple-700">{serviceInfo.membershipLevel}</Badge>
                            </div>
                            <p className="text-gray-500 mt-1">{serviceInfo.location}</p>
                            <div className="mt-4">
                                <p className="text-sm text-gray-600 mb-2">Profile Completion</p>
                                <div className="flex items-center gap-4">
                                    <Progress value={serviceInfo.profileCompletion} className="w-48" />
                                    <span className="text-sm font-medium">{serviceInfo.profileCompletion}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">Delete Service</Button>
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
                    <TabsTrigger value="personal">Service Information</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>

                <TabsContent value="personal">
                    <Card>
                        <CardHeader>
                            <h2 className="text-xl font-semibold">Personal Information</h2>
                            <p className="text-sm text-gray-500">Update your personal details and contact information</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Full Name</label>
                                    <Input {...register("name")} value={serviceInfo.name} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email</label>
                                    <Input  {...register("description")} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Price</label>
                                    <Input {...register("price")} type="number" />
                                </div>


                                <div className="space-y-2">
                                    <MenuWithBadge
                                        title={"Choose your branch"}
                                        selectedItems={selectedBranchNames}
                                        setSelectedItems={setSelectedBranchNames}
                                        items={branches.map((branch) => branch.name)}
                                    />
                                </div>
                                <div className="space-y-2 flex items-start gap-4">
                                    <label className="text-sm font-medium">Active Service</label>
                                    <Switch
                                        checked={active}
                                        onCheckedChange={(checked) => setActive(checked)}
                                    />
                                </div>
                            </div>
                            <Button className="mt-6" onClick={handleSubmit(handleSaveChanges)}>
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
                    <div className="grid gird-cols-1 sm:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <h2 className="text-xl font-semibold">Recent Bookings</h2>
                            </CardHeader>
                            <CardContent >
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
                                                    variant={
                                                        booking.status === "completed" ? "secondary" :
                                                            booking.status === "upcoming" ? "default" : "outline"
                                                    }
                                                    className="mt-2"
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