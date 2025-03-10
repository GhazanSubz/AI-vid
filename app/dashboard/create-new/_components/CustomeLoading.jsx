import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import Image from 'next/image'

const CustomeLoading = ({loading}) => {
  return (
    <AlertDialog open={loading}>
    
    <AlertDialogContent>
      <div className='flex flex-col items-center my-10 justify-center'>
        <Image src={'/loading.gif'} width={100} height={100} alt=''/>
        <h2>Generating your video...</h2>
      </div>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default CustomeLoading
