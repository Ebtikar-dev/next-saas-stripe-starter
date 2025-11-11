import { UserRole } from "@prisma/client";

import { SidebarNavItem } from "types";

export const sidebarLinks: SidebarNavItem[] = [
  {
    title: "القائمة",
    items: [
      {
        href: "/admin",
        icon: "laptop",
        title: "لوحة تحكم المسؤول",
        authorizeOnly: UserRole.ADMIN,
      },
      {
        href: "/dashboard/teacher",
        icon: "user",
        title: "لوحة تحكم المعلم",
        authorizeOnly: UserRole.TEACHER,
      },
      { href: "/dashboard", icon: "dashboard", title: "لوحة القيادة" },
      {
        href: "/dashboard/billing",
        icon: "billing",
        title: "الفواتير",
        authorizeOnly: UserRole.USER,
      },
      { href: "/dashboard/charts", icon: "lineChart", title: "الرسوم البيانية" },
      {
        href: "/admin/orders",
        icon: "package",
        title: "الطلبات",
        badge: 2,
        authorizeOnly: UserRole.ADMIN,
      },
      {
        href: "#/dashboard/posts",
        icon: "post",
        title: "منشورات المستخدم",
        authorizeOnly: UserRole.USER,
        disabled: true,
      },
    ],
  },
  {
    title: "خيارات",
    items: [
      { href: "/dashboard/settings", icon: "settings", title: "الإعدادات" },
      { href: "/", icon: "home", title: "الصفحة الرئيسية" },
      { href: "/docs", icon: "bookOpen", title: "المستندات" },
      {
        href: "#",
        icon: "messages",
        title: "الدعم الفني",
        authorizeOnly: UserRole.USER,
        disabled: true,
      },
    ],
  },
];
