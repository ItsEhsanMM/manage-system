import { auth } from '@/auth'
import Navbar from '@/components/shared/Nav'
import Sidebar from '@/components/Sidebar'

export default async function Layout({
  children
}: {
  children: React.ReactNode
}) {
  const user = await auth()
  return (
    <div className='flex h-full'>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className='flex flex-1 flex-col'>
        {/* Navbar */}
        <Navbar name={user?.user?.name as string} />

        {/* Main Content Area */}
        <main className='flex-1 overflow-y-auto bg-gray-50 p-4'>
          {children}
        </main>
      </div>
    </div>
  )
}
