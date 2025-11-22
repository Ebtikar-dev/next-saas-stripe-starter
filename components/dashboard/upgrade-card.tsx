import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function UpgradeCard() {
  return (
    <Card className="md:max-xl:rounded-none md:max-xl:border-none md:max-xl:shadow-none">
      <CardHeader className="md:max-xl:px-4">
        <CardTitle>الترقية إلى برو</CardTitle>
        <CardDescription>
          افتح جميع الميزات واحصل على وصول غير محدود إلى فريق الدعم لدينا.
        </CardDescription>
      </CardHeader>
      <CardContent className="md:max-xl:px-4">
        <Button size="sm" className="w-full">
          ترقية
        </Button>
      </CardContent>
    </Card>
  );
}
