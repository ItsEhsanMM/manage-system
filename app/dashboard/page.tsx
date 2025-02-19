import { clientStatistic, getClients } from '@/actions/Client'
import { auth } from '@/auth'
import { clientColumns } from '@/components/dashboard/clients/table/columns'
import { DataTable } from '@/components/dashboard/clients/table/data-table'
import StatBox from '@/components/shared/StatBox'
import { Separator } from '@/components/ui/separator'

const page = async () => {
  const user = await auth()

  const [clients] = await getClients()
  const [statistics] = await clientStatistic()
  const parsedContent: { id: number; content: string; count: number }[] =
    JSON.parse(statistics as string)

  return (
    <div className='flex flex-col space-y-8'>
      <div className='text-lg font-semibold'>{user?.user?.name} خوش آمدید</div>
      <div className='flex flex-1 flex-shrink flex-wrap items-start justify-start gap-12 px-5'>
        {parsedContent.map(content => (
          <StatBox
            content={content.content}
            info={content.count}
            percent={(content.count * 100) / parsedContent[0].count}
            key={content.id}
          />
        ))}
      </div>
      <Separator />
      <div className='flex flex-col space-y-4'>
        <h2 className='text-2xl font-bold'>آخرین کارمندها</h2>
        <DataTable
          columns={clientColumns}
          data={JSON.parse(clients as string).splice(0, 5)}
        />
      </div>
    </div>
  )
}
export default page
