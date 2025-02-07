import { Link, useLocation } from "wouter";
import {
  Home,
  Briefcase,
  UserCircle,
  Search,
  MessageSquare,
  Wallet,
  Settings,
  Crown,
  Building
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import type { User } from "@shared/schema";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { data: user } = useQuery<User>({
    queryKey: ['/api/auth']
  });

  const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: UserCircle, label: "Profile", href: "/profile" },
    { icon: Search, label: "Discovery", href: "/discovery" },
    { icon: Briefcase, label: "Jobs", href: "/tasks" },
    { icon: Building, label: "Projects & Invoices", href: "/projects" },
    { icon: MessageSquare, label: "Messages", href: "/messages" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Sidebar */}
      <aside className="w-64 bg-background border-r fixed h-full">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-6">Tonlance</h1>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <a className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                    location === item.href 
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  )}>
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </a>
                </Link>
              );
            })}

            <Separator className="my-4" />

            <div className="space-y-2">
              <div className="flex items-center gap-3 px-3 py-2">
                <Wallet className="h-5 w-5" />
                <div>
                  <div className="text-sm">Wallet</div>
                  <div className="text-sm font-medium">${user?.balance ?? 0}.00</div>
                </div>
              </div>

              <Link href="/settings">
                <a className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                  location === '/settings'
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                )}>
                  <Settings className="h-5 w-5" />
                  Settings
                </a>
              </Link>

              <Link href="/pro">
                <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-primary hover:bg-accent transition-colors">
                  <Crown className="h-5 w-5" />
                  Tonlance Pro
                </a>
              </Link>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        <div className="container mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}