import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='flex w-full flex-col items-center justify-center gap-2 border-t bg-gradient-to-r from-blue-500 to-blue-700 p-4 text-center text-sm text-white md:flex-row md:gap-4 md:text-lg'>
      <p className='font-medium'>برنامه نویسی شده توسط احسان محمدی</p>
      <Link
        className='transition-opacity hover:opacity-80'
        href='https://next-flash.ir'
        target='_blank'
      >
        <span className='underline'>next-flash.ir</span>
      </Link>
    </footer>
  )
}

export default Footer
