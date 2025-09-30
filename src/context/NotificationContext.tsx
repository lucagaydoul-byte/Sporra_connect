import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface Notification {
  id: string;
  type: 'match' | 'event' | 'message' | 'reminder' | 'review';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  isNew: boolean;
  actionUrl?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read' | 'isNew'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  checkForEventMatches: (userPreferences: any) => void;
  notifyEventChange: (eventId: string, changeType: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const unreadCount = notifications.filter(n => !n.read && n.isNew).length;

  const addNotification = (notificationData: Omit<Notification, 'id' | 'timestamp' | 'read' | 'isNew'>) => {
    const newNotification: Notification = {
      ...notificationData,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
      isNew: true
    };
    
    setNotifications(prev => [newNotification, ...prev.slice(0, 19)]); // Keep max 20 notifications
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true, isNew: false }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true, isNew: false }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const checkForEventMatches = (userPreferences: any) => {
    // Simulate checking for new events that match user preferences
    if (!user || !userPreferences) return;

    // This would normally be an API call
    setTimeout(() => {
      if (Math.random() < 0.3) { // 30% chance of finding a match
        addNotification({
          type: 'match',
          title: 'Neuer Event-Match!',
          message: `Ein neues ${userPreferences.sports?.[0] || 'Sport'}-Event in deiner Nähe wurde gefunden`,
          actionUrl: '/offers'
        });
      }
    }, 2000);
  };

  const notifyEventChange = (eventId: string, changeType: string) => {
    // Notify about changes to user's booked events
    if (!user) return;

    const changeMessages = {
      'time_change': 'Die Uhrzeit wurde geändert',
      'location_change': 'Der Ort wurde geändert',
      'cancelled': 'Das Event wurde abgesagt',
      'rescheduled': 'Das Event wurde verschoben'
    };

    addNotification({
      type: 'event',
      title: 'Event-Änderung',
      message: changeMessages[changeType as keyof typeof changeMessages] || 'Das Event wurde aktualisiert',
      actionUrl: `/offer/${eventId}`
    });
  };

  // Load notifications from localStorage on mount
  useEffect(() => {
    if (user) {
      const savedNotifications = localStorage.getItem(`notifications_${user.id}`);
      if (savedNotifications) {
        try {
          const parsed = JSON.parse(savedNotifications);
          setNotifications(parsed.map((n: any) => ({
            ...n,
            timestamp: new Date(n.timestamp)
          })));
        } catch (error) {
          console.error('Error loading notifications:', error);
        }
      }
    }
  }, [user]);

  // Save notifications to localStorage when they change
  useEffect(() => {
    if (user && notifications.length > 0) {
      localStorage.setItem(`notifications_${user.id}`, JSON.stringify(notifications));
    }
  }, [notifications, user]);

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      removeNotification,
      checkForEventMatches,
      notifyEventChange
    }}>
      {children}
    </NotificationContext.Provider>
  );
};