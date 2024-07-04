import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import Topbar from './components/topbar'
import { useAppSelector } from './redux/hooks'
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard'
import UserDashboard from './Pages/UserDashboard/UserDashboard'

function Layout() {
    const [role, setRole]=useState('');
    const userRole = useAppSelector((state) => state.auth.role);

    useEffect(() => {
        if (userRole) {
            setRole(userRole);
        }
    }, []);

  return (
    <div className='flex flex-row overflow-hidden'>
        <div className='w-1/5 bg-darkGrey'><Sidebar/></div>
        <div className='flex flex-col overflow-hidden'>
            <div className='h-1/5 bg-MediumGrey overflow-hidden'>
                <Topbar/>
            </div>
            <div className='bg-lightGrey h-screen w-screen overflow-hidden'>
                {role && role=="Admin"? <AdminDashboard/>: role=="User"? <UserDashboard/>
                : <p>Please Sign In</p>}
            </div>
        </div>
    </div>
  )
}

export default Layout