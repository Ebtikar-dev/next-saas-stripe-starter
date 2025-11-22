"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { userAuthSchema } from "@/lib/validations/auth";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Icons } from "@/components/shared/icons";
import { useAuth } from "@/hooks/use-auth";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: string;
}

type FormData = z.infer<typeof userAuthSchema>;

export function UserAuthForm({ className, type, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false);
  const searchParams = useSearchParams();
  const { login, signup, loginWithGoogle } = useAuth();

  async function onSubmit(data: FormData) {
    setIsLoading(true);

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    const signInResult = await signIn("resend", {
      email: data.email.toLowerCase(),
      redirect: false,
      callbackUrl: searchParams?.get("from") || "/dashboard",
    });

    setIsLoading(false);

    if (!signInResult?.ok) {
      return toast.error("حدث خطأ ما.", {
        description: "فشل طلب تسجيل الدخول الخاص بك. الرجاء المحاولة مرة أخرى."
      });
    }

    return toast.success("تحقق من بريدك الإلكتروني", {
      description: "لقد أرسلنا لك رابط تسجيل الدخول. تأكد من مراجعة مجلد الرسائل غير المرغوب فيها أيضًا.",
    });
=======
    try {
      if (type === "register") {
        // For registration, we need name as well
        await signup("", data.email.toLowerCase(), "");
      } else {
        // For login, we need password
        await login(data.email.toLowerCase(), "");
      }
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setIsLoading(false);
    }
>>>>>>> Stashed changes
=======
    try {
      if (type === "register") {
        // For registration, we need name as well
        await signup("", data.email.toLowerCase(), "");
      } else {
        // For login, we need password
        await login(data.email.toLowerCase(), "");
      }
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setIsLoading(false);
    }
>>>>>>> Stashed changes
=======
    try {
      if (type === "register") {
        // For registration, we need name as well
        await signup("", data.email.toLowerCase(), "");
      } else {
        // For login, we need password
        await login(data.email.toLowerCase(), "");
      }
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setIsLoading(false);
    }
>>>>>>> Stashed changes
=======
    try {
      if (type === "register") {
        // For registration, we need name as well
        await signup("", data.email.toLowerCase(), "");
      } else {
        // For login, we need password
        await login(data.email.toLowerCase(), "");
      }
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setIsLoading(false);
    }
>>>>>>> Stashed changes
=======
    try {
      if (type === "register") {
        // For registration, we need name as well
        await signup("", data.email.toLowerCase(), "");
      } else {
        // For login, we need password
        await login(data.email.toLowerCase(), "");
      }
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setIsLoading(false);
    }
>>>>>>> Stashed changes
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              البريد الإلكتروني
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || isGoogleLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 size-4 animate-spin" />
            )}
            {type === "register" ? "التسجيل بالبريد الإلكتروني" : "تسجيل الدخول بالبريد الإلكتروني"}
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            أو أكمل باستخدام
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setIsGoogleLoading(true);
          loginWithGoogle();
        }}
        disabled={isLoading || isGoogleLoading}
      >
        {isGoogleLoading ? (
          <Icons.spinner className="mr-2 size-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 size-4" />
        )}{" "}
        جوجل
      </button>
    </div>
  );
}
