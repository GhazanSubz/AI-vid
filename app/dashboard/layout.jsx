"use client"
import React, { useState } from 'react'
import Header from './_components/Header'
import {VideoDataContext} from '../_context/videoDataContext'
const DashboardLayout = ({children}) => {
  const [videoData,setVideoData]=useState([]);
  return (
    
    <VideoDataContext.Provider value={{videoData,setVideoData}}>
    <div>
        <div>
        <Header/>
        {children}
        </div>
     
    </div>
    </VideoDataContext.Provider>
  )
}

export default DashboardLayout
