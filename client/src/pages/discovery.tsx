
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock, DollarSign, SlidersHorizontal, CheckCircle2 } from "lucide-react";
import type { Task } from "@shared/schema";

export default function Discovery() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { data: tasks } = useQuery<Task[]>({
    queryKey: ['/api/tasks']
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Discovery</h1>
        <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px]">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="font-medium mb-3">Category</h3>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="webflow">Webflow</SelectItem>
                    <SelectItem value="webdesign">Web Design</SelectItem>
                    <SelectItem value="landing">Landing Page</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="font-medium mb-3">Experience Level</h3>
                <div className="space-y-2">
                  {[
                    { label: "Entry Level", count: 48 },
                    { label: "Intermediate", count: 692 },
                    { label: "Expert", count: 367 }
                  ].map((level) => (
                    <div className="flex items-center" key={level.label}>
                      <Checkbox id={level.label} />
                      <label htmlFor={level.label} className="text-sm ml-2">
                        {level.label} ({level.count})
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Job Type</h3>
                <div className="space-y-2">
                  {[
                    { label: "Hourly", count: 48 },
                    { label: "Fixed-Price", count: 692 }
                  ].map((type) => (
                    <div className="flex items-center" key={type.label}>
                      <Checkbox id={type.label} />
                      <label htmlFor={type.label} className="text-sm ml-2">
                        {type.label} ({type.count})
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-3">Client Info</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox id="payment-verified" />
                    <label htmlFor="payment-verified" className="text-sm ml-2">
                      Payment Verified (978)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="previous-clients" />
                    <label htmlFor="previous-clients" className="text-sm ml-2">
                      My Previous Clients (0)
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Pre-payment</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox id="prepay-10-25" />
                    <label htmlFor="prepay-10-25" className="text-sm ml-2">
                      10%-25%
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="prepay-25-50" />
                    <label htmlFor="prepay-25-50" className="text-sm ml-2">
                      25%-50%
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="space-y-4">
        {tasks?.map((task) => (
          <Card key={task.id} className="hover:bg-accent/50 transition-colors cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Clock className="h-4 w-4" />
                    Posted 26 minutes ago
                    {task.createdBy && (
                      <>
                        <span>|</span>
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Payment verified
                      </>
                    )}
                  </div>
                  <h2 className="text-lg font-semibold mb-2">{task.title}</h2>
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="h-4 w-4" />
                    <span className="font-medium">${task.budget}</span>
                    <span className="text-muted-foreground">- Entry level</span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {task.description}
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="secondary">Webflow</Badge>
                    <Badge variant="secondary">Web Design</Badge>
                    <Badge variant="secondary">Landing Page</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
