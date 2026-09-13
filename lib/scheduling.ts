import { LessonBooking, LessonSchedule, RecurringLesson } from "@/lib/types";

export const HEBREW_DAYS:Record<number,string>={0:"ראשון",1:"שני",2:"שלישי",3:"רביעי",4:"חמישי",5:"שישי",6:"שבת"};
const pad=(n:number)=>String(n).padStart(2,"0");
export const localDateKey=(d:Date)=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const mins=(t:string)=>{const[h,m]=t.split(":").map(Number);return h*60+m};
const asTime=(v:number)=>`${pad(Math.floor(v/60))}:${pad(v%60)}`;
export const addMinutes=(t:string,a:number)=>asTime(mins(t)+a);

function recurringConflict(recurring:RecurringLesson[],weekday:number,startTime:string,duration:number){
  const s=mins(startTime),e=s+duration;
  return recurring.some(r=>r.active!==false&&r.weekday===weekday&&s<mins(r.endTime)&&mins(r.startTime)<e)
}

export function bookingConflicts(bookings:LessonBooking[],date:string,startTime:string,duration:number){
  const s=mins(startTime),e=s+duration;
  return bookings.some(b=>b.status==="booked"&&b.date===date&&s<mins(b.endTime)&&mins(b.startTime)<e)
}

export function candidateTimes(schedule:LessonSchedule,date:Date,now=Date.now()){
  const w=schedule.availability.find(a=>a.weekday===date.getDay()&&a.enabled);if(!w)return[];
  const out:string[]=[];
  for(let t=mins(w.start);t+schedule.lessonMinutes<=mins(w.end);t+=schedule.slotIntervalMinutes){
    const x=asTime(t);
    if(canStudentBook(localDateKey(date),x,now)&&!bookingConflicts(schedule.bookings,localDateKey(date),x,schedule.lessonMinutes)&&!recurringConflict(schedule.recurringLessons||[],date.getDay(),x,schedule.lessonMinutes))out.push(x)
  }
  return out
}
export function suggestedTimes(schedule:LessonSchedule,date:Date,now=Date.now()){const a=candidateTimes(schedule,date,now);const n=Math.max(1,schedule.offersPerDay||3);if(a.length<=n)return a;if(n===1)return[a[Math.floor(a.length/2)]];return Array.from({length:n},(_,i)=>a[Math.round(i*(a.length-1)/(n-1))]).filter((v,i,x)=>x.indexOf(v)===i)}
export function upcomingBookableDays(schedule:LessonSchedule,now=new Date()){const out:{date:string;weekday:number;dayName:string;displayDate:string;times:string[]}[]=[];const parts=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Jerusalem",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(now);const part=(type:string)=>Number(parts.find(p=>p.type===type)!.value);const start=new Date(part("year"),part("month")-1,part("day"),12);const max=Math.max(7,schedule.advanceDays||14);for(let i=0;i<=max;i++){const d=new Date(start);d.setDate(start.getDate()+i);if(!schedule.availability.some(a=>a.weekday===d.getDay()&&a.enabled))continue;const times=suggestedTimes(schedule,d,now.getTime());if(times.length)out.push({date:localDateKey(d),weekday:d.getDay(),dayName:HEBREW_DAYS[d.getDay()],displayDate:`${d.getDate()}.${d.getMonth()+1}`,times})}return out}

function jerusalemLessonStartMs(date:string,time:string){
  const [y,m,d]=date.split("-").map(Number);const[h,mi]=time.split(":").map(Number);
  const guess=Date.UTC(y,m-1,d,h,mi,0);
  const parts=new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Jerusalem",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hourCycle:"h23"}).formatToParts(new Date(guess));
  const get=(type:string)=>Number(parts.find(p=>p.type===type)?.value||0);
  const represented=Date.UTC(get("year"),get("month")-1,get("day"),get("hour"),get("minute"),get("second"));
  const offset=represented-guess;
  return guess-offset;
}

export function canStudentModifyBooking(booking:LessonBooking,now=Date.now()){
  return jerusalemLessonStartMs(booking.date,booking.startTime)-now>24*60*60*1000;
}

export function canStudentBook(date:string,time:string,now=Date.now()){
  return jerusalemLessonStartMs(date,time)-now>=24*60*60*1000;
}

export function bookingWeeks(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jerusalem", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now);
  const part = (type: string) => Number(parts.find(p => p.type === type)!.value);
  const sunday = new Date(Date.UTC(part("year"), part("month") - 1, part("day")));
  sunday.setUTCDate(sunday.getUTCDate() - sunday.getUTCDay());
  return ["השבוע", "שבוע הבא"].map((label, index) => {
    const start = new Date(sunday);
    start.setUTCDate(start.getUTCDate() + index * 7);
    const end = new Date(start);
    end.setUTCDate(end.getUTCDate() + 6);
    return { label, start: start.toISOString().slice(0, 10), end: end.toISOString().slice(0, 10) };
  });
}
