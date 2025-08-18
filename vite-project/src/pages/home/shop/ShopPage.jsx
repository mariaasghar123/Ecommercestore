import React from "react";
import { CarouselCustomNavigation } from "../Carousel";
import AllProducts from "../../../components/products/AllProducts";

export default function ShopPage({ favorites, toggleFavorite }) {
  return (
    <div className="min-h-screen px-2 md:px-8 lg:px-16 py-8">
      {/* Carousel and AllProducts are assumed to have their own responsive layouts. */}
      <CarouselCustomNavigation className="w-full" />
      <AllProducts favorites={favorites} toggleFavorite={toggleFavorite} />
    </div>
  );
}
