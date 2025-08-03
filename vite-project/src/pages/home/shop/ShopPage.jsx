import React from 'react'
import { CarouselCustomNavigation } from '../Carousel'
import AllProducts from '../../../components/products/AllProducts'

export default function ShopPage({ favorites, toggleFavorite }) {
  return (
    <div>
      <CarouselCustomNavigation/>
      <AllProducts favorites={favorites} toggleFavorite={toggleFavorite}/>
    </div>
  )
}
