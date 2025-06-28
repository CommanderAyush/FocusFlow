import React from 'react'
import { Outlet } from 'react-router'
import NavBar from '../../Pages/NavBar/NavBar'
import EndFooter from '../../Pages/EndFooter/EndFooter'
function RootLayout() {
  return (
   <>
    <NavBar/>
    <Outlet/>
    <EndFooter/>
   </>
  )
}

export default RootLayout