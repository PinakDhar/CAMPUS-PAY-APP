import { User } from "lucide-react";
import { useNavigate } from "react-router";

export function ProfileButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/profile')}
      className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
      aria-label="Profile"
    >
      <User className="w-5 h-5 text-white" />
    </button>
  );
}