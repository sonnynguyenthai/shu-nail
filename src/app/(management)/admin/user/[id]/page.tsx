import { getUserDetails } from "@/actions/user"
import UserDetails from "../_components/user.details";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const userDetails = await getUserDetails(id);
    return (<div className="p-8">
        {userDetails ? <UserDetails user={userDetails} /> : <p>User not found</p>}
    </div>)
}