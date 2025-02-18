'use client'

import { useSidebarStore } from '@/stores/sidebarStore'

export default function Navbar({ name }: { name: string }) {
  const toggleSidebar = useSidebarStore(state => state.toggleSidebar)

  return (
    <nav className='flex items-center justify-between border-b-2 p-4'>
      <div className='flex items-center space-x-4'>
        {/* Hamburger Menu Button (Mobile and Tablet Only) */}
        <button
          onClick={toggleSidebar}
          className='cursor-pointer rounded-lg p-2 transition-colors duration-200 hover:bg-gray-300 md:hidden'
        >
          ☰
        </button>
        <div className='text-lg font-semibold'>{name} خوش آمدید</div>
      </div>
    </nav>
  )
}
