import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import NewsBar from '../newsbar/NewsBar'
import Breadcrumb from '../products/productdetailpage/BreadCrumb'

export default function Layout({children}) {
  return (
    <div>
        <NewsBar/>
        <Navbar/>
        <Breadcrumb/>
            <div className="main-content min-h-screen">
                {children}
            </div>
            <Footer/>
    </div>
  )
}
