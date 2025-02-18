'use client'

import { ColumnDef } from '@tanstack/react-table'
import { date } from 'zod'
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
    size: 100,
    cell: ({ row }) => {
      const salary = row.original.salary.toLocaleString()
      return <p>{salary}</p>
    }
  },
  {
    accessorKey: 'status',
    header: 'وضعیت',
    size: 150,
    cell: ({ row }) => {
      return <p>{row.getValue('status') === 'hired' ? 'استخدام' : 'اخراج'}</p>
    }
  },
  {
    accessorKey: 'joinDate',
    header: 'تاریخ عضویت',
    size: 150,
    cell: ({ row }) => {
      const date = new Date(row.getValue('joinDate'))
      const formatter = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        numberingSystem: 'latn' // Use Latin numerals (English numbers)
      })

      const formattedDate = formatter.format(date).replace(/‎/g, '')
      return <div className='font-medium'>{formattedDate}</div>
    }
  }
]
