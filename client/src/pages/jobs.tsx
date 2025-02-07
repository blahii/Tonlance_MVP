
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Briefcase, Clock, DollarSign } from "lucide-react";

const EXAMPLE_JOBS = [
  {
    id: 1,
    title: "Build a Webflow CMS Collection for a Podcast",
    budget: "12-22",
    description: "APPLICANTS NOTE: Please include estimated number of hours required and number of days required to complete. Seeking Webflow designer to add a CMS collection for a podcast to our website.",
    tags: ["Webflow", "Web Design", "Landing page", "Website"],
    type: "Hourly",
    experience: "Entry level",
    timeLeft: "3 days left"
  },
  {
    id: 2,
    title: "Frontend Developer for E-commerce Platform",
    budget: "15-25", 
    description: "Looking for a frontend developer to help build our e-commerce platform using React and TypeScript.",
    tags: ["React", "TypeScript", "E-commerce"],
    type: "Hourly",
    experience: "Intermediate",
    timeLeft: "5 days left"
  }
];

export default function Jobs() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Jobs</h1>
        <Button>Send Proposal</Button>
      </div>

      <Card className="bg-accent">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="h-5 w-5 text-muted-foreground" />
            <p>Your skills match <span className="font-bold">63</span> open jobs</p>
          </div>
          <div className="flex gap-2 mb-4">
            {["Web Designer", "Webflow Developer", "Web Developer"].map((skill) => (
              <Badge key={skill} variant="secondary">{skill}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {EXAMPLE_JOBS.map((job) => (
          <Card key={job.id} className="cursor-pointer hover:bg-accent transition-colors">
            <CardHeader>
              <CardTitle className="text-xl">{job.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {job.description}
              </p>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  <span>${job.budget}/hr</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{job.timeLeft}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
