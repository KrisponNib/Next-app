import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { Card } from "@/components/ui/Card";
import { ReflectionForm } from "@/features/reflect/ReflectionForm";
import { RecurringThemesList } from "@/features/reflect/RecurringThemesList";

export default function ReflectPage() {
  return (
    <section>
      <ScreenHeader
        eyebrow="לולאת למידה"
        title="מה למדנו?"
        description="כל הופעה, חזרה, שיעור או סרטון צריכים להפוך לשיפור עתידי."
      />

      <ReflectionForm />

      <Card>
        <h2 className="text-[27px] mb-3.5 font-extrabold">נושאים שחוזרים</h2>
        <RecurringThemesList />
      </Card>
    </section>
  );
}
