'use client'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { categories, products } from '@/data/fakeData'
import { Category, Product } from '@prisma/client'
const CategoryList = () => {
    const categoriesHasProducts = categories.map(category => {
        const productsFilter = products.filter(product => product.categoryId === category.id)
        return { ...category, products: productsFilter }
    })

    return (
        <div className='w-full'>
            {categoriesHasProducts.map(category => (
                <div key={category.id} className='w-full p-10'>
                    <h1 className="text-xl mb-4 font-bold text-gray-800  gradient-title">
                        {category.name}
                    </h1>
                    <Carousel
                        opts={{
                            align: "center",
                        }}
                        className="min-w-xs  relative"
                    >
                        <CarouselContent className="">
                            {category?.products.map((product) => (
                                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/4 2xl:basis-1/6">
                                    <div className="p-1 ">
                                        <Card className="min-w-s shadow-none min-h-[400px] justify-between">
                                            <CardContent className=" w-full text-[15px] h-[200px] text-muted-foreground">
                                                <Image
                                                    src={'/bannerLanding.png'}
                                                    alt="Shu nails Logo"
                                                    width={300}
                                                    height={400}
                                                    className="h-12 py-1 h-full w-full rounded-xl"
                                                />
                                                <div className=''>
                                                    <h4 className='text-lg xl:text-xl text-primary/80 text-center font-extrabold mb-2'>{product.name}</h4>
                                                    {/* <div className="mt-5 w-full aspect-video bg-muted rounded-xl" /> */}
                                                    <div className=' max-h-[70px] text-xs text-center text-muted-foreground/50'>
                                                        {product.description.split(" ").length > 20
                                                            ? product.description.split(" ").slice(0, 20).join(" ") + "..."
                                                            : product.description}
                                                    </div>
                                                </div>
                                            </CardContent>
                                            <CardFooter className='justify-between pt-2 flex-wrap-reverse items-center'>
                                                <Button className="h-7" variant="link">
                                                    <p className='text-xs gradient-title' >View details</p>
                                                </Button>
                                                <Button className="gradient-background h-7 w-24 hover:animate-bounce" >
                                                    Add
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent >
                        <>
                            {category?.products.length > 4 && (
                                <>
                                    <CarouselPrevious className='absolute top-[50%] left-[1%]' />
                                    <CarouselNext className='absolute top-[50%] right-[1%]' />
                                </>)}
                        </>
                    </Carousel>
                </div>
            ))}
        </div>
    )
}

export default CategoryList
