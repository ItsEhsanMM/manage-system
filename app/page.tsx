import { Login } from '@/components/auth/Login'

export default async function Home() {
  return (
    <div className='grid h-dvh w-full items-center justify-center'>
      <Login />
    </div>
  )
}
