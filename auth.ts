import NextAuth from 'next-auth'
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
