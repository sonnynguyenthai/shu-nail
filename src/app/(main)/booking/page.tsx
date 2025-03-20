
import React from 'react'
import ServiceList from './_components/service.list'
const BookingPage = () => {

    return (

        <div>
            <div className='text-center mb-12'>
                <h2 className='text-4xl md:text-5xl gradient-title font-bold mb-4'>
                    Premium Services
                </h2>
                <p className='text-lg text-muted-foreground'>
                    Book Your Appointment Today!
                </p>

                <ServiceList title={"Our Services"} services={[]} />
            </div>
        </div>

    )
}

export default BookingPage
