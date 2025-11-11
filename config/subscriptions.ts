import { PlansRow, SubscriptionPlan } from "types";
import { env } from "@/env.mjs";

export const pricingData: SubscriptionPlan[] = [
  {
    title: "باقة الحفظ الأساسية",
    description: "لتعلم القرآن الكريم حفظًا وتجويدًا",
    benefits: [
      "حصص أسبوعية للحفظ والتجويد",
      "متابعة فردية للتقدم",
      "وصول إلى مواد تعليمية أساسية",
    ],
    limitations: [
      "لا يشمل التفسير أو مواد إضافية",
      "دعم فني محدود",
    ],
    prices: {
      monthly: 200, // Example EGP price
      yearly: 2000, // Example EGP price
    },
    stripeIds: {
      monthly: null, // Placeholder
      yearly: null, // Placeholder
    },
  },
  {
    title: "باقة الحفظ والتفسير",
    description: "لتعميق فهم القرآن الكريم",
    benefits: [
      "حصص أسبوعية للحفظ والتجويد والتفسير",
      "متابعة فردية للتقدم",
      "وصول غير محدود إلى مواد تعليمية متقدمة",
      "دعم فني ذو أولوية",
    ],
    limitations: [],
    prices: {
      monthly: 350, // Example EGP price
      yearly: 3500, // Example EGP price
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID, // Placeholder, will need actual Stripe IDs
      yearly: env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID, // Placeholder, will need actual Stripe IDs
    },
  },
  {
    title: "الباقة الشاملة",
    description: "لتعلم القرآن وعلومه المتنوعة",
    benefits: [
      "حصص أسبوعية للحفظ والتجويد والتفسير والفقه",
      "متابعة فردية مكثفة",
      "وصول كامل إلى جميع المواد التعليمية",
      "دعم فني على مدار الساعة",
      "جلسات استشارية خاصة",
    ],
    limitations: [],
    prices: {
      monthly: 500, // Example EGP price
      yearly: 5000, // Example EGP price
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID, // Placeholder, will need actual Stripe IDs
      yearly: env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID, // Placeholder, will need actual Stripe IDs
    },
  },
];

export const plansColumns = [
  "basic_hifz",
  "hifz_tafsir",
  "comprehensive",
  "custom",
] as const;

export const comparePlans: PlansRow[] = [
  {
    feature: "الوصول إلى المواد التعليمية",
    basic_hifz: "أساسي",
    hifz_tafsir: "متقدم",
    comprehensive: "كامل",
    custom: "حسب الطلب",
    tooltip: "جميع الباقات تتضمن الوصول إلى المواد التعليمية.",
  },
  {
    feature: "متابعة التقدم",
    basic_hifz: true,
    hifz_tafsir: true,
    comprehensive: true,
    custom: "حسب الطلب",
    tooltip: "متابعة التقدم متاحة في جميع الباقات.",
  },
  {
    feature: "دعم فني",
    basic_hifz: "عادي",
    hifz_tafsir: "ذو أولوية",
    comprehensive: "24/7",
    custom: "حسب الطلب",
    tooltip: "مستوى الدعم الفني يختلف حسب الباقة.",
  },
  {
    feature: "حصص التفسير",
    basic_hifz: null,
    hifz_tafsir: true,
    comprehensive: true,
    custom: "حسب الطلب",
    tooltip: "حصص التفسير متاحة في باقة الحفظ والتفسير والباقة الشاملة.",
  },
  {
    feature: "حصص الفقه ومواد إضافية",
    basic_hifz: null,
    hifz_tafsir: null,
    comprehensive: true,
    custom: "حسب الطلب",
    tooltip: "حصص الفقه والمواد الإضافية متاحة في الباقة الشاملة.",
  },
  {
    feature: "جلسات استشارية خاصة",
    basic_hifz: null,
    hifz_tafsir: null,
    comprehensive: true,
    custom: "حسب الطلب",
    tooltip: "جلسات استشارية خاصة متاحة في الباقة الشاملة.",
  },
  {
    feature: "مرونة المواعيد",
    basic_hifz: "محدودة",
    hifz_tafsir: "قياسية",
    comprehensive: "مرنة",
    custom: "حسب الطلب",
    tooltip: "مرونة اختيار المواعيد تزداد مع الباقات الأعلى.",
  },
  {
    feature: "عدد الحصص الشهرية",
    basic_hifz: "4",
    hifz_tafsir: "8",
    comprehensive: "12+",
    custom: "حسب الطلب",
    tooltip: "عدد الحصص الشهرية المتاحة.",
  },
];
