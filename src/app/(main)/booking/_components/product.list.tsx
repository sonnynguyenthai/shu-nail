'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Service } from '@prisma/client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { ChartNoAxesCombined } from 'lucide-react'
const ProductList = ({ title = "", services }: { title: string, services: Service[] }) => {
    return (
        <div className='p-6'>
            <div className='flex justify-between items-center'>
                <div className='flex mb-4 ml-2 justify-start'>
                    <h4 className='font-extrabold gradient-title text-lg md:text-2xl'>
                        {title}
                    </h4>
                    <ChartNoAxesCombined className='w-4 h-4 text-gradient' />
                </div>
                <Button className='flex text-xs text-primary/70 hover:animate-bounce' variant={"link"}>
                    Explore more...
                </Button>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6'>
                {services.map((service) => (
                    <Card key={service.id} className="max-w-xs shadow-none h-[400px] justify-between">
                        <CardContent className="text-[15px] text-muted-foreground">
                            <Image
                                src={'/bannerLanding.png'}
                                alt="Shu nails Logo"
                                className="h-12 py-1 h-full w-full rounded-xl"
                            />
                            <div>
                                <h4 className='text-xl text-primary/80 text-center font-extrabold mb-2'>Lorem ipsum</h4>
                                {/* <div className="mt-5 w-full aspect-video bg-muted rounded-xl" /> */}
                                <p className='text-xs text-center text-muted-foreground/50'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet quas minima amet quis deleniti enim.
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter className='justify-center flex-wrap-reverse items-center'>
                            <Button className="h-7" variant="link">
                                <p className='text-xs gradient-title' >View details</p>
                            </Button>
                            <Button className="gradient-background h-7 w-24 hover:animate-bounce" >
                                Add
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default ProductList
