import { SidebarNavItem, SiteConfig } from "types";
import { env } from "@/env.mjs";

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "أكاديمية الفُرقان لأهل القرآن",
  description:
    "منصة تعليمية إلكترونية متكاملة تهدف إلى تعليم القرآن الكريم وعلومه (تفسير، تجويد، حفظ...) تقدّم تجربة مرنة وسهلة للطالب منذ التسجيل وحتى حضور المحاضرات والدفع الإلكتروني.",
  url: site_url,
  ogImage: `${site_url}/_static/og.jpg`,
  links: {
    twitter: "https://twitter.com/miickasmt",
    github: "https://github.com/mickasmt/next-saas-stripe-starter",
  },
  mailSupport: "support@alfurqanacademy.com",
};

export const footerLinks: SidebarNavItem[] = [
  {
    title: "الشركة",
    items: [
      { title: "عنا", href: "#" },
      { title: "المشاريع", href: "#" },
      { title: "الشروط", href: "/terms" },
      { title: "الخصوصية", href: "/privacy" },
    ],
  },
  {
    title: "المنتج",
    items: [
      { title: "الأمان", href: "#" },
      { title: "التخصيص", href: "#" },
      { title: "العملاء", href: "#" },
      { title: "سجل التغييرات", href: "#" },
    ],
  },
  {
    title: "المستندات",
    items: [
      { title: "مقدمة", href: "#" },
      { title: "التثبيت", href: "#" },
      { title: "المكونات", href: "#" },
      { title: "أمثلة الكود", href: "#" },
    ],
  },
];
