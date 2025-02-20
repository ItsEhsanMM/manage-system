import { getClients } from '@/actions/Client'
import AddClientDialog from '@/components/dashboard/clients/AddClientDialog'
import ClientTableParent from '@/components/dashboard/clients/ClientTableParent'
import { ClientWithId } from '@/shared/types'

const Page = async () => {
  const [clientsJson] = await getClients()

  let clients: ClientWithId[] = []
  try {
    clients = JSON.parse(clientsJson!.toString()) as ClientWithId[]
  } catch (error) {
    console.error('Failed to parse clients:', error)
  }

  return (
    <div className='space-y-4'>
      <AddClientDialog />
      <ClientTableParent data={clients} />
    </div>
  )
}

export default Page
