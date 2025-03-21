import { getUserDetails } from "@/actions/user"
import ServiceDetails from "../_components/service.details";
import { getServiceById } from "@/actions/service";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const serviceDetails = await getServiceById(id);
    return (<div className="p-8">
        {serviceDetails ? <ServiceDetails service={serviceDetails} /> : <p>User not found</p>}
    </div>)
}
