
import React from 'react'
import ServiceList from './_components/service.list'
const BookingPage = () => {

    return (

        <div>
            <h1 className="text-2xl text-center font-bold md:text-3xl lg:text-4xl xl:text-5xl gradient-title animate-gradient">
                Premium Services – Book Your Appointment Today!
            </h1>
            <div>
                <ServiceList title={"Our Services"} services={[]} />
            </div>
        </div>

    )
}

export default BookingPage
