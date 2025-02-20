import type { Metadata } from 'next'
import './globals.css'
import { Vazirmatn } from 'next/font/google'
import ReactQueryProvider from '@/providers/react-query'
import Footer from '@/components/shared/Footer'

export const metadata: Metadata = {
  title: 'مدیریت سازمانی افراد',
  description: 'مدیریت افراد و دریافت گزارش'
}

const vazir = Vazirmatn({
  subsets: ['latin'],
  weight: ['400', '700']
})
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='fa' dir='rtl' className={`${vazir.className}`}>
      <body className='flex min-h-dvh flex-col'>
        <ReactQueryProvider>
          <main className='flex-1 bg-[#f9f9f9]'>{children}</main>
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  )
}
