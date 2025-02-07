import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, Star, Clock } from "lucide-react";
import type { User, Task } from "@shared/schema";

export default function Profile() {
  const { data: user } = useQuery<User>({
    queryKey: ['/api/auth']
  });

  const { data: tasks } = useQuery<Task[]>({
    queryKey: ['/api/tasks']
  });

  const userTasks = tasks?.filter(task => task.createdBy === user?.id);

  if (!user) return null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <h2 className="text-xl font-bold">{user.username}</h2>
              <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                <Star className="h-4 w-4" />
                <span>Rating: {user.rating}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5" />
            Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${user.balance}</div>
          <div className="flex gap-2 mt-4">
            <Button>Withdraw</Button>
            <Button variant="outline">Add Funds</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userTasks?.map((task) => (
              <div key={task.id} className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="font-medium">{task.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{new Date(task.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${task.budget}</div>
                  <div className="text-sm text-muted-foreground">
                    Status: {task.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
