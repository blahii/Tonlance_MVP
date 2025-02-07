import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock, DollarSign, SlidersHorizontal, CheckCircle2 } from "lucide-react";

const EXAMPLE_TASKS = [
  {
    id: 1,
    title: "Build a Webflow CMS Collection for a Podcast",
    budget: "12-22",
    description: "APPLICANTS NOTE: Please include estimated number of hours required and number of days required to complete. Seeking Webflow designer to add a CMS collection for a podcast to our website (https://www.qualrecruit.com/).",
    tags: ["Webflow", "Web Design", "Landing page", "Website"],
    type: "Hourly",
    experience: "Entry level",
    estimatedTime: "Less than 1 month, Less than 30 hrs/week",
    verified: true
  },
  {
    id: 2,
    title: "Frontend Developer for E-commerce Platform",
    budget: "15-25",
    description: "Looking for a frontend developer to help build our e-commerce platform using React and TypeScript.",
    tags: ["React", "TypeScript", "E-commerce"],
    type: "Hourly",
    experience: "Intermediate",
    estimatedTime: "1-3 months, 20-30 hrs/week",
    verified: true
  },
  {
    id: 3,
    title: "Mobile App UI/UX Designer",
    budget: "20-35",
    description: "Need a talented UI/UX designer for our mobile app. Experience with Figma required.",
    tags: ["UI/UX", "Mobile", "Figma"],
    type: "Hourly",
    experience: "Intermediate",
    estimatedTime: "2-4 weeks, 15-25 hrs/week",
    verified: true
  }
];

export default function Discovery() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof EXAMPLE_TASKS[0] | null>(null);

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
        {EXAMPLE_TASKS.map((task) => (
          <Card 
            key={task.id} 
            className="hover:bg-accent/50 transition-colors cursor-pointer"
            onClick={() => setSelectedProject(task)}
          >
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Clock className="h-4 w-4" />
                    Posted 26 minutes ago
                    {task.verified && (
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
                    <span className="text-muted-foreground">- {task.experience}</span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {task.description}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {task.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Sheet 
        open={!!selectedProject} 
        onOpenChange={() => setSelectedProject(null)}
      >
        <SheetContent side="right" className="w-full md:w-[70%] max-h-screen overflow-y-auto">
          {selectedProject && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">{selectedProject.title}</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Posted 4 days ago
                  <span className="mx-2">•</span>
                  <span>Worldwide</span>
                </div>
              </div>

              <div className="grid gap-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-medium">$150.00</span>
                      <Badge variant="secondary">Fixed-price</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Intermediate Level</p>
                  </div>
                  <Badge>Remote Job</Badge>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-semibold">Project Requirements</h3>
                  <div className="space-y-2 text-sm">
                    <p>• Landing page with parallax/dynamic effects (Figma design provided)</p>
                    <p>• Multiple text-only pages following brand design</p>
                    <p>• Contact page with email functionality</p>
                    <p>• User account registration with multi-step payment form</p>
                    <p>• Stripe integration</p>
                    <p>• Calendar integration (Calendly-like)</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-semibold">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Webflow", "Web Development", "Web Design", "HTML", "CSS"].map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-semibold">About the Client</h3>
                  <div className="grid gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location:</span>
                      <span>France, Paris</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Member since:</span>
                      <span>Jul 10, 2016</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total spent:</span>
                      <span>$1.2K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total hires:</span>
                      <span>35 (2 active)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button className="w-full">Apply Now</Button>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}