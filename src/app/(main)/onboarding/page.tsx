import React from 'react';
import Branches from './_components/branches';
import { MapPinHouse } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { callFetchAllBranches } from '@/actions/branch';
const OnBoardingPage = async () => {
    const branches = await callFetchAllBranches();
    return (
        <main>
            <div className="mt-25 mb-4 text-center">
                <div className="my-10">
                    <Button variant="ghost" size={"icon"} className='animate-bounce' disabled>
                        <MapPinHouse className="inline-block ml-2 text-xl w-20 h-20 text-primary" />
                    </Button>
                    <h1 className="text-3xl font-bold text-gray-800  gradient-title">
                        Choose Your Branch of Shu Nails and Beauty
                    </h1>
                </div>

                <Branches branches={branches} />
            </div>
        </main >
    );
};
export default OnBoardingPage;