import NextAuth, { CredentialsSignin } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import connectDB from './lib/db'
import { User } from './models/User'
import { compare } from 'bcryptjs'
import { NextResponse } from 'next/server'
import authConfig from './auth.config'

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/'
  },
  
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      

      return session
    }
  },
  session: { strategy: 'jwt' },
  ...authConfig
})
