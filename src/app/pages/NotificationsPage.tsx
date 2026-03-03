import { ArrowLeft, CheckCircle, Gift, AlertCircle, TrendingUp, Clock } from "lucide-react";
import { useNavigate } from "react-router";

interface Notification {
  id: string;
  type: "success" | "reward" | "alert" | "info";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export function NotificationsPage() {
  const navigate = useNavigate();

  const notifications: Notification[] = [
    {
      id: "1",
      type: "reward",
      title: "KiiT Coins Earned!",
      message: "You earned 25 KiiT Coins from your transaction at Campus Canteen",
      time: "5 min ago",
      read: false
    },
    {
      id: "2",
      type: "success",
      title: "Payment Successful",
      message: "₹150 paid to Campus Stationary",
      time: "1 hour ago",
      read: false
    },
    {
      id: "3",
      type: "info",
      title: "Level Up!",
      message: "Congratulations! You've reached Level 3. New coupons unlocked!",
      time: "3 hours ago",
      read: true
    },
    {
      id: "4",
      type: "alert",
      title: "Coupon Expiring Soon",
      message: "Your 'Canteen Special' coupon expires in 2 days",
      time: "1 day ago",
      read: true
    },
    {
      id: "5",
      type: "success",
      title: "Payment Successful",
      message: "₹75 paid to Campus Café",
      time: "2 days ago",
      read: true
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case "reward":
        return <Gift className="w-6 h-6 text-amber-600" />;
      case "alert":
        return <AlertCircle className="w-6 h-6 text-orange-600" />;
      case "info":
        return <TrendingUp className="w-6 h-6 text-blue-600" />;
      default:
        return <Clock className="w-6 h-6 text-gray-600" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-100";
      case "reward":
        return "bg-amber-100";
      case "alert":
        return "bg-orange-100";
      case "info":
        return "bg-blue-100";
      default:
        return "bg-gray-100";
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="size-full min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-sm text-purple-600">{unreadCount} unread</p>
              )}
            </div>
          </div>
          <button className="text-sm text-purple-600 font-medium">
            Mark all as read
          </button>
        </div>
      </header>

      <div className="p-4 pb-20">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Clock className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-500 text-center">No notifications yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow ${
                  !notification.read ? 'border-l-4 border-purple-600' : ''
                }`}
              >
                <div className="flex gap-4">
                  <div className={`w-12 h-12 rounded-full ${getBgColor(notification.type)} flex items-center justify-center flex-shrink-0`}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className={`font-semibold text-gray-800 ${!notification.read ? 'text-purple-900' : ''}`}>
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <span className="w-2 h-2 rounded-full bg-purple-600 flex-shrink-0 mt-1.5"></span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{notification.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
