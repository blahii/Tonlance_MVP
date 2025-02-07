import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { User } from "@shared/schema";
import { UserCircle, Briefcase } from "lucide-react";

export default function RoleSelect() {
  const { toast } = useToast();

  const selectRole = useMutation({
    mutationFn: async (role: string) => {
      await apiRequest('PATCH', '/api/auth/role', { role });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/auth'] });
      toast({
        title: "Role selected",
        description: "Your role has been set successfully."
      });
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center text-foreground mb-8">
          Choose Your Role
        </h1>

        <div className="grid grid-cols-1 gap-4">
          <Card 
            className="cursor-pointer hover:border-primary transition-colors"
            onClick={() => selectRole.mutate('client')}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Client
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground-muted">
                Post tasks and hire freelancers to complete your projects.
              </p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:border-primary transition-colors"
            onClick={() => selectRole.mutate('freelancer')}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCircle className="h-5 w-5 text-primary" />
                Freelancer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground-muted">
                Find tasks and earn money by completing projects.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
