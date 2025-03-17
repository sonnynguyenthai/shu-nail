import { checkUser } from '@/actions/user';
import NotFoundPage from '@/components/error/not.found';
import { currentUser } from '@clerk/nextjs/server';
import React from 'react'

const layout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const user = await checkUser();
    if (!user) return (<NotFoundPage />);
    return (
        <div className='mt-28'>
            {children}
        </div>
    )
}

export default layout
