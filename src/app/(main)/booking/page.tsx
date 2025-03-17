
import React from 'react'
import { services } from '@/data/fakeData'
import Services from './_components/services'
import Counter from './_components/counter'
const BookingPage = () => {

    return (
        <div>
            <div>
                <h1 className="text-2xl text-center font-bold md:text-3xl lg:text-4xl xl:text-5xl gradient-title animate-gradient">
                    Premium Nail Services – Book Your Appointment Today!
                </h1>
                <div>
                    <Services title={"Best Seller"} services={services} />
                </div>
            </div>
            <div>
                <div>
                    <Services title={"Best of month"} services={services} />
                </div>
            </div>

        </div>
    )
}

export default BookingPage
