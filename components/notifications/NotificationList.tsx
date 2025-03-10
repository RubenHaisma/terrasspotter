"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNotificationStore } from "@/lib/store";
import { formatDistanceToNow } from "date-fns";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export function NotificationList() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { setUnreadCount } = useNotificationStore();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch("/api/notifications");
      const data = await response.json();
      setNotifications(data);
      
      const unreadCount = data.filter((n: Notification) => !n.read).length;
      setUnreadCount(unreadCount);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      
      setNotifications(notifications.map(n => 
        n.id === id ? { ...n, read: true } : n
      ));
      
      const unreadCount = notifications.filter(n => !n.read && n.id !== id).length;
      setUnreadCount(unreadCount);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <ScrollArea className="h-[300px] w-full">
      {notifications.map((notification) => (
        <Card
          key={notification.id}
          className={`p-4 mb-2 cursor-pointer transition-colors ${
            !notification.read ? "bg-accent" : ""
          }`}
          onClick={() => !notification.read && markAsRead(notification.id)}
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold">{notification.title}</h4>
              <p className="text-sm text-muted-foreground">
                {notification.message}
              </p>
            </div>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(notification.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
        </Card>
      ))}
    </ScrollArea>
  );
}