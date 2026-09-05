import { NextRequest, NextResponse } from "next/server";
import { googleAuthUrl } from "@/lib/googleCalendar";
function authorized(req:NextRequest){const x=process.env.NEXT_STUDENTS_ADMIN_TOKEN;return Boolean(x&&req.cookies.get("next_students_admin")?.value===x)}
export async function GET(req:NextRequest){if(!authorized(req))return NextResponse.json({error:"unauthorized"},{status:401});const state=crypto.randomUUID();const res=NextResponse.redirect(googleAuthUrl(req.nextUrl.origin,state));res.cookies.set("next_google_oauth_state",state,{httpOnly:true,sameSite:"lax",secure:req.nextUrl.protocol==="https:",maxAge:600,path:"/"});return res}
