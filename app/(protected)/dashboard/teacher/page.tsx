import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";

export default function TeacherDashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="لوحة تحكم المعلم"
        text="إدارة حصصك وتقييم الطلاب."
      />
      <div>
        {/* Teacher dashboard content will go here */}
        <p>مرحباً بك في لوحة تحكم المعلم!</p>
        <p>هنا يمكنك عرض جدول حصصك، تسجيل حضور الطلاب، وتقييم أدائهم.</p>
      </div>
    </DashboardShell>
  );
}
