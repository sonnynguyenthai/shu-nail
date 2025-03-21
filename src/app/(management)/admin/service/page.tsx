import { getAllServices } from '@/actions/service'
import React from 'react'
import ServiceTable from './_components/service.table';

const ServicePage = async () => {
    return (
        <div>
            <ServiceTable></ServiceTable>
        </div>
    )
}

export default ServicePage
