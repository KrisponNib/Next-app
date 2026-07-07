import Link from "next/link";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { Card } from "@/components/ui/Card";
import { NextActionCard } from "@/features/today/NextActionCard";
import { ScheduleList } from "@/features/today/ScheduleList";
import { TopTasksList } from "@/features/today/TopTasksList";
import { DailyQuestion } from "@/features/today/DailyQuestion";

export default function TodayPage() {
  return (
    <section>
      <ScreenHeader
        eyebrow="היום"
        title="בוקר טוב, עמרי"
        description="המטרה היא לא לעשות הכול. המטרה היא לדעת מה הדבר הבא."
      />

      <NextActionCard />

      <div className="border-t border-line py-[22px] px-0.5">
        <h2 className="text-[27px] mb-3.5 font-extrabold">היום שלך</h2>
        <ScheduleList />
      </div>

      <Card>
        <h2 className="text-[27px] mb-3.5 font-extrabold">שלושה דברים שיקדמו אותך</h2>
        <TopTasksList />
      </Card>

      <Card>
        <h2 className="text-[27px] mb-3.5 font-extrabold">אימון</h2>
        <p className="text-muted">בחר כמה זמן יש לך, ונבנה אימון פשוט להיום.</p>
        <Link
          href="/practice"
          className="block w-full text-center border-0 bg-text text-white rounded-button py-4 px-[18px] font-extrabold text-lg mt-4"
        >
          צור אימון
        </Link>
      </Card>

      <DailyQuestion />
    </section>
  );
}
