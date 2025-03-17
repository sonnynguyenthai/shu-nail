'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const NotFoundPage = () => {
    const router = useRouter()

    const handleGoBack = () => {
        router.push('/')
    }

    return (
        <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600'>
            <Card className='max-w-md w-full p-6 bg-white shadow-xl rounded-lg'>
                <CardContent className='text-center'>
                    <h1 className='text-4xl font-extrabold text-primary mb-4'>
                        404 - Page Not Found
                    </h1>
                    <p className='text-lg text-muted-foreground mb-6'>
                        Oops! The page you're looking for doesn't exist.
                    </p>
                    <Button
                        className='w-full flex justify-center items-center'
                        onClick={handleGoBack}
                        variant="outline"
                    >
                        Go Back Home <ArrowLeft className="w-4 h-4" />
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default NotFoundPage