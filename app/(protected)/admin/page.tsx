import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import InfoCard from "@/components/dashboard/info-card";
import TransactionsList from "@/components/dashboard/transactions-list";

export const metadata = constructMetadata({
  title: "لوحة تحكم المسؤول – أكاديمية الفُرقان",
  description: "صفحة المسؤول لإدارة النظام فقط.",
});

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/login");

  return (
    <>
      <DashboardHeader
        heading="لوحة تحكم المسؤول"
        text="الوصول متاح فقط للمستخدمين ذوي دور المسؤول."
      />
      <div className="flex flex-col gap-5">
        {/* Section for displaying all student, teacher, subscription, and payment data */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">بيانات الطلاب</h3>
            <p className="text-sm text-muted-foreground">عرض وإدارة جميع الطلاب.</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">بيانات المعلمين</h3>
            <p className="text-sm text-muted-foreground">عرض وإدارة جميع المعلمين.</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">الاشتراكات</h3>
            <p className="text-sm text-muted-foreground">متابعة وإدارة اشتراكات الطلاب.</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">المدفوعات</h3>
            <p className="text-sm text-muted-foreground">عرض سجل المدفوعات.</p>
          </div>
        </div>

        {/* Section for monitoring teacher performance and session count */}
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">متابعة أداء المعلمين</h3>
          <p className="text-sm text-muted-foreground">مراقبة أداء المعلمين وعدد الجلسات المنفذة.</p>
          {/* Placeholder for charts/tables related to teacher performance */}
        </div>

        {/* Placeholder for "Monitoring manager" role (view-only) - this would be handled by authorization logic */}
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">صلاحية مدير المراقبة</h3>
          <p className="text-sm text-muted-foreground">عرض فقط بدون تعديل (يتم التحكم بها بواسطة الصلاحيات).</p>
        </div>
      </div>
    </>
  );
}
