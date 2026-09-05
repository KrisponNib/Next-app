import { LessonBooking, LessonSchedule } from "@/lib/types";
export const HEBREW_DAYS: Record<number,string>={0:"ראשון",1:"שני",2:"שלישי",3:"רביעי",4:"חמישי",5:"שישי",6:"שבת"};
const pad=(n:number)=>String(n).padStart(2,"0");
export const localDateKey=(d:Date)=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const mins=(t:string)=>{const [h,m]=t.split(":").map(Number);return h*60+m};
const asTime=(v:number)=>`${pad(Math.floor(v/60))}:${pad(v%60)}`;
export const addMinutes=(t:string,a:number)=>asTime(mins(t)+a);
export function bookingConflicts(bookings:LessonBooking[],date:string,startTime:string,duration:number){const s=mins(startTime),e=s+duration;return bookings.some(b=>b.status==="booked"&&b.date===date&&s<mins(b.endTime)&&mins(b.startTime)<e)}
export function candidateTimes(schedule:LessonSchedule,date:Date){const w=schedule.availability.find(a=>a.weekday===date.getDay()&&a.enabled);if(!w)return[];const out:string[]=[];for(let t=mins(w.start);t+schedule.lessonMinutes<=mins(w.end);t+=15){const x=asTime(t);if(!bookingConflicts(schedule.bookings,localDateKey(date),x,schedule.lessonMinutes))out.push(x)}return out}
export function threeSuggestedTimes(schedule:LessonSchedule,date:Date){const a=candidateTimes(schedule,date);if(a.length<=3)return a;return Array.from(new Set([a[0],a[Math.floor((a.length-1)/2)],a[a.length-1]])).slice(0,3)}
export function upcomingBookableDays(schedule:LessonSchedule,now=new Date()){const out:{date:string;weekday:number;dayName:string;displayDate:string;times:string[]}[]=[];const start=new Date(now);start.setHours(0,0,0,0);for(let i=0;i<12&&out.length<3;i++){const d=new Date(start);d.setDate(start.getDate()+i);if(![0,2,4].includes(d.getDay()))continue;const times=threeSuggestedTimes(schedule,d);if(times.length)out.push({date:localDateKey(d),weekday:d.getDay(),dayName:HEBREW_DAYS[d.getDay()],displayDate:`${d.getDate()}.${d.getMonth()+1}`,times})}return out}
