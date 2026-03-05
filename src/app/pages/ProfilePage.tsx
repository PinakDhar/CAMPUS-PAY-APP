import { ArrowLeft, User, Mail, Phone, MapPin, Edit, LogOut, Shield, CreditCard, Info, Settings } from "lucide-react";
import { useNavigate } from "react-router";
import { getUserData, logout, formatDate } from "../utils/userStorage";

export function ProfilePage() {
  const navigate = useNavigate();
  const userData = getUserData();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      navigate('/login');
    }
  };

  return (
    <div className="size-full min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4 p-4">
          <button
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Profile</h1>
        </div>
      </header>

      <div className="p-4 pb-20 space-y-6">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-6 text-white shadow-xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl font-bold">
              {userData.avatar}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{userData.name}</h2>
              <p className="text-sm opacity-90">{userData.studentId}</p>
              <p className="text-sm opacity-90">{userData.department}</p>
            </div>
            <button 
              onClick={() => navigate('/edit-profile')}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>
          
          {/* Bio */}
          {userData.bio && userData.bio !== "Welcome to Campus Pay" && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mt-4">
              <p className="text-sm opacity-90">{userData.bio}</p>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-lg">🩸</span>
              </div>
              <div>
                <p className="text-xs text-gray-500">Blood Group</p>
                <p className="font-bold text-gray-800">{userData.bloodGroup}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-lg">🎂</span>
              </div>
              <div>
                <p className="text-xs text-gray-500">Date of Birth</p>
                <p className="text-xs font-bold text-gray-800">{formatDate(userData.dateOfBirth)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Contact Information</h3>
          <div className="space-y-4">
            <InfoRow icon={Mail} label="Email" value={userData.email} />
            <InfoRow icon={Phone} label="Phone" value={userData.phone} />
            <InfoRow icon={MapPin} label="Campus" value="KIIT University, Bhubaneswar" />
          </div>
        </div>

        {/* Academic Details */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Academic Details</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Department</span>
              <span className="text-sm font-medium text-gray-800">{userData.department}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Current Semester</span>
              <span className="text-sm font-medium text-gray-800">{userData.semester}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Student ID</span>
              <span className="text-sm font-medium text-gray-800">{userData.studentId}</span>
            </div>
          </div>
        </div>

        {/* Settings Options */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <button 
            onClick={() => navigate('/linked-accounts')}
            className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
          >
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-purple-600" />
            </div>
            <span className="flex-1 text-left font-medium text-gray-800">Linked Bank Accounts</span>
            <span className="text-gray-400">›</span>
          </button>
          <button 
            onClick={() => navigate('/security-privacy')}
            className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
            <span className="flex-1 text-left font-medium text-gray-800">Security & Privacy</span>
            <span className="text-gray-400">›</span>
          </button>
          <button 
            onClick={() => navigate('/settings')}
            className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
          >
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <Settings className="w-5 h-5 text-indigo-600" />
            </div>
            <span className="flex-1 text-left font-medium text-gray-800">Settings</span>
            <span className="text-gray-400">›</span>
          </button>
          <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <Info className="w-5 h-5 text-green-600" />
            </div>
            <span className="flex-1 text-left font-medium text-gray-800">Help & Support</span>
            <span className="text-gray-400">›</span>
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <LogOut className="w-5 h-5 text-red-600" />
            </div>
            <span className="flex-1 text-left font-medium text-red-600">Logout</span>
            <span className="text-gray-400">›</span>
          </button>
        </div>
      </div>
    </div>
  );
}

interface InfoRowProps {
  icon: typeof Mail;
  label: string;
  value: string;
}

function InfoRow({ icon: Icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
        <Icon className="w-5 h-5 text-purple-600" />
      </div>
      <div className="flex-1">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
}