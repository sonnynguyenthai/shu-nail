import { Branch } from "@prisma/client";

export const branches: Branch[] = [
    {
        id: "1a2b3c4d-5678-9101-1121-314151617181", // Fake UUID
        name: "ShuNails",
        address: "120-200 Rosamond Rd, Maribyrnong VIC 3032",
        phone: "+1 (123) 456-7890",
        imageUrl: "https://i.pinimg.com/originals/f9/5b/a6/f95ba60f32ab55cfd4c5c3b010fc8c39.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "2b3c4d5e-6789-0123-1415-161718192021",
        name: "ShuNails",
        address: "shop T127/399 Melton Hwy, Taylors Lakes VIC 3038",
        phone: "+1 (987) 654-3210",
        imageUrl: "https://www.crestproperty.net.au/wp-content/uploads/2021/07/Watergardens-Town-Centre.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
    }

];