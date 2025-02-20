'use server'

import { prisma } from '@/lib/prisma'
import { loginSchema, registerSchema } from '@/Schema/user'
import { createServerAction } from 'zsa'
import { hash, compare } from 'bcryptjs'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { SignIn } from './signIn'

export const getUserByEmail = createServerAction()
  .input(z.string().email())
  .handler(async ({ input }) => {
    try {
      const user = await prisma.user.findUnique({
        where: { email: input }
      })

      return user as z.infer<typeof loginSchema> | null
    } catch (error) {
      console.error(error)
      return null
    }
  })

export const login = createServerAction()
  .input(loginSchema)
  .handler(async ({ input: { email, password } }) => {
    try {
      const user = await prisma.user.findUnique({
        where: { email }
      })

      if (!user) return new Error('این ایمیل وجود ندارد')

      const passwordMatch = await compare(password, user.password)
      if (!passwordMatch) return new Error('رمز عبور اشتباه است!')

      await SignIn('credentials', { email, password })

    } catch (error) {
      console.error(error)
      return new Error('خطا در ورود')
    }
    redirect("/dashboard")
  })

export const register = createServerAction()
  .input(registerSchema)
  .handler(async ({ input: { name, email, password } }) => {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { email }
      })

      if (existingUser) return new Error('این ایمیل وجود دارد')

      await prisma.user.create({
        data: {
          name,
          email,
          password: await hash(password, 12)
        }
      })

    } catch (error) {
      console.error(error)
      return new Error('خطا در ثبت نام')
    }
    redirect('/auth/login')
  })
