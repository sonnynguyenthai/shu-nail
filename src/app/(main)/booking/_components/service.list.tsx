'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Scissors } from 'lucide-react'
import { Service } from '@prisma/client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useRouter } from 'next/navigation'
import { fetchServices } from '@/redux/slices/services.slice'
const ServiceList = ({ title = "", services = [] }: { title: string, services: Service[] }) => {
    const [serviceList, setServiceList] = useState<Service[]>(services)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const { services: storeServices, isLoading } = useAppSelector(state => state.service)
    const selectedBranch = useAppSelector(state => state.branch.selectedBranch);
    useEffect(() => {
        if (selectedBranch == null) {
            const branchIdSession = sessionStorage.getItem("branchId")
            if (branchIdSession) {
                dispatch(fetchServices(branchIdSession));
            }
        }
    }, [selectedBranch])
    const selectedBranchId = selectedBranch?.id;
    useEffect(() => {
        if (selectedBranchId) {
            dispatch(fetchServices(selectedBranchId));
        }
        if (storeServices && !isLoading) {
            setServiceList(storeServices);
        }
    }, [dispatch, selectedBranchId, isLoading])

    function handleClickExplore() {
        router.push("/booking/category")
    }

    return (
        <div className='p-6'>
            <div className='flex justify-between items-center'>
                <div className='flex mb-4 ml-2 justify-start'>
                    <h4 className='font-extrabold gradient-title text-lg md:text-2xl'>
                        {title}
                    </h4>
                    <Scissors className='w-4 h-4' />
                </div>
                <Button className='flex text-xs text-primary/70 hover:animate-bounce' variant={"link"}>
                    Explore more...
                </Button>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6'>
                {serviceList.map((service) => (
                    <Card key={service.id} className="max-w-2xl xl:flex-row shadow-none max-h-xl justify-between">
                        <CardContent className="text-[15px] xl:pr-0 text-muted-foreground">
                            <Image
                                src={service.imageUrl || ""}
                                alt="Shu nails Logo"
                                width={300}
                                height={200}
                                className="h-12 py-1 h-full w-full rounded-xl"
                            />
                        </CardContent>
                        <CardFooter className='justify-center xl:items-end xl:pl-0 w-full xl:w-[400]'>
                            <div className="flex h-full w-full flex-col justify-between">
                                <div className='flex justify-center'>
                                    <div >
                                        <h4 className='text-center font-bold text-2xl xl:text-3xl text-primary/70 mb-2'>
                                            {service.name}
                                        </h4>
                                        <div className='flex justify-start items-center'>
                                            <p className='text-xs xl:text-[16px] text-center'>
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-between items-center mt-4'>
                                    <p className='text-xs xl:text-lg underline'>From only ${service.price}</p>
                                    <Button className="gradient-background hover:animate-bounce w-30" onClick={() => handleClickExplore()} >
                                        Explore
                                    </Button>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default ServiceList
