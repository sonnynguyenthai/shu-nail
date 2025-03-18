import { Branch, Service } from "@prisma/client";

export const branches: Branch[] = [
    {
        id: "1a2b3c4d-5678-9101-1121-314151617181", // Fake UUID
        name: "ShuNails WaterGarden",
        address: "120-200 Rosamond Rd, Maribyrnong VIC 3032",
        phone: "+1 (123) 456-7890",
        imageUrl: "https://i.pinimg.com/originals/f9/5b/a6/f95ba60f32ab55cfd4c5c3b010fc8c39.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "2b3c4d5e-6789-0123-1415-161718192021",
        name: "ShuNails HighPoint",
        address: "shop T127/399 Melton Hwy, Taylors Lakes VIC 3038",
        phone: "+1 (987) 654-3210",
        imageUrl: "https://www.crestproperty.net.au/wp-content/uploads/2021/07/Watergardens-Town-Centre.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
    }

];
export const products = [
    {
        id: "1a2b3c4d-1234-5678-9101-abcdefabcdef",
        name: "Classic Manicure",
        description: "A simple yet elegant manicure with nail shaping and cuticle care.",
        price: 20.0,
        imageUrl: "https://example.com/classic-manicure.jpg",
        branchId: "branch-001",
        bookings: [],
        reviews: [],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "2b3c4d5e-2234-5678-9101-bcdefabcdefa",
        name: "Gel Manicure",
        description: "Long-lasting gel polish with a glossy finish.",
        price: 35.0,
        imageUrl: "https://example.com/gel-manicure.jpg",
        branchId: "branch-002",
        bookings: [],
        reviews: [],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "3c4d5e6f-3234-5678-9101-cdefabcdefab",
        name: "Acrylic Nails",
        description: "Durable acrylic nail extensions with a natural look.",
        price: 50.0,
        imageUrl: "https://example.com/acrylic-nails.jpg",
        branchId: "branch-003",
        bookings: [],
        reviews: [],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "4d5e6f7g-4234-5678-9101-defabcdefabc",
        name: "French Tips",
        description: "Classic French manicure for a timeless look.",
        price: 30.0,
        imageUrl: "https://example.com/french-tips.jpg",
        branchId: "branch-004",
        bookings: [],
        reviews: [],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "5e6f7g8h-5234-5678-9101-efabcdefabcd",
        name: "Spa Pedicure",
        description: "A relaxing pedicure with exfoliation and moisturizing treatment.",
        price: 40.0,
        imageUrl: "https://example.com/spa-pedicure.jpg",
        branchId: "branch-005",
        bookings: [],
        reviews: [],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "6f7g8h9i-6234-5678-9101-fabcdefabcde",
        name: "Nail Art",
        description: "Custom hand-painted nail designs for a unique style.",
        price: 45.0,
        imageUrl: "https://example.com/nail-art.jpg",
        branchId: "branch-006",
        bookings: [],
        reviews: [],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

export const services = [
    {
        "id": "6e8aeb7a-c7a7-4080-addb-07eee5c310b8",
        "name": "Nail Art Deluxe",
        "description": "Our Nail Art Deluxe service offers a luxurious manicure experience, perfect for those who love beautifully designed nails. We use high-quality gel polish and offer a variety of intricate nail art designs, including floral patterns, glitter effects, and custom hand-painted details. Our skilled technicians ensure that your nails look flawless and last longer. Whether you prefer a classic French tip or a bold statement design, we tailor our services to your preferences. This service includes cuticle care, shaping, and a relaxing hand massage for the ultimate pampering session.",
        "price": 29.99,
        "imageUrl": "https://i.pinimg.com/736x/93/f7/61/93f7614d7c1ffc8857080a9e5d3645d0.jpg",
        "categories": [],
        "branchId": "1a2b3c4d-5678-9101-1121-314151617181",
        createdAt: new Date('2023-01-01T00:00:00Z'),
        updatedAt: new Date('2023-01-01T00:00:00Z')
    },
    {
        "id": "976677ed-e947-40b2-81c5-fab079e44f83",
        "name": "Eyelash Extensions",
        "description": "Enhance your natural beauty with our professional Eyelash Extensions service. Our experienced lash artists carefully apply individual lash extensions to create a fuller, longer, and more voluminous look. We offer a range of styles, from a natural everyday enhancement to a dramatic, glamorous effect. Using high-quality, lightweight lashes and a gentle adhesive, our extensions are comfortable to wear and last for weeks with proper care. The session includes a consultation to determine your preferred length and style, ensuring a customized result that complements your eye shape perfectly.",
        "price": 49.99,
        "imageUrl": "https://images.pexels.com/photos/4029925/pexels-photo-4029925.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "categories": [],
        "branchId": "1a2b3c4d-5678-9101-1121-314151617181",
        createdAt: new Date('2023-01-01T00:00:00Z'),
        updatedAt: new Date('2023-01-01T00:00:00Z')
    },
    {
        "id": "z9y8x7w6-v5u4-3210wxyz-987654321abc",
        "name": "Eyelash Extensions",
        "description": "Enhance your natural beauty with our professional Eyelash Extensions service. Our experienced lash artists carefully apply individual lash extensions to create a fuller, longer, and more voluminous look. We offer a range of styles, from a natural everyday enhancement to a dramatic, glamorous effect. Using high-quality, lightweight lashes and a gentle adhesive, our extensions are comfortable to wear and last for weeks with proper care. The session includes a consultation to determine your preferred length and style, ensuring a customized result that complements your eye shape perfectly.",
        "price": 49.99,
        "imageUrl": "https://images.pexels.com/photos/4029925/pexels-photo-4029925.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "categories": [],
        "branchId": "1a2b3c4d-5678-9101-1121-314151617181",
        createdAt: new Date('2023-01-01T00:00:00Z'),
        updatedAt: new Date('2023-01-01T00:00:00Z')
    }
]
export const serviceBranches = [
    { serviceId: "6e8aeb7a-c7a7-4080-addb-07eee5c310b8", branchId: "3df861de-bafa-4ac7-b4ff-207cd6870a87" },
    { serviceId: "976677ed-e947-40b2-81c5-fab079e44f83", branchId: "83002c65-43b5-4726-9dd1-b21f65ba7786" },
    { serviceId: "976677ed-e947-40b2-81c5-fab079e44f83", branchId: "3df861de-bafa-4ac7-b4ff-207cd6870a87" },
    { serviceId: "6e8aeb7a-c7a7-4080-addb-07eee5c310b8", branchId: "83002c65-43b5-4726-9dd1-b21f65ba7786" }
];