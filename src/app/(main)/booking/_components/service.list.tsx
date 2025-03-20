"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Scissors, Clock, DollarSign, ArrowRight } from 'lucide-react';
import { Service } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { sendRequest } from '@/utils/api';

const ServiceList = ({ title = "", services = [] }: { title: string, services: Service[] }) => {
    const [serviceList, setServiceList] = useState<Service[]>(services);
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const router = useRouter();
    const branchId = sessionStorage.getItem("branchId");
    useEffect(() => {
        const fetchServices = async () => {
            const response = await sendRequest<IBackendRes<{ services: Service[] }>>({
                method: "GET",
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services/get-by-branch`,
                queryParams: { branchId }
            })
            if (response.error) {
                return
            }
            setServiceList(response?.data?.services || [])
        }
        if (branchId) {
            fetchServices()
        } else {
            router.push("/onboarding");
        }
    }, [branchId])
    function handleClickExplore() {
        router.push("/booking/category");
    }

    return (
        <div className='p-6 max-w-[1400px] mx-auto opacity-0 animate-fadeIn'>
            <div className='flex justify-between items-center mb-8'>
                <div className='flex items-center gap-3'>
                    <h4 className='font-extrabold text-2xl md:text-3xl bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent'>
                        {title}
                    </h4>
                    <Scissors className='w-5 h-5 text-primary animate-pulse' />
                </div>
                <Button
                    className='group flex items-center gap-2 text-sm transition-all duration-300'
                    variant="ghost"
                >
                    Explore more
                    <ArrowRight className='w-4 h-4 transition-transform duration-300 group-hover:translate-x-1' />
                </Button>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 '>
                {serviceList.map((service) => (
                    <Card
                        key={service.id}
                        className={cn(
                            "group relative overflow-hidden transition-all duration-300 hover:shadow-xl border-muted/20",
                            hoveredCard === service.id ? "scale-[1.02]" : ""
                        )}
                        onMouseEnter={() => setHoveredCard(service.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <CardContent className="p-0">
                            <div className="relative h-[300px] w-full overflow-hidden">
                                <Image
                                    src={service.imageUrl || ""}
                                    alt={service.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                            </div>
                        </CardContent>

                        <CardFooter className='flex flex-col p-8'>
                            <div className="flex flex-col gap-6 w-full">
                                <div>
                                    <h4 className='font-bold text-2xl text-primary mb-3 line-clamp-1'>
                                        {service.name}
                                    </h4>
                                    <p className='text-base text-muted-foreground line-clamp-2'>
                                        {service.description}
                                    </p>
                                </div>

                                <div className='flex items-center gap-6 text-base text-muted-foreground'>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-5 h-5" />
                                        <span>60 min</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <DollarSign className="w-5 h-5" />
                                        <span>${service.price}</span>
                                    </div>
                                </div>

                                <Button
                                    className="w-full bg-gradient-to-r from-primary/90 to-primary hover:opacity-90 transition-opacity py-6 text-lg"
                                    onClick={handleClickExplore}
                                >
                                    Book Now
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ServiceList;