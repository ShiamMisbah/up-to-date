import { NextRequest, NextResponse } from "next/server"

export function middleware (req: NextRequest) {
    // const { pathname } = req.nextUrl;
    // const isLoggedIn = Boolean(req.cookies.get("accessToken")?.value)
    // console.log("Access Token", req.cookies.get("accessToken")?.value);

    // if (!isLoggedIn) {
    //     return NextResponse.redirect(new URL("/login", req.url))
    // }

    return NextResponse.next()
}