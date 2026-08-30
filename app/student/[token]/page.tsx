import { notFound } from "next/navigation";
import { getStudentByToken } from "@/lib/cloud/supabaseRest";
import { StudentPortal } from "./StudentPortal";

export default async function PublicStudentPage({ params }: { params: { token: string } }) {
  const student = await getStudentByToken(params.token);
  if (!student) notFound();
  return <StudentPortal initialStudent={student} />;
}
