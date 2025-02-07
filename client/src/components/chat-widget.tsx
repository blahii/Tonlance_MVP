import { useEffect, useState, useRef } from "react";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Message } from "@shared/schema";

interface ChatWidgetProps {
  taskId: number;
  userId: number;
}

export function ChatWidget({ taskId, userId }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef<WebSocket>();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'chat' && message.data.taskId === taskId) {
        setMessages(prev => [...prev, message.data]);
      }
    };

    // Load existing messages
    fetch(`/api/tasks/${taskId}/messages`)
      .then(res => res.json())
      .then(setMessages);

    return () => {
      socketRef.current?.close();
    };
  }, [taskId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim() || !socketRef.current) return;

    socketRef.current.send(JSON.stringify({
      type: 'chat',
      data: {
        taskId,
        userId,
        content: newMessage
      }
    }));

    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-[400px] border rounded-lg">
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        {messages.map((message, i) => (
          <div
            key={i}
            className={`mb-2 ${message.userId === userId ? 'ml-auto' : 'mr-auto'}`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-[80%] ${
                message.userId === userId
                  ? 'bg-primary text-primary-foreground ml-auto'
                  : 'bg-secondary'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </ScrollArea>

      <div className="border-t p-4 flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <Button onClick={sendMessage}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
