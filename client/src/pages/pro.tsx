import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown } from "lucide-react";

export default function Pro() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Tonlance Pro</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5" />
            Pro Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Pro features coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
