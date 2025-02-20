'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useClientDialogStore } from '@/stores/clientDialogStore'
import UpdateClientDialog from '../UpdateClientDialog'
import { Client, ClientWithId } from '@/shared/types'

export const clientColumns: ColumnDef<ClientWithId>[] = [
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
    accessorKey: 'phoneNumber',
    header: 'شماره تلفن',
    size: 150
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
  },
  {
    id: 'actions',
    size: 50,
    cell: ({ row }) => {
      const { toggleClientDialog } = useClientDialogStore()
      const clientDetails = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={() => toggleClientDialog(clientDetails)}>
              ویرایش اطلاعات
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>تغییر وضعیت</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
