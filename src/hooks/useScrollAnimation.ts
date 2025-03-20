'use client'

import { useEffect, useRef } from 'react'

export function useScrollAnimation() {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in')
                    }
                })
            },
            {
                threshold: 0.1,
                rootMargin: '50px',
            }
        )

        const elements = document.querySelectorAll('.animate-on-scroll')
        elements.forEach((el) => observer.observe(el))

        return () => observer.disconnect()
    }, [])

    return ref
}