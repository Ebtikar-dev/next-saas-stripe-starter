"use client";

import { useState, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Icons } from "@/components/shared/icons";

const formSchema = z.object({
  phoneNumber: z.string().regex(/^01[0125][0-9]{8}$/, {
    message: "الرجاء إدخال رقم هاتف فودافون كاش مصري صحيح (11 رقمًا).",
  }),
});

type FormData = z.infer<typeof formSchema>;

export function VodafoneCashForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  async function onSubmit(data: FormData) {
    startTransition(async () => {
      try {
        const response = await fetch("/api/vodafone-cash", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "فشل بدء الدفع عبر فودافون كاش.");
        }

        toast.success("تم بدء الدفع عبر فودافون كاش بنجاح.", {
          description: "يرجى إكمال عملية الدفع من هاتفك.",
        });
        form.reset();
      } catch (error: any) {
        toast.error("حدث خطأ", {
          description: error.message || "فشل بدء الدفع عبر فودافون كاش. الرجاء المحاولة مرة أخرى.",
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رقم هاتف فودافون كاش</FormLabel>
              <FormControl>
                <Input
                  placeholder="مثال: 01012345678"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <Icons.spinner className="mr-2 size-4 animate-spin" />
          ) : null}
          ادفع الآن
        </Button>
      </form>
    </Form>
  );
}
