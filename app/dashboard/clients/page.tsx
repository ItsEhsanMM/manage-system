import { getClients } from '@/actions/Client'
import Client from '@/components/dashboard/clients/Client'
import { clientColumns } from '@/components/dashboard/clients/table/columns'
import { DataTable } from '@/components/dashboard/clients/table/data-table'

const page = async () => {
  const [clients] = await getClients()

  return (
    <div className='space-y-4'>
      <Client />
      <DataTable
        paginable
        columns={clientColumns}
        data={JSON.parse(clients as string)}
      />
    </div>
  )
}
export default page
