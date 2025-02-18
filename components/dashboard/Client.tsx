'use client'

import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { z } from 'zod'
import { clientSchema } from '@/Schema/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import NumberInput from '../ui/NumberInput'

const Client = () => {
  const form = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: '',
      email: '',
      salary: 0
    }
  })

  function onSubmit(values: z.infer<typeof clientSchema>) {
    console.log(values)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>اضافه کردن</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>کاربر جدید</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <>
                  <FormItem className='flex items-center space-x-5'>
                    <FormLabel className='flex w-1/2 justify-start text-xl'>
                      نام:
                    </FormLabel>
                    <FormControl>
                      <Input className='border-black' {...field}></Input>
                    </FormControl>
                  </FormItem>
                  <FormMessage />
                </>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <>
                  <FormItem className='flex items-center justify-start space-x-5'>
                    <FormLabel className='flex w-1/2 justify-start text-xl'>
                      ایمیل:
                    </FormLabel>
                    <FormControl>
                      <Input className='border-black' {...field}></Input>
                    </FormControl>
                  </FormItem>
                </>
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
                      className='border-black'
                      min='0'
                      {...field}
                    ></NumberInput>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type='submit'>ثبت</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
export default Client
