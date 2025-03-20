import React from 'react'
import UserTable from './_components/user.table'
import { getAllUsers } from '@/actions/user'

const UserPage = async () => {
    const data = await getAllUsers();
    return (
        <div>
            <UserTable data={data || []}></UserTable>
        </div>
    )
}

export default UserPage
