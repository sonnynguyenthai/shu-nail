'use client'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel'
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { categories, products } from '@/data/fakeData'
import { ShoppingCart, Eye, ChevronRight, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

const CategoryList = () => {
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    const categoriesHasProducts = categories.map(category => {
        const productsFilter = products.filter(product => product.categoryId === category.id)
        return { ...category, products: productsFilter }
    })

    return (
        <div className='w-full space-y-16 py-12'>
            {categoriesHasProducts.map((category, index) => (
                <div
                    key={category.id}
                    className="w-full px-4 md:px-8 lg:px-12 opacity-0 animate-fadeIn"
                    style={{ animationDelay: `${index * 0.2}s` }}
                >
                    <div className="flex items-center justify-between mb-10">
                        <div className="space-y-2">
                            <h1 className="text-2xl md:text-3xl font-bold category-title">
                                {category.name}
                            </h1>
                        </div>
                        <Button
                            variant="ghost"
                            className="text-primary/80 hover:text-primary group rounded-xl"
                        >
                            View All
                            <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </div>

                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="relative"
                    >
                        <CarouselContent className="-ml-2 md:-ml-4">
                            {category?.products.map((product) => (
                                <CarouselItem
                                    key={product.id}
                                    className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                                >
                                    <Card
                                        className={cn(
                                            "group relative overflow-hidden transition-all duration-500 hover:shadow-xl border-muted/20 rounded-xl backdrop-blur-sm",
                                            hoveredCard === product.id ? "scale-[1.02] shadow-lg" : ""
                                        )}
                                        onMouseEnter={() => setHoveredCard(product.id)}
                                        onMouseLeave={() => setHoveredCard(null)}
                                    >
                                        <CardContent className="p-0">
                                            <div className="relative aspect-square overflow-hidden rounded-t-xl">
                                                <div className="absolute top-3 right-3 z-10">
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                                                    >
                                                        <Star className="w-4 h-4 text-yellow-500" />
                                                    </Button>
                                                </div>
                                                <Image
                                                    src={'/bannerLanding.png'}
                                                    alt={product.name}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                                    priority
                                                />
                                            </div>
                                            <div className='p-5 space-y-3'>
                                                <h4 className='text-lg font-semibold text-primary/90 line-clamp-1 group-hover:text-primary transition-colors'>
                                                    {product.name}
                                                </h4>
                                                <p className='text-sm text-muted-foreground/80 line-clamp-2'>
                                                    {product.description}
                                                </p>
                                            </div>
                                        </CardContent>
                                        <CardFooter
                                            className='px-5 pb-5 pt-0 flex justify-between items-center gap-3'
                                        >
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="flex-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl group"
                                            >
                                                <Eye className={`w-4 h-4 mr-2 transition-transform duration-300 ${hoveredCard === product.id ? 'scale-110' : ''
                                                    }`} />
                                                Details
                                            </Button>
                                            <Button
                                                className="flex-1 bg-gradient-to-r from-primary/90 to-primary/70 hover:from-primary hover:to-primary/80 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg rounded-xl"
                                                size="sm"
                                            >
                                                <ShoppingCart className={`w-4 h-4 mr-2 transition-transform duration-300 ${hoveredCard === product.id ? 'scale-110' : ''
                                                    }`} />
                                                Add
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        {category?.products.length > 3 && (
                            <>
                                <CarouselPrevious className="absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700" />
                                <CarouselNext className="absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700" />
                            </>
                        )}
                    </Carousel>
                </div>
            ))}
        </div>
    )
}

export default CategoryList