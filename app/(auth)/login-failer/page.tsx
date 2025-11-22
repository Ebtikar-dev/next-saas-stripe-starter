import Link from "next/link";
import { Metadata } from "next";

import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";

export const metadata: Metadata = {
  title: "Login Failed",
  description: "Login authentication failed",
};

export default function LoginFailedPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/login"
        className={buttonVariants({ variant: "outline", size: "sm" }) + " absolute left-4 top-4 md:left-8 md:top-8"}
      >
        <>
          <Icons.chevronLeft className="mr-2 size-4" />
          Back to Login
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto size-6" />
          <h1 className="text-2xl font-semibold tracking-tight text-red-600">
            Login Failed
          </h1>
          <p className="text-sm text-muted-foreground">
            We couldn't sign you in. Please try again or contact support if the problem persists.
          </p>
        </div>
        <Link href="/login" className={buttonVariants()}>
          Try Again
        </Link>
      </div>
    </div>
  );
}