import { ArrowLeft, Gift, Tag, Copy, Check, Star, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";

interface Coupon {
  id: string;
  title: string;
  description: string;
  code: string;
  discount: string;
  expiryDate: string;
  category: string;
}

export function RewardsPage() {
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Mock data
  const kiitCoins = 450;
  const level = 3;
  const coupons: Coupon[] = [
    {
      id: "1",
      title: "Canteen Special",
      description: "15% off on all meals",
      code: "CANTEEN15",
      discount: "15% OFF",
      expiryDate: "15 Mar 2026",
      category: "Food"
    },
    {
      id: "2",
      title: "Stationary Discount",
      description: "Buy 2 Get 1 Free on notebooks",
      code: "STAT2G1",
      discount: "Buy 2 Get 1",
      expiryDate: "20 Mar 2026",
      category: "Stationary"
    },
    {
      id: "3",
      title: "Student Special",
      description: "Flat ₹50 off on orders above ₹200",
      code: "STUDENT50",
      discount: "₹50 OFF",
      expiryDate: "31 Mar 2026",
      category: "General"
    }
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="size-full min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4 p-4">
          <button
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Rewards & Coupons</h1>
            <p className="text-sm text-gray-500">Level {level} • {kiitCoins} KiiT Coins</p>
          </div>
        </div>
      </header>

      <div className="p-4 pb-20 space-y-6">
        {/* Level Benefits */}
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-6 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
              <Star className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold">Level {level} Benefits</h2>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Earn 2x coins on food vendors</span>
            </li>
            <li className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Access to exclusive student discounts</span>
            </li>
            <li className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Priority support for transactions</span>
            </li>
          </ul>
        </div>

        {/* Exchange Coupon Code Section */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Gift className="w-6 h-6 text-purple-600" />
            <h2 className="text-lg font-bold text-gray-800">Exchange Coupon Code</h2>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter coupon code"
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
              Redeem
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">Exchange codes for KiiT Coins or special offers</p>
        </div>

        {/* My Coupons */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">My Coupons</h2>
          <div className="space-y-4">
            {coupons.map((coupon) => (
              <div
                key={coupon.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <div className="flex">
                  {/* Left side - Discount badge */}
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6 flex flex-col items-center justify-center min-w-[100px]">
                    <Tag className="w-6 h-6 mb-2" />
                    <p className="text-sm font-bold text-center">{coupon.discount}</p>
                  </div>

                  {/* Right side - Details */}
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-gray-800">{coupon.title}</h3>
                        <p className="text-sm text-gray-600">{coupon.description}</p>
                      </div>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                        {coupon.category}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <code className="text-sm font-mono font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded">
                          {coupon.code}
                        </code>
                        <button
                          onClick={() => handleCopyCode(coupon.code)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          {copiedCode === coupon.code ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500">Exp: {coupon.expiryDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
