import React from 'react'
import { Button } from "@/components/ui/button"
import Link from "next/link"

const Header = () => {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-glass sticky top-0 z-50">
      <Link className="flex items-center justify-center" href="/">
        <span className="font-bold text-xl text-accent">Progen</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link className="text-zinc-300 hover:text-accent transition-colors" href="/">
          Home
        </Link>
        <Link className="text-zinc-300 hover:text-accent transition-colors" href="/dashboard">
          Dashboard
        </Link>
        <Link className="text-zinc-300 hover:text-accent transition-colors" href="/playground">
          Playground
        </Link>
        <Link className="text-zinc-300 hover:text-accent transition-colors" href="/gallery">
          Gallery
        </Link>
        <Link className="text-zinc-300 hover:text-accent transition-colors" href="/generate">
          Generate
        </Link>
      </nav>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" asChild>
          <Link href="/pricing" className="text-zinc-300 hover:text-accent transition-colors">Pricing</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="https://discord.gg" target="_blank" className="text-zinc-300 hover:text-accent transition-colors">Discord</Link>
        </Button>
        <Button className="bg-accent text-black font-medium hover:bg-accent/90">Sign Up</Button>
      </div>
    </header>
  )
}

export default Header
