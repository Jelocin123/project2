import React from 'react'
import Header from './Header'
import Navbar from './NavBar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <>

            <Header />
            <Navbar />

            <main>
                <Outlet />
            </main>

            <Footer />


        </>
    )
}

export default Layout