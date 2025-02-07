import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ChatWidget } from "@/components/chat-widget";
import { Clock, DollarSign } from "lucide-react";
import type { Task, Proposal, User } from "@shared/schema";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";

export default function TaskDetails() {
  const { id } = useParams();
  const { toast } = useToast();
  const [proposal, setProposal] = useState("");
  const taskId = id ? parseInt(id) : 0;

  const { data: task, isError } = useQuery<Task>({
    queryKey: [`/api/tasks/${taskId}`],
    enabled: taskId > 0
  });

  const { data: proposals } = useQuery<Proposal[]>({
    queryKey: [`/api/tasks/${taskId}/proposals`],
    enabled: taskId > 0
  });

  const { data: user } = useQuery<User>({
    queryKey: ['/api/auth']
  });

  const createProposal = useMutation({
    mutationFn: async () => {
      if (!user?.id) throw new Error('User not authenticated');
      await apiRequest('POST', `/api/tasks/${taskId}/proposals`, {
        userId: user.id,
        message: proposal
      });
    },
    onSuccess: () => {
      toast({
        title: "Proposal submitted",
        description: "Your proposal has been sent to the client."
      });
      setProposal("");
    }
  });

  if (isError || !taskId) {
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold mb-4">Task Not Found</h1>
        <p className="text-muted-foreground">The requested task could not be found.</p>
      </div>
    );
  }

  if (!task) return null;

  return (
    <div className="space-y-6 pb-20">
      <div>
        <h1 className="text-2xl font-bold mb-2">{task.title}</h1>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            <span>${task.budget}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{new Date(task.deadline).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <p className="whitespace-pre-wrap">{task.description}</p>
        </CardContent>
      </Card>

      {task.status === "open" && user && (
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4">Submit Proposal</h2>
            <Textarea
              placeholder="Write your proposal..."
              value={proposal}
              onChange={(e) => setProposal(e.target.value)}
              className="mb-4"
            />
            <Button 
              onClick={() => createProposal.mutate()}
              disabled={createProposal.isPending}
            >
              Submit Proposal
            </Button>
          </CardContent>
        </Card>
      )}

      {proposals && proposals.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4">Proposals</h2>
            <div className="space-y-4">
              {proposals.map((prop) => (
                <div key={prop.id} className="border-b pb-4">
                  <p className="whitespace-pre-wrap">{prop.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {user && <ChatWidget taskId={taskId} userId={user.id} />}
    </div>
  );
}