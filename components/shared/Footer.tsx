import Link from 'next/link'

const Footer = () => {
  return (
    <section className='flex w-full items-center justify-center space-x-4 border bg-blue-400 p-2 text-sm text-white md:text-lg'>
      <p>برنامه نویسی شده توسط احسان محمدی</p>
      <Link
        className='h-full underline'
        href={'https://next-flash.ir'}
        target='_blank'
      >
        next-flash.ir
      </Link>
    </section>
  )
}
export default Footer
