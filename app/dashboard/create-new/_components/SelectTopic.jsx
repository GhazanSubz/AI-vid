"use client"
import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'

function SelectTopic({onUserSelect}) {
    const options = ['Custom Prompt','Horror','Fantasy','Educational']
    const [selectedOption, setSelectedOption]=useState()
  return (
    <div>
      <h2 className='font-bold text-2xl'>Content</h2>
      <p className='text-gray-500'>What is the topic of your story</p>

      <Select onValueChange={(value)=>{
        setSelectedOption(value)
        value!='Custom Prompt'&&onUserSelect('topic',value)
        }}>
       <SelectTrigger className="w-full mt-2 p-6 text-lg">
            <SelectValue placeholder="Content Type" />
        </SelectTrigger>
        <SelectContent>
            {options.map((item,index)=>(
                  <SelectItem key={index} value={item}>{item}</SelectItem>
            ))}
        
        </SelectContent>
        </Select>

        {selectedOption=='Custom Prompt' && 
           <Textarea className="mt-3"
            onChange={(e)=>onUserSelect('topic',e.target.value)}
            placeholder='Write prompt on which you wnat to generate story'/>
           
        }


        
   
    </div>
  )
}

export default SelectTopic
