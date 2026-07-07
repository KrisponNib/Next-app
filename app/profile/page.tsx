import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { Card } from "@/components/ui/Card";
import { GoalEditor } from "@/features/profile/GoalEditor";
import { IdentityTraitsList } from "@/features/profile/IdentityTraitsList";
import { DataBackupControls } from "@/components/layout/DataBackupControls";

export default function ProfilePage() {
  return (
    <section>
      <ScreenHeader
        eyebrow="Identity Model"
        title="מה Next יודע עליך"
        description="לא פיצ׳רים. הקשר. זה מה שמאפשר המלצות טובות."
      />

      <GoalEditor />

      <Card>
        <h2 className="text-[27px] mb-3.5 font-extrabold">מי אני</h2>
        <IdentityTraitsList />
      </Card>

      <Card>
        <h2 className="text-[27px] mb-3.5 font-extrabold">גיבוי נתונים</h2>
        <DataBackupControls />
      </Card>
    </section>
  );
}
