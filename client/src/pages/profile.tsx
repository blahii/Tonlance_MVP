import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { User, WorkHistory, Education, Task } from "@shared/schema";
import {
  Briefcase,
  GraduationCap,
  Link as LinkIcon,
  Plus,
  Star,
  Trash2,
  Clock,
  Calendar,
  MapPin,
  ExternalLink
} from "lucide-react";

export default function Profile() {
  const { toast } = useToast();
  const { data: user } = useQuery<User>({
    queryKey: ['/api/auth']
  });

  const { data: tasks } = useQuery<Task[]>({
    queryKey: ['/api/tasks']
  });

  const updateProfile = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest('PATCH', '/api/profile', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/auth'] });
      toast({
        title: "Profile updated",
        description: "Your changes have been saved successfully."
      });
    }
  });

  const userTasks = tasks?.filter(task => task.createdBy === user?.id);
  const completedTasks = userTasks?.filter(task => task.status === 'completed') ?? [];

  if (!user) return null;

  return (
    <div className="space-y-6 pb-20">
      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold">{user.fullName || user.username}</h2>
              {user.role === 'freelancer' && (
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Star className="h-4 w-4" />
                    <span>Rating: {user.rating}</span>
                  </div>
                  {user.hourlyRate && (
                    <div className="text-muted-foreground">
                      ${user.hourlyRate}/hr
                    </div>
                  )}
                </div>
              )}
            </div>

            {user.location && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{user.location}</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Joined {new Date(user.joinedDate!).toLocaleDateString()}</span>
            </div>

            {user.bio && (
              <p className="text-muted-foreground mt-4">{user.bio}</p>
            )}

            {user.role === 'freelancer' && (
              <div className="flex items-center space-x-2 mt-4">
                <Switch
                  checked={user.availableForWork ?? false}
                  onCheckedChange={(checked) =>
                    updateProfile.mutate({ availableForWork: checked })
                  }
                />
                <Label>Available for work</Label>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Online Presence */}
      {user.role === 'freelancer' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LinkIcon className="h-5 w-5" />
              Online Presence
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {user.personalWebsite && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Personal Website</span>
                <a
                  href={user.personalWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary hover:underline"
                >
                  {user.personalWebsite}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            )}

            {user.portfolioUrl && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Portfolio</span>
                <a
                  href={user.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary hover:underline"
                >
                  View Portfolio
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            )}

            {user.calendlyUrl && user.availableForWork && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Book a Session</span>
                <a
                  href={user.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary hover:underline"
                >
                  Schedule Meeting
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Work History */}
      {user.role === 'freelancer' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Work History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Add sample work history items */}
              <div className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Digital Generalist</h3>
                    <p className="text-muted-foreground">at Ragnarok</p>
                    <p className="text-sm text-muted-foreground">2018 - 2025</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add another job
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Education */}
      {user.role === 'freelancer' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Education
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Add sample education item */}
              <div className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Online School</h3>
                    <p className="text-muted-foreground">at Gnomon</p>
                    <p className="text-sm text-muted-foreground">2025</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add more education
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Completed Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {completedTasks.map((task) => (
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
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}