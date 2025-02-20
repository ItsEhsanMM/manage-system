import { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaClient } from '@prisma/client'
import { compare } from "bcryptjs"

const prisma = new PrismaClient()

export default {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async credentials => {
        const email = credentials?.email as string | undefined
        const password = credentials?.password as string | undefined

        if (!email || !password) {
          throw new Error('لطفا ایمیل و رمز عبور را وارد کنید!')
        }

        // Fetch the user from Prisma
        const user = await prisma.user.findUnique({
          where: { email },
        })

        if (!user) {
          throw new Error('ایمیل یا رمزعبور اشتباه است!')
        }

        // Compare the password using bcrypt
        const isMatched = await compare(password, user.password)

        if (!isMatched) {
          throw new Error('رمز عبور اشتباه است!')
        }

        // Return user data
        const userData = {
          name: user.name,
          email: user.email,
          id: user.id
        }

        return userData
      }
    })
  ],
} satisfies NextAuthConfig
