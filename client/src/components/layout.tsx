import { Link } from "wouter";
import { Home, Briefcase, UserCircle, PlusCircle } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t">
        <div className="container mx-auto px-4">
          <div className="flex justify-around py-2">
            <Link href="/">
              <div className="flex flex-col items-center p-2 cursor-pointer">
                <Home className="h-6 w-6" />
                <span className="text-xs mt-1">Home</span>
              </div>
            </Link>
            <Link href="/tasks">
              <div className="flex flex-col items-center p-2 cursor-pointer">
                <Briefcase className="h-6 w-6" />
                <span className="text-xs mt-1">Tasks</span>
              </div>
            </Link>
            <Link href="/create">
              <div className="flex flex-col items-center p-2 cursor-pointer">
                <PlusCircle className="h-6 w-6" />
                <span className="text-xs mt-1">Create</span>
              </div>
            </Link>
            <Link href="/profile">
              <div className="flex flex-col items-center p-2 cursor-pointer">
                <UserCircle className="h-6 w-6" />
                <span className="text-xs mt-1">Profile</span>
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}