import { Bell } from "lucide-react";
import { useState } from "react";

export function NotificationButton() {
  const [hasNotification] = useState(true);

  return (
    <button
      className="relative w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
      aria-label="Notifications"
    >
      <Bell className="w-5 h-5 text-gray-700" />
      {hasNotification && (
        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
      )}
    </button>
  );
}
