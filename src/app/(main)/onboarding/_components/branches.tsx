"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Branch } from '@prisma/client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setBranchBooking } from '@/redux/slices/branch.slice'
import { useRouter } from 'next/navigation'

const Branches = ({ branches }: { branches: Branch[] }) => {
    const dispatch = useAppDispatch();
    const router = useRouter()
    const handleSelectBranch = (branch: Branch) => {
        const selectedBranch = { ...branch, createdAt: branch.createdAt.toISOString(), updatedAt: branch.updatedAt.toISOString() }
        dispatch(setBranchBooking(selectedBranch));
        const branchIdSession = sessionStorage.getItem("branchId")
        if (branchIdSession) {
            sessionStorage.removeItem("branchId")
        }
        sessionStorage.setItem("branchId", selectedBranch?.id)
        router.push("/booking")
    }
    return (
        <div className="grid xs:grid-cols-2 xl:grid-cols-2 gap-10 opacity-0 animate-fadeIn">
            {branches.map((branch) => (
                <div key={branch.id} className="relative image-zoom" onClick={() => handleSelectBranch(branch)}>
                    <Image
                        src={branch.imageUrl}
                        width={700}
                        height={350}
                        alt="Dashboard Preview"
                        className="rounded-lg shadow-2xl border mx-auto"
                        priority
                    />
                    <div className="absolute top-[2%] left-1/2 transform -translate-x-1/2 text-xl font-extrabold text-white text-center w-full">
                        {branch.address}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Branches



