import React from 'react'
import NavBar from '../NavBar/NavBar'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

const MainDashBoard = () => {
  return (
    <div className='max-w-full h-auto overflow-x-hidden'>
        <NavBar/>
        <div className='flex mt-14 md:mt-14 lg:mt-32 xl:mt-32'>
        <Sidebar/>
        <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default MainDashBoard