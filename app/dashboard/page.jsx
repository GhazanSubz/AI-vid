import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function Dashboard() {
  return (
    <div className='flex justify-between items-center'>
      <h2 className='font-bold text-2xl text-primary'>Dashboard</h2>
      <Link href={'/dashboard/create-new'}>
      <Button>+ Create New</Button>
      </Link>
    </div>
  )
}

export default Dashboard
