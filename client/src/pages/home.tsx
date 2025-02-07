import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Briefcase } from "lucide-react";
import type { Task } from "@shared/schema";

export default function Home() {
  const { data: tasks } = useQuery<Task[]>({
    queryKey: ['/api/tasks']
  });

  return (
    <div className="space-y-6">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold mb-4">Freelance Marketplace</h1>
        <p className="text-muted-foreground">
          Find tasks or hire talented freelancers
        </p>
        <div className="mt-6">
          <Link href="/tasks">
            <Button size="lg">
              Browse Tasks
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Recent Tasks</h2>
          <Link href="/tasks">
            <Button variant="ghost">View All</Button>
          </Link>
        </div>

        <div className="grid gap-4">
          {tasks?.slice(0, 3).map((task) => (
            <Link key={task.id} href={`/tasks/${task.id}`}>
              <Card className="cursor-pointer hover:bg-accent transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    {task.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    {task.description.substring(0, 100)}...
                  </p>
                  <div className="text-sm font-medium">
                    Budget: ${task.budget}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
