"use client"
import React, { useState } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle'
import SelectDuration from './_components/SelectDuration'
import { Button } from '@/components/ui/button'
import axios from 'axios'

function CreateNew() {
    const [formData,setFormData]=useState()
    const onHandleInputChange=(fieldName,fieldValue)=>{
           console.log(fieldName,fieldValue)
           setFormData(prev=>({
            ...prev,
            [fieldName]:fieldValue
           }))
    }
    
    const onCreateClickHandler=()=>{
       GetVideoScript();
    }

    const GetVideoScript=async()=>{
      const prompt= 'Write a script to generate '+formData.duration+' video on topic: '+formData.topic+' along with AI image prompt in '+formData.imageStyle+' format for each scene and give me result in JSON format with imagePrompt and ContextText as field, No Plain text'
      console.log(prompt)
      const result=await axios.post('/api/get-video-script',{
        prompt:prompt
      }).then(resp=>{
        console.log(resp.data);
      })
    }
  return (
    <div className='md:px-20'>
      <h2 className='font-bold text-4xl text-primary text-center'>Create New</h2>
      <div className='mt-10 shadow-md p-10'>
        <SelectTopic onUserSelect={onHandleInputChange}/>
        <SelectStyle onUserSelect={onHandleInputChange}/>
        <SelectDuration onUserSelect={onHandleInputChange}/>

        <Button className="mt-10 w-full" onClick={onCreateClickHandler}>Create Story</Button>
      </div>
    </div>
  )
}

export default CreateNew
