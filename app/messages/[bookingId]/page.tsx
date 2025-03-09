"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';
import { Send } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
}

export default function MessagesPage() {
  const { bookingId } = useParams();
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchMessages();
  }, [bookingId]);

  const fetchMessages = async () => {
    const response = await fetch(`/api/messages?bookingId=${bookingId}`);
    const data = await response.json();
    setMessages(data);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: newMessage,
          bookingId
        })
      });

      if (response.ok) {
        setNewMessage('');
        fetchMessages();
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <Card className="p-6">
          <div className="h-[600px] flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.user.email === session?.user?.email
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.user.email === session?.user?.email
                        ? 'bg-green-600 text-white'
                        : 'bg-white border'
                    }`}
                  >
                    <div className="text-sm font-medium mb-1">
                      {message.user.name}
                    </div>
                    <p className="text-sm">{message.content}</p>
                    <div className="text-xs mt-1 opacity-70">
                      {format(new Date(message.createdAt), 'HH:mm')}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type je bericht..."
                className="flex-1"
              />
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}