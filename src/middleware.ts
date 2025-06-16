import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '../supabase/middleware'
import { createClient } from '../supabase/server'

export async function middleware(request: NextRequest) {
  const response = await updateSession(request)
  const supabase = await createClient()
  const {data: {user}} = await supabase.auth.getUser()

  if(user && request.nextUrl.pathname === '/job') {
    const {data: userData, error} = await supabase.from('users').select('role').eq('id', user.id) .single()
    if (error) {
      console.error('Error fetching user role:', error.message)
      return response
    }
    const role = userData?.role

    if(role === 'Admin'){
      return NextResponse.redirect(new URL('/job/admin', request.url))
    }

    if(role === 'Designer'){
      return NextResponse.redirect(new URL('/job/designer', request.url))
    }

    if(role === 'Videographer'){
      return NextResponse.redirect(new URL('/job/video', request.url))
    }
  }
 return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}