import Navbar from '@/components/shared/Nav'

export default async function Layout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex h-full'>
      {/* Main Content */}
      <div className='flex flex-1 flex-col'>
        {/* Navbar */}
        <Navbar />

        {/* Main Content Area */}
        <main className='flex-1 bg-gray-50 p-4'>{children}</main>
      </div>
    </div>
  )
}
