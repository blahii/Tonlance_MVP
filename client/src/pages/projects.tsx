import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import type { Task } from "@shared/schema";
import { Clock, DollarSign } from "lucide-react";

export default function Projects() {
  const { data: tasks } = useQuery<Task[]>({
    queryKey: ['/api/tasks']
  });

  const ongoingTasks = tasks?.filter(task => task.status === 'in_progress');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Projects & Invoices</h1>

      <div className="grid gap-4">
        {ongoingTasks?.map((task) => (
          <Card key={task.id}>
            <CardHeader>
              <CardTitle>{task.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Due {new Date(task.deadline).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  <span className="font-medium">{task.budget}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {(!ongoingTasks || ongoingTasks.length === 0) && (
          <div className="text-center text-muted-foreground py-8">
            No active projects found
          </div>
        )}
      </div>
    </div>
  );
}
