import { DocsConfig } from "types";

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "المستندات",
      href: "/docs",
    },
    {
      title: "الأدلة",
      href: "/guides",
    },
  ],
  sidebarNav: [
    {
      title: "البدء",
      items: [
        {
          title: "مقدمة",
          href: "/docs",
        },
        {
          title: "التثبيت",
          href: "/docs/installation",
        },
      ],
    },
    {
      title: "الإعدادات",
      items: [
        {
          title: "المصادقة",
          href: "/docs/configuration/authentification",
        },
        {
          title: "المدونة",
          href: "/docs/configuration/blog",
        },
        {
          title: "المكونات",
          href: "/docs/configuration/components",
        },
        {
          title: "ملفات الإعدادات",
          href: "/docs/configuration/config-files",
        },
        {
          title: "قاعدة البيانات",
          href: "/docs/configuration/database",
        },
        {
          title: "البريد الإلكتروني",
          href: "/docs/configuration/email",
        },
        {
          title: "التخطيطات",
          href: "/docs/configuration/layouts",
        },
        {
          title: "ملفات Markdown",
          href: "/docs/configuration/markdown-files",
        },
        {
          title: "الاشتراكات",
          href: "/docs/configuration/subscriptions",
        },
      ],
    },
  ],
};
