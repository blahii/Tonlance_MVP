import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Crown, Clock, DollarSign, Globe, UserCircle, Calendar, Mail, CreditCard } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function ProDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="gap-2">
          <Crown className="h-4 w-4" />
          View Project Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Weweb Developer Needed for Basic Service Website</DialogTitle>
          <DialogDescription className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4" />
            Posted 4 days ago
            <Globe className="h-4 w-4 ml-2" />
            Worldwide
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span className="font-semibold">$150.00</span>
                <span className="text-muted-foreground">Fixed-price</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <UserCircle className="h-4 w-4" />
                Intermediate Experience Level
              </div>
            </div>
            
            <div className="text-right text-sm">
              <p className="text-muted-foreground">Client from France</p>
              <p className="text-muted-foreground">$1.2K total spent, 35 hires</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-semibold">Project Requirements:</h4>
            <div className="grid gap-3 text-sm">
              <div className="space-y-2">
                <p>• Landing page with parallax/dynamic effects (Figma design provided)</p>
                <p>• Multiple text-only pages following brand design</p>
                <p>• Contact page with email functionality</p>
                <p>• User account registration with multi-step payment form</p>
                <p>• Stripe integration</p>
                <p>• Calendar integration (Calendly-like)</p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h4 className="font-semibold">Required Skills:</h4>
            <div className="flex flex-wrap gap-2">
              {["Webflow", "Web Development", "Web Design", "HTML", "CSS"].map((skill) => (
                <span key={skill} className="bg-secondary px-2 py-1 rounded-md text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Project Scope:</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                One-time project
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                5-10 proposals
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Remote work
              </div>
            </div>
          </div>
        </div>
        
        <Button className="w-full">Apply Now</Button>
      </DialogContent>
    </Dialog>
  );
}
