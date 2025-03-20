import React from 'react'
import CategoryList from './_components/category.list'

const CategoryPage = () => {
  return (
    <div className=''>
      <div className='text-center mb-12'>
        <h2 className='text-4xl md:text-5xl gradient-title font-bold mb-4'>
          Choose Your Styles
        </h2>
        <p className='text-lg text-muted-foreground'>
          Shu nails & beauty
        </p>
        <CategoryList />
      </div>
    </div>
  )
}

export default CategoryPage
