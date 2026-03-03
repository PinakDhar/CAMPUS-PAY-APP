import { Check } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import { useState } from "react";

interface UPIApp {
  id: string;
  name: string;
  icon: string;
  handle: string;
}

export function UPIAppSelector() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedApp, setSelectedApp] = useState<string | null>(null);

  const scanData = location.state || {
    amount: "₹1,250.00",
    recipient: "Campus Canteen",
    upiId: "canteen@kiit"
  };

  const upiApps: UPIApp[] = [
    { id: "gpay", name: "Google Pay", icon: "🔵", handle: "@okaxis" },
    { id: "phonepe", name: "PhonePe", icon: "🟣", handle: "@ybl" },
    { id: "paytm", name: "Paytm", icon: "🔷", handle: "@paytm" },
    { id: "bhim", name: "BHIM UPI", icon: "🇮🇳", handle: "@upi" },
    { id: "amazonpay", name: "Amazon Pay", icon: "🟠", handle: "@apl" },
    { id: "mobikwik", name: "MobiKwik", icon: "🔴", handle: "@ikwik" }
  ];

  const handlePayment = () => {
    if (!selectedApp) return;

    // Simulate payment processing
    setTimeout(() => {
      const amount = parseInt(scanData.amount.replace(/[₹,]/g, ''));
      const isRewardVendor = Math.random() > 0.3;
      const coinsEarned = isRewardVendor ? Math.floor(amount / 50) : 0;

      navigate('/success', {
        state: {
          amount: scanData.amount,
          recipient: scanData.recipient,
          upiId: scanData.upiId,
          transactionId: `T${Date.now()}`,
          dateTime: new Date().toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }),
          status: "Success",
          kiitCoinsEarned: coinsEarned,
          isRewardVendor: isRewardVendor,
          paymentMethod: upiApps.find(app => app.id === selectedApp)?.name
        }
      });
    }, 1500);
  };

  return (
    <div className="size-full min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm p-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-xl font-bold text-gray-800 text-center">Select Payment App</h1>
        </div>
      </header>

      <div className="flex-1 flex flex-col justify-between p-4 max-w-md mx-auto w-full">
        {/* Payment Details */}
        <div>
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
            <div className="text-center mb-4 pb-4 border-b border-gray-100">
              <p className="text-sm text-gray-500 mb-1">Paying to</p>
              <p className="text-xl font-bold text-gray-800">{scanData.recipient}</p>
              <p className="text-sm text-gray-500">{scanData.upiId}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Amount</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {scanData.amount}
              </p>
            </div>
          </div>

          {/* UPI Apps Grid */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-600 mb-3">Choose your UPI app</p>
            {upiApps.map((app) => (
              <button
                key={app.id}
                onClick={() => setSelectedApp(app.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                  selectedApp === app.id
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'bg-white hover:shadow-md'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-2xl">
                  {app.icon}
                </div>
                <div className="flex-1 text-left">
                  <p className={`font-semibold ${selectedApp === app.id ? 'text-white' : 'text-gray-800'}`}>
                    {app.name}
                  </p>
                  <p className={`text-sm ${selectedApp === app.id ? 'text-white/80' : 'text-gray-500'}`}>
                    {app.handle}
                  </p>
                </div>
                {selectedApp === app.id && (
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                    <Check className="w-5 h-5 text-purple-600" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mt-6">
          <button
            onClick={handlePayment}
            disabled={!selectedApp}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {selectedApp ? 'Pay Now' : 'Select an app to continue'}
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full py-3 text-gray-600 font-medium hover:bg-white/50 rounded-2xl transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
