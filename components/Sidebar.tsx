'use client'

import Link from 'next/link'
import {
  PersonIcon,
  FileTextIcon,
  Cross2Icon,
  DashboardIcon
} from '@radix-ui/react-icons'
import { useSidebarStore } from '@/stores/sidebarStore'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'

export default function Sidebar() {
  const { isOpen, closeSidebar } = useSidebarStore()

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed z-40 h-full w-64 transform bg-[#f9f9f9] p-4 shadow-lg transition-transform duration-300 ease-in-out md:relative ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:translate-x-0`}
      >
        {/* Close Button (Mobile and Tablet Only) */}
        <button
          onClick={closeSidebar}
          className='absolute right-2 top-2 rounded-lg p-2 transition-colors duration-200 hover:bg-gray-400 md:hidden'
        >
          <Cross2Icon className='h-5 w-5' />
        </button>

        {/* Sidebar Links */}
        <nav className='flex h-full flex-col justify-between'>
          <div className='mt-8 space-y-4'>
            <Link
              href='/dashboard'
              className='flex items-center space-x-2 rounded-lg p-2 transition-colors duration-200 hover:bg-blue-600'
            >
              <DashboardIcon className='h-5 w-5' />
              <span>داشبورد</span>
            </Link>
            <Link
              href='/dashboard/clients'
              className='flex items-center space-x-2 rounded-lg p-2 transition-colors duration-200 hover:bg-blue-600'
            >
              <PersonIcon className='h-5 w-5' />
              <span>کاربران</span>
            </Link>
            <Link
              href='/dashboard/reports'
              className='flex items-center space-x-2 rounded-lg p-2 transition-colors duration-200 hover:bg-blue-600'
            >
              <FileTextIcon className='h-5 w-5' />
              <span>گزارشات</span>
            </Link>
          </div>

          <Button
            className='transition-colors duration-200 hover:bg-blue-500'
            onClick={() => signOut()}
          >
            خروج
          </Button>
        </nav>
      </aside>

      {/* Overlay for Mobile and Tablet (Hidden on Desktop) */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className='fixed inset-0 z-30 bg-black/50 md:hidden'
        ></div>
      )}
    </>
  )
}
