
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";

export function ProDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="premium" className="gap-2">
          <Crown className="h-4 w-4" />
          Go Pro
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upgrade to Tonlance Pro</DialogTitle>
          <DialogDescription>
            Get access to premium features and boost your freelance career
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid gap-4">
            <div className="flex items-center gap-4">
              <Crown className="h-5 w-5 text-yellow-500" />
              <div>
                <h4 className="font-medium">Advanced Analytics</h4>
                <p className="text-sm text-muted-foreground">
                  Get detailed insights about your performance
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Crown className="h-5 w-5 text-yellow-500" />
              <div>
                <h4 className="font-medium">Priority Support</h4>
                <p className="text-sm text-muted-foreground">
                  Get faster responses from our support team
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Crown className="h-5 w-5 text-yellow-500" />
              <div>
                <h4 className="font-medium">Featured Profile</h4>
                <p className="text-sm text-muted-foreground">
                  Get more visibility in search results
                </p>
              </div>
            </div>
          </div>
        </div>
        <Button className="w-full">Upgrade Now</Button>
      </DialogContent>
    </Dialog>
  );
}
