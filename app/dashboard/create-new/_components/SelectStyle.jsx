"use client"
import Image from 'next/image'
import React, { useState } from 'react'

const SelectStyle = ({onUserSelect}) => {
    const styleOptions = [
        {
            name:'Comic',
            image:'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29taWN8ZW58MHx8MHx8fDA%3D'
        },
        {
            name:'Cartoon',
            image:'https://images.unsplash.com/photo-1515041219749-89347f83291a?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FydG9vbnxlbnwwfHwwfHx8MA%3D%3D'
        },
        {
            name:'WaterColor',
            image:'https://images.unsplash.com/photo-1611149916119-c6c16eb89f89?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8V2F0ZXJDb2xvcnxlbnwwfHwwfHx8MA%3D%3D'
        },
        {
            name:'Cyberpunk',
            image:'https://images.unsplash.com/photo-1533972751724-9135a8410a4c?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y3liZXJwdW5rfGVufDB8fDB8fHww'
        }
    ]
    const [selectedOption,setSelectedOption]=useState();
  return (
    <div className='mt-7'>
      <h2 className='font-bold text-2xl'>Content</h2>
      <p className='text-gray-500'>Select your story's style</p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-3'>
        {styleOptions.map((item,index)=>(
            <div key={index} className={`relative hover:scale-105 transition-all cursor-pointer ${selectedOption==item.name&&'border-4 border-purple-700'}`}>
                <Image src={item.image} width={100} height={100} className='h-40 object-cover rounded-lg w-full' onClick={()=>{
                    setSelectedOption(item.name)
                    onUserSelect('imageStyle',item.name)
                    }}/>
                <h2 className='absolute p-1 bg-black bottom-0 w-full text-center'>{item.name}</h2>
            </div>
        ))}
      </div>
    </div>
  )
}

export default SelectStyle
