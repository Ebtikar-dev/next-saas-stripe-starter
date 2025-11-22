"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/shared/icons";

export default function GoogleAuthSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // The actual token handling is done in the AuthProvider
    // This page just shows a loading state while redirect happens
    const timer = setTimeout(() => {
      // If no redirect happens after 3 seconds, redirect to login
      router.push("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto size-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            جاري تسجيل الدخول...
          </h1>
          <p className="text-sm text-muted-foreground">
            يتم التحقق من بياناتك الآن
          </p>
          <div className="flex justify-center">
            <Icons.spinner className="size-6 animate-spin" />
          </div>
        </div>
      </div>
    </div>
  );
}