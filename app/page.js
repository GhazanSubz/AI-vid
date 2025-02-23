"use client"
import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs";


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-800">
    {/* Header */}
    <header className="bg-gray-800">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <h1 className="text-xl font-bold text-gray-200">AI Video Gen</h1>
        <nav className="space-x-4">
          <a href="#" className="text-gray-200 hover:text-gray-900">Home</a>
          <a href="#" className="text-gray-200 hover:text-gray-900">Gallery</a>
          <a href="/dashboard" className="text-gray-200 hover:text-gray-900">Dashboard</a>
          <a href="#" className="text-gray-200 hover:text-gray-900">Train</a>
          <a href="#" className="text-gray-200 hover:text-gray-900">Pricing</a>
        </nav>
        <UserButton/>
      </div>
    </header>

    {/* Hero Section */}
    <main className="bg-gray-800">
      <section className="container mx-auto text-center py-16 px-6">
        <h2 className="text-3xl font-bold text-gray-200">
          The easiest way to generate with AI
        </h2>
        <p className="text-gray-200 mt-4">Public access for Progen</p>
      </section>

      {/* Flux Section */}
      <div className=" bg-gray-800 flex items-center justify-center">
      {/* Flux Section */}
      <section className="relative bg-black text-white rounded-lg overflow-hidden shadow-lg  w-full">
        {/* Background with image tiles */}
        <div className="absolute inset-0 grid grid-cols-3 gap-1">
          <img
            src="/Citylights.jpg" // Replace with your image paths
            alt=""
            className="w-full h-full object-cover"
          />
          <img
            src="/front3.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <img
            src="/front2.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          
        </div>

        {/* Overlay Content */}
        <div className="relative z-10 p-12 text-center bg-black bg-opacity-50">
          <div className="inline-block px-3 py-1 bg-orange-600 text-sm font-semibold rounded-full mb-4">
            New: Image prompts for Playground
          </div>
          <h1 className="text-5xl font-bold">Playground</h1>
          <p className="text-lg mt-4">High quality generations</p>
          <button className="mt-6 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200">
            Generate Images
          </button>
        </div>
      </section>
    </div>
    </main>
  </div>
  );
}
