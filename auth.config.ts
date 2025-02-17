import { CredentialsSignin, NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import connectDB from "./lib/db"
import { User } from "./models/User"
import { compare } from "bcryptjs"

export default {
    providers: [
        Credentials({
          name: 'credentials',
          credentials: {
            email: { label: 'Email', type: 'email' },
            password: { label: 'Password', type: 'password' }
          },
          authorize: async credentials => {
            const email = credentials.email as string | undefined
            const password = credentials.password as string | undefined
    
            if (!email || !password) {
              throw new CredentialsSignin('لطفا ایمیل و رمز عبور را وارد کنید!')
            }
    
            await connectDB()
    
            const user = await User.findOne({ email }).select('+password')
    
            if (!user) {
              throw new Error('ایمیل یا رمزعبور اشتباه است!')
            }
    
            const isMatched = await compare(password, user.password)
    
            if (!isMatched) {
              throw new Error('رمز عبور اشتباه است!')
            }
    
            const userData = {
              name: user.name,
              email: user.email,
              id: user._id
            }
    
            return userData
          }
        })
      ],
}satisfies NextAuthConfig