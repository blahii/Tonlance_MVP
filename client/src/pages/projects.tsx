
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PROJECTS = [
  {
    id: 1,
    title: "E-commerce Website Development",
    budget: 2500,
    deadline: "2024-03-15",
    status: "in_progress",
    description: "Building a full-featured e-commerce platform with React and Node.js"
  },
  {
    id: 2,
    title: "Mobile App UI Design",
    budget: 1800,
    deadline: "2024-03-20",
    status: "completed",
    description: "UI/UX design for iOS and Android mobile application"
  }
];

const INVOICES = [
  {
    id: 1,
    projectTitle: "E-commerce Website Development",
    amount: 1250,
    status: "paid",
    date: "2024-02-15"
  },
  {
    id: 2,
    projectTitle: "Mobile App UI Design",
    amount: 1800,
    status: "pending",
    date: "2024-02-28"
  }
];

export default function Projects() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Projects & Invoices</h1>
        <div className="flex gap-2">
          <Button variant="outline">Create Invoice</Button>
          <Button>New Project</Button>
        </div>
      </div>

      <Tabs defaultValue="projects">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>
        
        <TabsContent value="projects">
          <div className="grid gap-4">
            {PROJECTS.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      <span>${project.budget}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Due {new Date(project.deadline).toLocaleDateString()}</span>
                    </div>
                    <Badge>{project.status === 'in_progress' ? 'In Progress' : 'Completed'}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="invoices">
          <div className="grid gap-4">
            {INVOICES.map((invoice) => (
              <Card key={invoice.id}>
                <CardContent className="flex items-center justify-between pt-6">
                  <div className="space-y-1">
                    <h3 className="font-medium">{invoice.projectTitle}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(invoice.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium">${invoice.amount}</span>
                    <Badge variant={invoice.status === 'paid' ? 'default' : 'secondary'}>
                      {invoice.status}
                    </Badge>
                    <Button variant="ghost" size="icon">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
