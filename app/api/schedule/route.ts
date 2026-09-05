import { NextRequest, NextResponse } from "next/server";
import { getLessonSchedule, saveLessonSchedule } from "@/lib/cloud/supabaseRest";
import { LessonSchedule } from "@/lib/types";
function authorized(req:NextRequest){const expected=process.env.NEXT_STUDENTS_ADMIN_TOKEN;return Boolean(expected&&req.cookies.get("next_students_admin")?.value===expected)}
export async function GET(req:NextRequest){if(!authorized(req))return NextResponse.json({error:"unauthorized"},{status:401});try{return NextResponse.json({schedule:await getLessonSchedule()})}catch(e){return NextResponse.json({error:e instanceof Error?e.message:"unknown error"},{status:500})}}
export async function PUT(req:NextRequest){if(!authorized(req))return NextResponse.json({error:"unauthorized"},{status:401});try{const {schedule}=await req.json() as {schedule:LessonSchedule};await saveLessonSchedule(schedule);return NextResponse.json({ok:true,schedule})}catch(e){return NextResponse.json({error:e instanceof Error?e.message:"unknown error"},{status:500})}}
