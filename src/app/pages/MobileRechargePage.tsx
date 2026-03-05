import { ArrowLeft, Smartphone, Zap, Phone } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

interface RechargePlan {
  id: string;
  amount: number;
  validity: string;
  data: string;
  type: "popular" | "data" | "unlimited";
}

export function MobileRechargePage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [mobileNumber, setMobileNumber] = useState("");
  const [operator, setOperator] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<RechargePlan | null>(null);

  const operators = ["Airtel", "Jio", "Vi", "BSNL"];

  const plans: RechargePlan[] = [
    {
      id: "1",
      amount: 299,
      validity: "28 days",
      data: "2GB/day",
      type: "popular"
    },
    {
      id: "2",
      amount: 599,
      validity: "84 days",
      data: "2GB/day",
      type: "popular"
    },
    {
      id: "3",
      amount: 719,
      validity: "84 days",
      data: "3GB/day",
      type: "data"
    },
    {
      id: "4",
      amount: 839,
      validity: "84 days",
      data: "Unlimited",
      type: "unlimited"
    }
  ];

  const handleRecharge = () => {
    if (mobileNumber && operator && selectedPlan) {
      navigate("/select-upi", {
        state: {
          amount: `₹${selectedPlan.amount.toFixed(2)}`,
          recipient: "Mobile Recharge",
          upiId: `${mobileNumber}@recharge`,
          isRecharge: true
        }
      });
    }
  };

  return (
    <div className="size-full min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4 p-4">
          <button
            onClick={() => navigate("/")}
            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 dark:text-white" />
          </button>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Mobile Recharge</h1>
        </div>
      </header>

      <div className="p-4 pb-20 space-y-6">
        {/* Mobile Number Input */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 transition-colors">
          <label className="text-sm text-gray-500 dark:text-gray-400 mb-2 block">Mobile Number</label>
          <div className="flex items-center gap-2 mb-4">
            <Phone className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Enter 10-digit mobile number"
              maxLength={10}
              className="flex-1 text-lg font-medium bg-transparent border-none outline-none text-gray-800 dark:text-white placeholder-gray-300 dark:placeholder-gray-600"
            />
          </div>

          {/* Operator Selection */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
            <label className="text-sm text-gray-500 dark:text-gray-400 mb-3 block">Select Operator</label>
            <div className="grid grid-cols-4 gap-2">
              {operators.map((op) => (
                <button
                  key={op}
                  onClick={() => setOperator(op)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all ${
                    operator === op
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {op}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recharge Plans */}
        {mobileNumber.length === 10 && operator && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden transition-colors">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <h2 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Popular Plans
              </h2>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan)}
                  className={`w-full p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left ${
                    selectedPlan?.id === plan.id
                      ? "bg-blue-50 dark:bg-blue-900/20"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-2xl font-bold text-gray-800 dark:text-white">
                          ₹{plan.amount}
                        </p>
                        {plan.type === "popular" && (
                          <span className="px-2 py-0.5 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 text-xs font-medium rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>📅 {plan.validity}</span>
                        <span>📶 {plan.data}</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        Unlimited calls • 100 SMS/day
                      </p>
                    </div>
                    {selectedPlan?.id === plan.id && (
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center ml-4">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quick Recharge */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 transition-colors">
          <h3 className="font-bold text-gray-800 dark:text-white mb-4">Quick Recharge</h3>
          <div className="grid grid-cols-3 gap-3">
            {[99, 149, 199].map((amount) => (
              <button
                key={amount}
                onClick={() =>
                  setSelectedPlan({
                    id: `quick-${amount}`,
                    amount,
                    validity: "Various",
                    data: "Talk Time",
                    type: "data"
                  })
                }
                className="px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl font-bold text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                ₹{amount}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      {mobileNumber.length === 10 && operator && selectedPlan && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleRecharge}
            className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all font-semibold"
          >
            Recharge ₹{selectedPlan.amount}
          </button>
        </div>
      )}
    </div>
  );
}
