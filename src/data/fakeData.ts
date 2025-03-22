import { Branch, Service } from "@prisma/client";

export const branches: Branch[] = [
    {
        id: "3df861de-bafa-4ac7-b4ff-207cd6870a87", // Fake UUID
        name: "ShuNails WaterGarden",
        address: "120-200 Rosamond Rd, Maribyrnong VIC 3032",
        phone: "+1 (123) 456-7890",
        imageUrl: "https://i.pinimg.com/originals/f9/5b/a6/f95ba60f32ab55cfd4c5c3b010fc8c39.jpg",
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "83002c65-43b5-4726-9dd1-b21f65ba7786",
        name: "ShuNails HighPoint",
        address: "shop T127/399 Melton Hwy, Taylors Lakes VIC 3038",
        phone: "+1 (987) 654-3210",
        imageUrl: "https://www.crestproperty.net.au/wp-content/uploads/2021/07/Watergardens-Town-Centre.jpg",
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    }

];
export const categories = [
    {
        id: "1a2b3c4d-5678-9101-1121-314151617181",
        name: "Nails Fullset",
        description: "A complete manicure service with options to customize your nails with various styles and designs.",
        serviceId: "6e8aeb7a-c7a7-4080-addb-07eee5c310b8", // Example service ID
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "2b3c4d5e-6789-1011-1213-415161718192",
        name: "Eyelash Extensions",
        description: "Enhance the length and volume of your lashes with professional eyelash extensions.",
        serviceId: "976677ed-e947-40b2-81c5-fab079e44f83", // Example service ID
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "3c4d5e6f-7890-1121-3141-516171819203",
        name: "Facial Treatments",
        description: "Revitalize your skin with rejuvenating facial treatments using premium products.",
        serviceId: "6e8aeb7a-c7a7-4080-addb-07eee5c310b8", // Example service ID
        createdAt: new Date(),
        updatedAt: new Date(),
    }
];

export const products = [
    {
        id: "f1e1d1c1-1234-5678-9101-112131415161",
        name: "Classic Hybrid Nails",
        description: "A hybrid nail set combining gel and acrylic for a durable and stylish finish. ",
        price: 45.99,
        promotionPrice: 39.99,
        imageUrl: "https://i.pinimg.com/736x/93/f7/61/93f7614d7c1ffc8857080a9e5d3645d0.jpg",
        categoryId: "1a2b3c4d-5678-9101-1121-314151617181", // Nails Fullset category ID
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "f2e2d2c2-2345-6789-1011-2131e41516172",
        name: "Gel Overlay Nails",
        description: "A gel overlay for a smooth and shiny finish, offering both beauty and protection for your nails.",
        price: 39.99,
        promotionPrice: 34.99,
        imageUrl: "https://i.pinimg.com/736x/3e/61/c1/3e61c1be2e78dfdbd543720f3e4b9134.jpg",
        categoryId: "2b3c4d5e-6789-1011-1213-415161718192", // Nails Fullset category ID
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "f3e3d3c3-3456-7890-1121-314151617183",
        name: "Acrylic Nails Full Set",
        description: "An acrylic nail full set for a flawless, long-lasting manicure with a wide range of styles to choose from.",
        price: 50.00,
        promotionPrice: 45.00,
        imageUrl: "https://i.pinimg.com/736x/8f/7b/c8/8f7bc8f56b3d1d56c45b10ad8b34bf5d.jpg",
        categoryId: "1a2b3c4d-5678-9101-1121-314151617181", // Nails Fullset category ID
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "f3e3d3c3-3456-7890-1121-31415q1617183",
        name: "Acrylic Nails Full Set",
        description: "An acrylic nail full set for a flawless, long-lasting manicure with a wide range of styles to choose from.",
        price: 50.00,
        promotionPrice: 45.00,
        imageUrl: "https://i.pinimg.com/736x/8f/7b/c8/8f7bc8f56b3d1d56c45b10ad8b34bf5d.jpg",
        categoryId: "2b3c4d5e-6789-1011-1213-415161718192", // Nails Fullset category ID
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "f3e3d3c3-3456-7890-1121-31415e161dsa7183",
        name: "Acrylic Nails Full Set",
        description: "An acrylic nail full set for a flawless, long-lasting manicure with a wide range of styles to choose from.",
        price: 50.00,
        promotionPrice: 45.00,
        imageUrl: "https://i.pinimg.com/736x/8f/7b/c8/8f7bc8f56b3d1d56c45b10ad8b34bf5d.jpg",
        categoryId: "1a2b3c4d-5678-9101-1121-314151617181", // Nails Fullset category ID
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "f3e3d3c3-3456-7890-1121-31415161dsad7183",
        name: "Acrylic Nails Full Set",
        description: "An acrylic nail full set for a flawless, long-lasting manicure with a wide range of styles to choose from.",
        price: 50.00,
        promotionPrice: 45.00,
        imageUrl: "https://i.pinimg.com/736x/8f/7b/c8/8f7bc8f56b3d1d56c45b10ad8b34bf5d.jpg",
        categoryId: "3c4d5e6f-7890-1121-3141-516171819203", // Nails Fullset category ID
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "f3e3d3c3-3456-7890-1121das-31415161w7183",
        name: "Acrylic Nails Full Set",
        description: "An acrylic nail full set for a flawless, long-lasting manicure with a wide range of styles to choose from.",
        price: 50.00,
        promotionPrice: 45.00,
        imageUrl: "https://i.pinimg.com/736x/8f/7b/c8/8f7bc8f56b3d1d56c45b10ad8b34bf5d.jpg",
        categoryId: "1a2b3c4d-5678-9101-1121-314151617181", // Nails Fullset category ID
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "f3e3d3c3-3456-7890-1121-3q1415161d7183",
        name: "Acrylic Nails Full Set",
        description: "An acrylic nail full set for a flawless, long-lasting manicure with a wide range of styles to choose from.",
        price: 50.00,
        promotionPrice: 45.00,
        imageUrl: "https://i.pinimg.com/736x/8f/7b/c8/8f7bc8f56b3d1d56c45b10ad8b34bf5d.jpg",
        categoryId: "1a2b3c4d-5678-9101-1121-314151617181", // Nails Fullset category ID
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "f3e3d3c3-3456-7890-1121-ddsa",
        name: "Acrylic Nails Full Set",
        description: "An acrylic nail full set for a flawless, long-lasting manicure with a wide range of styles to choose from.",
        price: 50.00,
        promotionPrice: 45.00,
        imageUrl: "https://i.pinimg.com/736x/8f/7b/c8/8f7bc8f56b3d1d56c45b10ad8b34bf5d.jpg",
        categoryId: "1a2b3c4d-5678-9101-1121-314151617181", // Nails Fullset category ID
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "f3e3d3c3-3456-7890-1121-3141516dsa1718e3",
        name: "Acrylic Nails Full Set",
        description: "An acrylic nail full set for a flawless, long-lasting manicure with a wide range of styles to choose from.",
        price: 50.00,
        promotionPrice: 45.00,
        imageUrl: "https://i.pinimg.com/736x/8f/7b/c8/8f7bc8f56b3d1d56c45b10ad8b34bf5d.jpg",
        categoryId: "1a2b3c4d-5678-9101-1121-314151617181", // Nails Fullset category ID
        createdAt: new Date(),
        updatedAt: new Date(),
    }
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