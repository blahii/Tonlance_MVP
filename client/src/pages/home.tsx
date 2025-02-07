
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Trophy, Mail, Users, DollarSign, Target } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome, Dmytro 👋</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Rewards & Milestones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4" />
                  <span>Connector</span>
                </div>
                <Badge>$25 Rewards</Badge>
              </div>
              <Progress value={0} max={5} className="h-2" />
              <p className="text-sm text-muted-foreground mt-1">0/5</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Invite Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Earn $25 for every invited client that completes a project over $500.
            </p>
            <div className="flex gap-2 mb-6">
              <Input placeholder="Client email address" type="email" />
              <Button>Invite</Button>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">1</div>
                <div className="text-sm text-muted-foreground">Invited</div>
              </div>
              <div>
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-muted-foreground">Converted</div>
              </div>
              <div>
                <div className="text-2xl font-bold">$0</div>
                <div className="text-sm text-muted-foreground">Rewards</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Discovery Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl font-bold">36pts</div>
              <Badge variant="secondary">NEW</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              View how you rank and get detailed insights on how to boost your score.
            </p>
            <Button variant="outline" className="w-full">
              Unlock with PRO
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Start a project</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Start your first project with a few easy steps.
            </p>
            <Button className="w-full">Start project</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Send invoice</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Get paid on time and keep 100% of what you earn.
            </p>
            <Button variant="outline" className="w-full">Send invoice</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pro Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Get detailed insights and analytics with Pro membership.
            </p>
            <Button variant="outline" className="w-full">Upgrade to Pro</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
