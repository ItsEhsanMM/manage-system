import { clientStatistic } from '@/actions/Client'
import StatBox from '@/components/shared/StatBox'

const page = async () => {
  const [statistics] = await clientStatistic()
  const parsedContent: { id: number; content: string; count: number }[] =
    JSON.parse(statistics as string)

  console.log(parsedContent)
  return (
    <div className='flex flex-1 flex-shrink flex-wrap items-start justify-start gap-12 px-5'>
      {parsedContent.map(content => (
        <StatBox
          content={content.content}
          info={content.count}
          key={content.id}
        />
      ))}
    </div>
  )
}
export default page
