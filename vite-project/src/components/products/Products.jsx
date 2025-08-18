import React from "react";
import Layout from "../layout/Layout";
import AllProducts from "./AllProducts";
export default function Products({ favorites, toggleFavorite }) {
  return <AllProducts favorites={favorites} toggleFavorite={toggleFavorite} />;
}
