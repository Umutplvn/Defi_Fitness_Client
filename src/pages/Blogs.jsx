import React, { useEffect } from 'react'
import useDataCall from '../hooks/useDataCall'
import { useSelector } from 'react-redux'

const Blogs = () => {
  const {getBlogs}=useDataCall()
  const{blogs}=useSelector((state)=>state?.appData)
  useEffect(() => {
   getBlogs()
  }, [])
  
  return (
    <div>Blogs</div>
  )
}

export default Blogs