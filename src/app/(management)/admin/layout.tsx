import { checkUser } from '@/actions/user';
import NotFoundPage from '@/components/error/not.found';
import React from 'react'

const AdminLayout = async ({
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

export default AdminLayout
