import React, { useState, useEffect } from 'react';
import { Bell, X, Check, AlertCircle, Calendar, MessageSquare, Users, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Notification {
  id: string;
  type: 'match' | 'event' | 'message' | 'reminder' | 'review';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  isNew?: boolean;
}

const NotificationSystem: React.FC = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'match',
      title: 'Neuer Match gefunden!',
      message: 'Max M. sucht auch einen Fußball-Partner in Nordend',
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      read: false,
      actionUrl: '/matches/1',
      isNew: true
    },
    {
      id: '2',
      type: 'event',
      title: 'Event-Update',
      message: 'Basketball Training wurde auf 19:00 verschoben',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      read: false,
      actionUrl: '/events/2',
      isNew: true
    },
    {
      id: '3',
      type: 'message',
      title: 'Neue Nachricht',
      message: 'Anna hat dir eine Nachricht gesendet',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: true,
      actionUrl: '/chat/3',
      isNew: false
    },
    {
      id: '4',
      type: 'reminder',
      title: 'Event-Erinnerung',
      message: 'Dein Yoga-Kurs beginnt in 1 Stunde',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      read: true,
      actionUrl: '/events/4',
      isNew: false
    }
  ]);

  const [showNotifications, setShowNotifications] = useState(false);
  const [showOnlyNew, setShowOnlyNew] = useState(true);

  // Filter notifications based on user preferences and show only new ones by default
  const filteredNotifications = notifications.filter(notification => {
    if (showOnlyNew) {
      return notification.isNew && !notification.read;
    }
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read && n.isNew).length;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'match': return <Users className="w-5 h-5 text-blue-500" />;
      case 'event': return <Calendar className="w-5 h-5 text-green-500" />;
      case 'message': return <MessageSquare className="w-5 h-5 text-purple-500" />;
      case 'reminder': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'review': return <Star className="w-5 h-5 text-orange-500" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `vor ${minutes} Min`;
    } else if (hours < 24) {
      return `vor ${hours} Std`;
    } else {
      return `vor ${days} Tag${days > 1 ? 'en' : ''}`;
    }
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

  // Simulate receiving new notifications
  useEffect(() => {
    if (!user) return;
    
    const interval = setInterval(() => {
      // Randomly add new notifications for demo purposes
      if (Math.random() < 0.05) { // 5% chance every 10 seconds
        const notificationTypes = [
          {
            type: 'match' as const,
            title: 'Neuer Match gefunden!',
            message: 'Jemand mit ähnlichen Interessen sucht einen Partner'
          },
          {
            type: 'event' as const,
            title: 'Event-Änderung',
            message: 'Ein Event in deiner Nähe wurde aktualisiert'
          }
        ];
        
        const randomType = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
        
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: randomType.type,
          title: randomType.title,
          message: randomType.message,
          timestamp: new Date(),
          read: false,
          isNew: true
        };
        
        setNotifications(prev => [newNotification, ...prev.slice(0, 9)]); // Keep only 10 notifications
      }
    }, 15000); // Check every 15 seconds

    return () => clearInterval(interval);
  }, [user]);

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 text-gray-300 hover:text-orange-500 transition-colors duration-200"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {showNotifications && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">
              Benachrichtigungen
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowOnlyNew(!showOnlyNew)}
                className={`text-xs px-2 py-1 rounded transition-colors duration-200 ${
                  showOnlyNew 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {showOnlyNew ? 'Nur Neue' : 'Alle'}
              </button>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-orange-500 hover:text-orange-400 transition-colors duration-200"
                >
                  Alle lesen
                </button>
              )}
              <button
                onClick={() => setShowNotifications(false)}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="p-6 text-center text-gray-400">
                <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>{showOnlyNew ? 'Keine neuen Benachrichtigungen' : 'Keine Benachrichtigungen'}</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200 ${
                    !notification.read && notification.isNew ? 'bg-gray-750' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className={`text-sm font-medium ${
                            !notification.read && notification.isNew ? 'text-white' : 'text-gray-300'
                          }`}>
                            {notification.title}
                          </h4>
                          <p className="text-sm text-gray-400 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {formatTimestamp(notification.timestamp)}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-1 ml-2">
                          {!notification.read && notification.isNew && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1 text-gray-400 hover:text-green-500 transition-colors duration-200"
                              title="Als gelesen markieren"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => removeNotification(notification.id)}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
                            title="Entfernen"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {!notification.read && notification.isNew && (
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-orange-500 rounded-full"></div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {filteredNotifications.length > 0 && (
            <div className="p-3 border-t border-gray-700 text-center">
              <button className="text-sm text-orange-500 hover:text-orange-400 transition-colors duration-200">
                Alle Benachrichtigungen anzeigen
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationSystem;