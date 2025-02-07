
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const MESSAGES = [
  {
    id: 1,
    sender: "John Doe",
    content: "Hi! I'm interested in your web development services.",
    time: "10:30 AM",
    isMe: false
  },
  {
    id: 2,
    sender: "Me",
    content: "Hello! Thanks for reaching out. I'd be happy to help. What kind of website are you looking to build?",
    time: "10:32 AM",
    isMe: true
  }
];

export default function Messages() {
  return (
    <div className="space-y-6 h-[calc(100vh-8rem)]">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>

      {MESSAGES.length > 0 ? (
        <Card className="h-full flex flex-col">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {MESSAGES.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.isMe
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <div className="font-medium text-sm mb-1">
                      {message.sender}
                    </div>
                    <div className="text-sm">{message.content}</div>
                    <div className="text-xs mt-1 opacity-70">{message.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input placeholder="Type a message..." />
              <Button size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Card>
          <CardContent className="flex items-center justify-center min-h-[200px] text-muted-foreground">
            <div className="text-center">
              <MessageSquare className="h-8 w-8 mx-auto mb-2" />
              <p>No messages yet</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
