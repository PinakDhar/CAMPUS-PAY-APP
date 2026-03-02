import { Trophy, Gift, Coins, ChevronRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";

interface RewardsCardProps {
  kiitCoins: number;
  level: number;
  transactionsToNextLevel: number;
  maxTransactions: number;
}

export function RewardsCard({ kiitCoins, level, transactionsToNextLevel, maxTransactions }: RewardsCardProps) {
  const navigate = useNavigate();
  const progress = ((maxTransactions - transactionsToNextLevel) / maxTransactions) * 100;

  return (
    <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-3xl shadow-2xl p-6 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm opacity-90">Current Level</p>
              <p className="text-2xl font-bold">Level {level}</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/rewards')}
            className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* KiiT Coins */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-amber-400 rounded-full p-2">
                <Coins className="w-6 h-6 text-amber-900" />
              </div>
              <div>
                <p className="text-sm opacity-90">KiiT Coins</p>
                <p className="text-2xl font-bold">{kiitCoins.toLocaleString()}</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/redeem')}
              className="px-4 py-2 bg-white text-orange-600 rounded-lg font-semibold hover:bg-white/90 transition-colors text-sm"
            >
              Redeem
            </button>
          </div>
        </div>

        {/* Level Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="opacity-90">Progress to Level {level + 1}</span>
            <span className="font-semibold">{maxTransactions - transactionsToNextLevel}/{maxTransactions} transactions</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex items-center gap-2 text-sm opacity-90">
            <Gift className="w-4 h-4" />
            <span>Unlock exclusive coupons at next level!</span>
          </div>
        </div>
      </div>
    </div>
  );
}
