import React from 'react'
import Layout from '../../components/layout/Layout'
import { CarouselCustomNavigation } from './Carousel'
import FeatureList from './Features'
import FeatureBanner from './FeatureBanner'
import NewArrivals from '../../components/products/NewProducts'
import Cards from './Cards'
import FeaturedProducts from '../../components/products/FeaturedProducts'
import NewCard from './NewCard'
import BestSeller from '../../components/products/BestSeller'
import Banner from './Banner'
import PopularCompanies from './PopularCompanies'
export default function HomePage() {
  return (
    <div>
      
        <CarouselCustomNavigation/>
        <FeatureList/>
        <FeatureBanner/>
        <NewArrivals/>
        <Cards/>
        <FeaturedProducts/>
        <NewCard/>
        <BestSeller/>
        <Banner/>
        <PopularCompanies/>
    </div>
  )
}
