import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import Topbar from './components/topbar'
import { Outlet } from 'react-router-dom'

function Layout() {

  return (
    <div className='flex flex-row overflow-hidden'>
    <div className='w-1/5 bg-darkGrey'><Sidebar /></div>
    <div className='flex flex-col overflow-hidden'>
        <div className='h-1/5 bg-MediumGrey overflow-hidden'>
            <Topbar />
        </div>
        <div className='bg-lightGrey h-screen w-screen overflow-hidden'>
            <Outlet/>
        </div>
    </div>
</div>
  )
}

export default Layout