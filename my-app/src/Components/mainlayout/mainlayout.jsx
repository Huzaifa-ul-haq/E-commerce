import react from 'react'

import { NavbarComponent } from '../Navbar/navbar'
import { Outlet } from 'react-router'




export default function Mainlayout() {
    return (
        <>
            <NavbarComponent />

            <Outlet

            />




        </>



    )
}