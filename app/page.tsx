'use client' // Mark this as a Client Component

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()

  // Redirect to /auth/login after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/auth/login')
    }, 3000) // 3 seconds delay

    return () => clearTimeout(timer) // Cleanup the timer
  }, [router])

  return (
    <div className='font-IRANSans flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100'>
      {/* Main Content */}
      <div className='text-center'>
        {/* Animated Logo or Icon */}
        <div className='animate-bounce'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='mx-auto h-24 w-24 text-blue-600'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M13 10V3L4 14h7v7l9-11h-7z'
            />
          </svg>
        </div>

        {/* Heading */}
        <h1 className='mt-6 text-4xl font-bold text-gray-800'>
          به وب‌سایت ما خوش آمدید
        </h1>

        {/* Subheading */}
        <p className='mt-4 text-lg text-gray-600'>
          شما در حال انتقال به صفحه ورود هستید...
        </p>

        {/* Loading Spinner */}
        <div className='mt-8 flex w-full items-center justify-center'>
          <div className='h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent'></div>
        </div>

        {/* Additional Content (Optional) */}
        <div className='mt-8 space-y-4'>
          <p className='text-gray-500'>لطفا چند لحظه صبر کنید.</p>
          <p className='text-gray-500'>
            اگر انتقال انجام نشد،{' '}
            <a href='/auth/login' className='text-blue-600 hover:underline'>
              اینجا کلیک کنید
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
