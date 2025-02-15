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
import { ProDialog } from "./pro-dialog"; // Added import for ProDialog

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
      {/* Left Sidebar for desktop / Bottom menu for mobile */}
      <aside className="lg:w-64 bg-background border-r fixed h-auto lg:h-full bottom-0 lg:bottom-auto w-full lg:top-0 z-50">
        <div className="p-4 lg:p-6">
          <h1 className="text-2xl font-bold mb-6 hidden lg:block">Tonlance</h1>

          <nav className="flex lg:flex-col justify-around lg:justify-start lg:space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={cn(
                    "flex flex-col lg:flex-row items-center lg:gap-3 px-3 py-2 rounded-lg text-xs lg:text-sm transition-colors",
                    location === item.href 
                      ? "bg-primary text-primary-foreground lg:bg-primary"
                      : "hover:bg-accent"
                  )}
                >
                  <Icon className="h-5 w-5 mb-1 lg:mb-0" />
                  <span className="text-center lg:text-left hidden lg:inline-block">{item.label}</span>
                </Link>
              );
            })}

            <Separator className="my-4 hidden lg:block" />

            <div className="space-y-2 hidden lg:block">
              <div className="flex items-center gap-3 px-3 py-2">
                <Wallet className="h-5 w-5" />
                <div>
                  <div className="text-sm">Wallet</div>
                  <div className="text-sm font-medium">${user?.balance ?? 0}.00</div>
                </div>
              </div>

              <Link 
                href="/settings"
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                  location === '/settings'
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                )}
              >
                <Settings className="h-5 w-5" />
                Settings
              </Link>

              <ProDialog /> {/* Replaced Pro button with ProDialog */}
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 md:ml-0 ml-0">
        <div className="container mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}