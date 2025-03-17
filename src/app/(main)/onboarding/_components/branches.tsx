import { Card } from '@/components/ui/card'
import React from 'react'
import Image from 'next/image'
import type { Branch } from '@prisma/client'
import Link from 'next/link'
const Branches = ({
    branches
}: { branches: Branch[] }) => {
    return (
        <div className=' grid xs:grid-cols-2 xl:grid-cols-2 gap-10 '>
            {branches.map(branch => (
                <Link key={branch.id} href={"/booking"}>
                    <div
                        className='relative image-zoom'
                    >
                        <Image
                            src={branch.imageUrl}
                            width={700}
                            height={350}
                            alt="Dashboard Preview"
                            className="rounded-lg shadow-2xl border mx-auto"
                            priority
                        />
                        <div className='absolute top-[5%] left-[12%]'>
                            <p className='text-xl font-extrabold text-white'>{branch.address}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default Branches
