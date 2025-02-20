import { Button } from '@/components/ui/button'

const page = () => {
  return (
    <section className='flex flex-col justify-between rounded-lg bg-white p-6 shadow-md'>
      <h2 className='mb-4 text-xl font-semibold text-gray-800'>
        دریافت گزارش کاربران به‌صورت فایل اکسل
      </h2>
      <p className='text-lg leading-relaxed text-gray-700'>
        در این صفحه شما می‌توانید گزارشی جامع از تمام کاربران خود را به‌صورت
        فایل اکسل دریافت کنید. این گزارش شامل اطلاعات کاملی از کاربران، از جمله:
      </p>
      <ul className='my-3 list-disc px-6 text-lg text-gray-700'>
        <li>نام و نام خانوادگی</li>
        <li>آدرس ایمیل و شماره تماس</li>
        <li>تاریخ عضویت و وضعیت حساب کاربری</li>
      </ul>
      <p className='text-lg leading-relaxed text-gray-700'>
        داشتن این گزارش به شما کمک می‌کند تا بتوانید کاربران خود را بهتر مدیریت
        کنید، تصمیمات بهتری بگیرید و استراتژی‌های موثرتری برای بهبود تجربه
        کاربران تدوین کنید. همچنین این فایل به شما امکان می‌دهد اطلاعات را
        به‌راحتی مرتب‌سازی، فیلتر و تحلیل کنید.
      </p>
      <div className='mt-6'>
        <Button className='rounded-lg bg-blue-600 px-6 py-3 text-lg font-medium text-white transition hover:bg-blue-700'>
          دریافت گزارش به صورت Excel
        </Button>
      </div>
    </section>
  )
}
export default page
