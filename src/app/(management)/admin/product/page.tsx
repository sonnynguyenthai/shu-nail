import { getAllProducts } from '@/actions/product'
import React from 'react'
import ProductTable from './_components/product.table';

const ProductPage = async () => {
    const products = await getAllProducts();
    return (
        <div>
            <ProductTable data={products || []} />
        </div>
    )
}

export default ProductPage
