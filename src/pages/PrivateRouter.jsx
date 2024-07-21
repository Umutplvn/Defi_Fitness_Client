import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Index from './Index'

const PrivateRouter = () => {
    const {userId} =useSelector((state)=>state.auth)

    return (
    <div>
        {userId ? <Outlet/> : <Index/>}
    </div>
  )
}

export default PrivateRouter