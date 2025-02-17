'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { loginSchema } from '@/Schema/user'
import { useServerActionMutation } from '@/lib/hooks/server-action-hooks'
import { login } from '@/actions/User'
import { FormError } from '../messages/form-error'

export function Login() {
  const { mutate, isPending, data } = useServerActionMutation(login)

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  function onSubmit({ email, password }: z.infer<typeof loginSchema>) {
    mutate({
      email,
      password
    })
  }

  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>ورود</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <div className='grid w-full items-center gap-4'>
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
              ورود
            </Button>
            <CardDescription>
              آیا حساب ندارید؟{' '}
              <Link className='text-blue-500 underline' href='/register'>
                ساختن حساب
              </Link>
            </CardDescription>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
