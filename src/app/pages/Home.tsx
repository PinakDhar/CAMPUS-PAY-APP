import { ProfileButton } from "../components/ProfileButton";
import { NotificationButton } from "../components/NotificationButton";
import { QRScanner } from "../components/QRScanner";
import { QuickActions } from "../components/QuickActions";
import { RewardsCard } from "../components/RewardsCard";
import { useState, useEffect } from "react";
import { Eye, EyeOff, ChevronDown, ChevronUp } from "lucide-react";

export function Home() {
  const [showBalance, setShowBalance] = useState(false);
  const [showRewards, setShowRewards] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="size-full min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 pb-32">
      {/* Header */}
      <header className="flex items-center justify-between p-4 md:p-6">
        {/* Profile - Left */}
        <ProfileButton />
        
        {/* App Title - Center */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            CAMPUS PAY
          </h1>
        </div>
        
        {/* Notifications - Right */}
        <NotificationButton />
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-4 py-8 md:py-12 gap-8">
        {/* Rewards Dropdown */}
        <div className="w-full max-w-md">
          <button
            onClick={() => setShowRewards(!showRewards)}
            className="w-full flex items-center justify-between bg-white rounded-2xl shadow-md p-4 mb-3 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-full p-2">
                <span className="text-white text-sm font-bold">🎁</span>
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-800">Rewards & Level</p>
                <p className="text-xs text-gray-500">View your progress</p>
              </div>
            </div>
            {showRewards ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
          
          {/* Collapsible Rewards Card */}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              showRewards ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <RewardsCard 
              kiitCoins={450} 
              level={3} 
              transactionsToNextLevel={7}
              maxTransactions={15}
            />
          </div>
        </div>

        {/* QR Scanner - Center */}
        <QRScanner />
        
        {/* Quick Actions */}
        <QuickActions />
      </main>

      {/* Balance Card */}
      <div className={`fixed left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-md transition-all duration-500 ease-in-out z-50 ${
        isScrolled ? 'bottom-[-100px]' : 'bottom-6'
      }`}>
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm text-gray-500">Available Balance</p>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showBalance ? "Hide balance" : "Show balance"}
                >
                  {showBalance ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-2xl font-bold text-gray-800">
                {showBalance ? "₹12,450.00" : "₹••••••"}
              </p>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-shadow">
              Add Money
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}