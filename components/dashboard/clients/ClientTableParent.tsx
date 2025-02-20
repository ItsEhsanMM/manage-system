'use client'

import { Client, ClientWithId } from '@/shared/types'
import { DataTable } from './table/data-table'
import { clientColumns } from './table/columns'
import UpdateClientDialog from './UpdateClientDialog'
import { useClientDialogStore } from '@/stores/clientDialogStore'

interface Props {
  data: ClientWithId[] | []
}

const ClientTableParent = ({ data }: Props) => {
  const { isClientDialogOpen, selectedClient } = useClientDialogStore()
  console.log(data)

  return (
    <div>
      <DataTable paginable columns={clientColumns} data={data} />
      {isClientDialogOpen && selectedClient && (
        <UpdateClientDialog data={selectedClient} />
      )}
    </div>
  )
}
export default ClientTableParent
