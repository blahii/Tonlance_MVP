import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export default function Messages() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>

      <Card>
        <CardContent className="flex items-center justify-center min-h-[200px] text-muted-foreground">
          <div className="text-center">
            <MessageSquare className="h-8 w-8 mx-auto mb-2" />
            <p>No messages yet</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
