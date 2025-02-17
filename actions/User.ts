'use server'

import connectDB from '@/lib/db'
import { User } from '@/models/User'
import { loginSchema, registerSchema } from '@/Schema/user'
import { createServerAction } from 'zsa'
import { hash, compare } from 'bcryptjs'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { SignIn } from './signIn'

export const getUserByEmail = createServerAction()
  .input(z.string().email())
  .handler(async ({ input }) => {
    await connectDB()
    try {
      const user = await User.findOne({
        email: input
      })

      return user as z.infer<typeof loginSchema> | null
    } catch (error) {
      console.log(error)
      process.exit(1)
    }
  })

export const login = createServerAction()
  .input(loginSchema)
  .handler(async ({ input: { email, password } }) => {
    await connectDB()
    try {
      const [user, error] = await getUserByEmail(email);

      if (error) {
        console.error(error);
        return new Error('خطا در دریافت اطلاعات کاربر');
      }

      if (!user) return new Error('این ایمیل وجود ندارد')

      const passwordMatch = await compare(password, user.password)

      if (!passwordMatch) return new Error('رمز عبور اشتباه است!')

      await SignIn('credentials', {
        email,
        password
      })
    } catch (error) {
      console.log(error)
      process.exit(1)
    }

    redirect("/dashboard")
  })

export const register = createServerAction()
  .input(registerSchema)
  .handler(async ({ input: { name, email, password } }) => {
    await connectDB()

    try {
      const user = await User.findOne({
        email: email
      })

      if (user) {
        return new Error('این ایمیل وجود دارد')
      }

      User.create({
        name,
        email,
        password: await hash(password, 12)
      })
      
    } catch (error) {
      console.log(error)
      process.exit(1)
    }
    redirect('/auth/login')
  })
