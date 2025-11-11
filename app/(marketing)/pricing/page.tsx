import Image from "next/image";
import Link from "next/link";

import { getCurrentUser } from "@/lib/session";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { constructMetadata } from "@/lib/utils";
import { ComparePlans } from "@/components/pricing/compare-plans";
import { PricingCards } from "@/components/pricing/pricing-cards";
import { PricingFaq } from "@/components/pricing/pricing-faq";
import { VodafoneCashForm } from "@/components/forms/vodafone-cash-form"; // Import the new form

export const metadata = constructMetadata({
  title: "الأسعار – أكاديمية الفُرقان",
  description: "استكشف خطط الاشتراك لدينا.",
});

export default async function PricingPage() {
  const user = await getCurrentUser();

  if (user?.role === "ADMIN") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-5xl font-bold">هل أنت جاد؟</h1>
        <Image
          src="/_static/illustrations/call-waiting.svg"
          alt="403"
          width={560}
          height={560}
          className="pointer-events-none -my-20 dark:invert"
        />
        <p className="text-balance px-4 text-center text-2xl font-medium">
          أنت {user.role}. عد إلى{" "}
          <Link
            href="/admin"
            className="text-muted-foreground underline underline-offset-4 hover:text-purple-500"
          >
            لوحة القيادة
          </Link>
          .
        </p>
      </div>
    );
  }

  let subscriptionPlan;
  if (user && user.id) {
    subscriptionPlan = await getUserSubscriptionPlan(user.id);
  }

  return (
    <div className="flex w-full flex-col gap-16 py-8 md:py-8">
      <PricingCards userId={user?.id} subscriptionPlan={subscriptionPlan} />
      <hr className="container" />

      {/* New section for Vodafone Cash payment */}
      <section className="container flex flex-col items-center gap-6 py-8 md:py-12">
        <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
          الدفع عبر فودافون كاش
        </h2>
        <p className="max-w-2xl text-balance text-center text-muted-foreground">
          يمكنك الآن الاشتراك في باقاتنا باستخدام فودافون كاش. يرجى إدخال رقم هاتفك لإتمام عملية الدفع.
        </p>
        <div className="w-full max-w-sm">
          <VodafoneCashForm />
        </div>
      </section>
      {/* End new section */}

      <ComparePlans />
      <PricingFaq />
    </div>
  );
}
