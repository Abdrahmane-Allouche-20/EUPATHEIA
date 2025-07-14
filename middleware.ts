import { NextRequest, NextResponse } from "next/server";
import withAuth from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
export default withAuth(async function middleware(request:NextRequest){
const pathname=request.nextUrl.pathname
const isAuth=await getToken({req:request})
const protectedRoutes=['/dashboard','/profile']
const isProtected=protectedRoutes.some((route)=>pathname.startsWith(route))
if(!isAuth && isProtected){
 return NextResponse.redirect(new URL('/auth/signin',request.url))   
}
},{
    callbacks:{
        async authorized(){
            return true
        }
    }
})
export const config = {
    matcher: ['/dashboard/:path*', '/profile/:path*', '/auth/:path*']
}