'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const HeroSection = () => {
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const imageElement = imageRef.current!;

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const scrollThreshold = 100;

            if (scrollPosition > scrollThreshold) {
                imageElement.classList.add('scrolled');
            } else {
                imageElement.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className=" w-full pt-36 md:pt-48 pb-10">
            <div className="space-y-6 text-center">
                <div className="space-y-6 mx-auto">
                    <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title animate-gradient pb-2">
                        Welcome to Shu Nails
                        <br />
                        & Beauty Shop
                    </h1>
                    <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                        Indulge in luxurious nail care, beauty services, and relaxation.
                        Experience top-tier treatments in a serene environment.
                    </p>
                </div>
                <div className="flex justify-center space-x-4">
                    <Link href="/onboarding">
                        <Button size="lg" className="px-8 gradient-background animate-bounce">
                            Book an Appointment
                        </Button>
                    </Link>
                    <Link href="https://www.youtube.com/roadsidecoder">
                        <Button
                            size="lg"
                            className="border-gradient-to-r from-purple-600 to-pink-500 text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500"
                        >
                            Visit Our Instagram
                        </Button>
                    </Link>
                </div>
                <div className="hero-image-wrapper mt-5 md:mt-0">
                    <div ref={imageRef} className="hero-image">
                        <Image
                            src="/bannerLanding.png"
                            width={1200}
                            height={800}
                            alt="Dashboard Preview"
                            className="rounded-lg shadow-2xl border mx-auto"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;