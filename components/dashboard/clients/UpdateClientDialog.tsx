'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { clientSchema } from '@/Schema/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useServerActionMutation } from '@/lib/hooks/server-action-hooks'
import { useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import NumberInput from '@/components/ui/NumberInput'
import { Input } from '@/components/ui/input'
import { useClientDialogStore } from '@/stores/clientDialogStore'
import { updateClient } from '@/actions/Client'
import { ClientWithId } from '@/shared/types'

interface Props {
  data: Omit<ClientWithId, 'status' | 'joinDate'>
}

const UpdateClientDialog = ({
  data: { id, name, salary, email = '', phoneNumber = '' }
}: Props) => {
  const { isClientDialogOpen, toggleClientDialog } = useClientDialogStore()

  const { mutate, isPending, isSuccess, reset, data } =
    useServerActionMutation(updateClient)

  const form = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name,
      email,
      phoneNumber: phoneNumber.toString(), // Ensuring string type for Prisma
      salary
    }
  })

  useEffect(() => {
    if (isSuccess && data?.success) {
      toggleClientDialog()
      form.reset()
      reset()
    }
  }, [isSuccess, data, form, reset, toggleClientDialog])

  function onSubmit(values: z.infer<typeof clientSchema>) {
    mutate({
      ...values,
      id // Ensuring correct ID handling for Prisma
    })
  }

  return (
    <Dialog
      open={isClientDialogOpen}
      onOpenChange={open => toggleClientDialog(open)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ویرایش کاربر</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='flex items-center space-x-5'>
                  <FormLabel className='flex w-1/2 justify-start text-xl'>
                    نام:
                  </FormLabel>
                  <FormControl>
                    <Input className='border-black' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='flex items-center justify-start space-x-5'>
                  <FormLabel className='flex w-1/2 justify-start text-xl'>
                    ایمیل:
                  </FormLabel>
                  <FormControl>
                    <Input className='border-black' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='salary'
              render={({ field }) => (
                <FormItem className='flex items-center justify-start space-x-5'>
                  <FormLabel className='flex w-1/2 justify-start text-xl'>
                    مبلغ دستمزد:
                  </FormLabel>
                  <FormControl>
                    <NumberInput
                      {...field}
                      onChange={prev => field.onChange(prev)}
                      type='number'
                      className='border-black'
                      min='0'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='phoneNumber'
              render={({ field }) => (
                <FormItem className='flex items-center justify-start space-x-5'>
                  <FormLabel className='flex w-1/2 justify-start text-xl'>
                    شماره تلفن:
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={e => {
                        const formattedValue = e.target.value.replace(
                          /[^0-9]/g,
                          ''
                        )
                        field.onChange(formattedValue) // Updating the field with a cleaned value
                      }}
                      maxLength={11}
                      className='border-black'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isPending} type='submit'>
              ثبت
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateClientDialog
