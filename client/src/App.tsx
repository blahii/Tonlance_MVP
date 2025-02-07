
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/layout";
import { useQuery } from "@tanstack/react-query";
import type { User } from "@shared/schema";

// Page imports
import Home from "./pages/home";
import Tasks from "./pages/tasks";
import TaskDetails from "./pages/task-details";
import CreateTask from "./pages/create-task";
import Profile from "./pages/profile";
import Discovery from "./pages/discovery";
import Projects from "./pages/projects";
import Messages from "./pages/messages";
import Settings from "./pages/settings";
import Pro from "./pages/pro";
import RoleSelect from "./pages/role-select";
import NotFound from "./pages/not-found";

function Router() {
  const { data: user } = useQuery<User>({
    queryKey: ['/api/auth']
  });

  // If user is not authenticated, show only home page
  if (!user) {
    return (
      <Layout>
        <Switch>
          <Route path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    );
  }

  // If user has no role selected, show role selection
  if (!user.role) {
    return <RoleSelect />;
  }

  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/tasks" component={Tasks} />
        <Route path="/tasks/:id" component={TaskDetails} />
        <Route path="/discovery" component={Discovery} />
        <Route path="/projects" component={Projects} />
        <Route path="/messages" component={Messages} />
        <Route path="/settings" component={Settings} />
        <Route path="/pro" component={Pro} />
        {user.role === 'client' && (
          <Route path="/create" component={CreateTask} />
        )}
        <Route path="/profile" component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
