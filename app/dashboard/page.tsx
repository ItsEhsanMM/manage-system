import { clientStatistic } from '@/actions/Client'
import { auth } from '@/auth'
import StatBox from '@/components/shared/StatBox'

const page = async () => {
  const user = await auth()
  const [statistics] = await clientStatistic()
  const parsedContent: { id: number; content: string; count: number }[] =
    JSON.parse(statistics as string)

  return (
    <div className='flex flex-col space-y-4'>
      <div className='text-lg font-semibold'>{user?.user?.name} خوش آمدید</div>
      <div className='flex flex-1 flex-shrink flex-wrap items-start justify-start gap-12 px-5'>
        {parsedContent.map(content => (
          <StatBox
            content={content.content}
            info={content.count}
            key={content.id}
          />
        ))}
      </div>
    </div>
  )
}
export default page
