import Navbar from '@/components/shared/Nav'

export default async function Layout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex h-full flex-col'>
      {/* Main Content */}
      {/* Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className='bg-gray-50 p-4'>{children}</main>
    </div>
  )
}
