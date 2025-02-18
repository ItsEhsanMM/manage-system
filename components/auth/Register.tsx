'use client'

import Link from 'next/link'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { registerSchema } from '@/Schema/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { useServerActionMutation } from '@/lib/hooks/server-action-hooks'
import { register } from '@/actions/User'
import { FormError } from '../messages/form-error'

const Register = () => {
  const { mutate, isPending, data } = useServerActionMutation(register)

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  function onSubmit(values: z.infer<typeof registerSchema>) {
    mutate({ ...values })
  }

  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>ثبت نام</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <div className='grid w-full items-center gap-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='flex flex-col space-y-1.5'>
                    <FormLabel className='text-lg'>نام:</FormLabel>
                    <FormControl>
                      <Input
                        className='placeholder:text-gray-400'
                        placeholder='احسان محمدی'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='flex flex-col space-y-1.5'>
                    <FormLabel className='text-lg'>آدرس ایمیل:</FormLabel>
                    <FormControl>
                      <Input
                        className='placeholder:text-gray-400'
                        placeholder='johndoe@gmail.com'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem className='flex flex-col space-y-1.5'>
                    <FormLabel className='text-lg'>رمز عبور:</FormLabel>
                    <FormControl>
                      <Input
                        className='placeholder:text-gray-400'
                        type='password'
                        placeholder='********'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {data?.message && <FormError message={data.message} />}
            </div>
          </CardContent>
          <CardFooter className='flex flex-col space-y-4'>
            <Button
              className='w-full text-lg'
              type='submit'
              disabled={isPending}
            >
              ثبت نام
            </Button>
            <CardDescription>
              آیا حساب دارید؟
              <Link className='text-blue-500 underline' href='/auth/login'>
                ورود به حساب
              </Link>
            </CardDescription>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
export default Register
