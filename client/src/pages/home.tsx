
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Briefcase, Clock, CheckCircle, Archive } from "lucide-react";
import { Link } from "wouter";

const EXAMPLE_TASKS = {
  active: {
    title: "Build a Webflow Website",
    budget: "$500",
    timeLeft: "3 days left",
    status: "In Progress",
    client: "John Smith"
  },
  proposals: [
    {
      title: "Mobile App UI Design",
      budget: "$800",
      deadline: "Due in 5 days",
      status: "Pending"
    },
    {
      title: "WordPress Plugin Development",
      budget: "$600",
      deadline: "Due in 7 days",
      status: "Pending"
    }
  ],
  completed: [
    {
      title: "Landing Page Design",
      budget: "$400",
      completedDate: "Completed 2 days ago",
      feedback: "Great work! Very professional."
    }
  ]
};

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Active Project
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">{EXAMPLE_TASKS.active.title}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span>{EXAMPLE_TASKS.active.budget}</span>
                  <span>•</span>
                  <span>{EXAMPLE_TASKS.active.timeLeft}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Progress value={65} className="flex-1" />
                <span className="text-sm font-medium">65%</span>
              </div>
              <Button variant="outline" size="sm">View Project</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Pending Proposals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {EXAMPLE_TASKS.proposals.map((proposal, i) => (
                <div key={i}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{proposal.title}</h3>
                      <div className="text-sm text-muted-foreground">{proposal.budget}</div>
                    </div>
                    <Badge variant="secondary">{proposal.status}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">{proposal.deadline}</div>
                  {i < EXAMPLE_TASKS.proposals.length - 1 && <Separator className="my-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Archive className="h-5 w-5" />
              Completed Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            {EXAMPLE_TASKS.completed.map((task, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{task.title}</h3>
                    <div className="text-sm text-muted-foreground">{task.budget}</div>
                  </div>
                  <Badge variant="secondary" className="gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Done
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{task.completedDate}</p>
                <p className="text-sm italic">"{task.feedback}"</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
