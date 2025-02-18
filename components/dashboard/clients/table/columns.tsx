'use client'

import { ColumnDef } from '@tanstack/react-table'

export type Client = {
  name: string
  email: string
  salary: number
  status: 'hired' | 'fired'
  joinDate: Date
}

export const clientColumns: ColumnDef<Client>[] = [
  {
    accessorKey: 'name',
    header: 'نام',
    size: 200
  },
  {
    accessorKey: 'email',
    header: 'ایمیل',
    size: 250
  },
  {
    accessorKey: 'salary',
    header: 'حقوق',
    size: 100
  },
  {
    accessorKey: 'status',
    header: 'وضعیت',
    size: 150
  },
  {
    accessorKey: 'joinDate',
    header: 'تاریخ عضویت',
    size: 150,
    cell: ({ row }) => {
      const date = new Date(row.getValue('joinDate'))
      const formatted = date.toLocaleDateString()
      return <div className='font-medium'>{formatted}</div>
    }
  }
]
