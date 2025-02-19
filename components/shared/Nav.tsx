'use client'

import { useHamburgerMenuStore } from '@/stores/navStore'
import { Button } from '../ui/button'
import { DashboardIcon, FileTextIcon, PersonIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet'
import { Menu } from 'lucide-react' // Import a hamburger icon

export default function Navbar() {
  const { isHamburgerMenuOpen, toggleHamburgerMenu } = useHamburgerMenuStore()

  return (
    <nav className='flex h-20 items-center justify-between border-b px-10 shadow-2xl'>
      {/* Regular Navigation Links (Visible on larger screens) */}
      <div className='hidden grid-cols-3 gap-x-4 sm:grid'>
        <Link
          href='/dashboard'
          className='flex items-center space-x-2 rounded-lg p-2 transition-colors duration-200 hover:text-gray-500'
        >
          <DashboardIcon className='h-5 w-5' />
          <span>داشبورد</span>
        </Link>
        <Link
          href='/dashboard/clients'
          className='flex items-center space-x-2 rounded-lg p-2 transition-colors duration-200 hover:text-gray-500'
        >
          <PersonIcon className='h-5 w-5' />
          <span>کاربران</span>
        </Link>
        <Link
          href='/dashboard/reports'
          className='flex items-center space-x-2 rounded-lg p-2 transition-colors duration-200 hover:text-gray-500'
        >
          <FileTextIcon className='h-5 w-5' />
          <span>گزارشات</span>
        </Link>
      </div>

      {/* Hamburger Menu (Visible on smaller screens) */}
      <Sheet open={isHamburgerMenuOpen} onOpenChange={toggleHamburgerMenu}>
        <SheetTrigger className='p-2 sm:hidden'>
          <Menu className='h-6 w-6' />
        </SheetTrigger>
        <SheetContent side='right' className='w-[300px]'>
          <nav className='mt-6 flex flex-col space-y-4'>
            <SheetTitle>منو</SheetTitle>
            <Link
              href='/dashboard'
              className='flex items-center space-x-2 rounded-lg p-2 transition-colors duration-200 hover:text-gray-500'
              onClick={toggleHamburgerMenu} // Close the menu when a link is clicked
            >
              <DashboardIcon className='h-5 w-5' />
              <span>داشبورد</span>
            </Link>
            <Link
              href='/dashboard/clients'
              className='flex items-center space-x-2 rounded-lg p-2 transition-colors duration-200 hover:text-gray-500'
              onClick={toggleHamburgerMenu} // Close the menu when a link is clicked
            >
              <PersonIcon className='h-5 w-5' />
              <span>کاربران</span>
            </Link>
            <Link
              href='/dashboard/reports'
              className='flex items-center space-x-2 rounded-lg p-2 transition-colors duration-200 hover:text-gray-500'
              onClick={toggleHamburgerMenu} // Close the menu when a link is clicked
            >
              <FileTextIcon className='h-5 w-5' />
              <span>گزارشات</span>
            </Link>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Logout Button (Visible on larger screens) */}
      <Button
        className='hidden transition-colors duration-200 hover:bg-blue-500 sm:block'
        onClick={() => signOut()}
      >
        خروج
      </Button>
    </nav>
  )
}
