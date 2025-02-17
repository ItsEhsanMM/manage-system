import Link from 'next/link'
import { ReactElement } from 'react'

export default function NotFound(): ReactElement {
  return (
    <div className='font-IRANSans flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100'>
      <div className='text-center'>
        {/* 404 Number */}
        <h1 className='text-9xl font-bold text-gray-800'>۴۰۴</h1>

        {/* Message */}
        <p className='mt-4 text-2xl font-medium text-gray-700'>
          صفحه مورد نظر شما یافت نشد.
        </p>

        {/* Description */}
        <p className='mt-2 text-lg text-gray-600'>
          ممکن است صفحه حذف شده باشد یا آدرس وارد شده اشتباه باشد.
        </p>

        {/* Back to Home Link */}
        <Link
          href='/'
          className='mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700'
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  )
}
