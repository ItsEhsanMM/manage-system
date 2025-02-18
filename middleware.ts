import NextAuth from 'next-auth'
import authConfig from './auth.config'
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT } from './routes'
import { NextResponse } from 'next/server'

const { auth } = NextAuth(authConfig)

export default auth(req => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  console.log('Middleware running for:', nextUrl.pathname);
  console.log('isLoggedIn:', isLoggedIn);
  console.log('isApiAuthRoute:', isApiAuthRoute);
  console.log('isAuthRoute:', isAuthRoute);

  if (isApiAuthRoute) {
    return NextResponse.next()
  }
  
  
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return NextResponse.next()
  }
  
  
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/auth/login', nextUrl))
    }
    
  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
