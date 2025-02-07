
import React from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/layout";

import Home from "./pages/home";
import Tasks from "./pages/tasks";
import CreateTask from "./pages/create-task";
import TaskDetails from "./pages/tasks";
import Discovery from "./pages/discovery";
import Messages from "./pages/messages";
import Projects from "./pages/projects";
import Profile from "./pages/profile";
import Settings from "./pages/settings";
import Pro from "./pages/pro";
import NotFound from "./pages/not-found";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/tasks" component={Tasks} />
        <Route path="/tasks/create" component={CreateTask} />
        <Route path="/tasks/:id" component={TaskDetails} />
        <Route path="/discovery" component={Discovery} />
        <Route path="/messages" component={Messages} />
        <Route path="/projects" component={Projects} />
        <Route path="/profile" component={Profile} />
        <Route path="/settings" component={Settings} />
        <Route path="/pro" component={Pro} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster />
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
