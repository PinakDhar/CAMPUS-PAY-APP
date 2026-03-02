import { Scan, QrCode } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export function QRScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const navigate = useNavigate();

  const handleScan = () => {
    if (!isScanning) {
      setIsScanning(true);
      // Simulate scanning process
      setTimeout(() => {
        setIsScanning(false);
        // Randomly determine if vendor offers rewards (70% chance)
        const isRewardVendor = Math.random() > 0.3;
        const amount = Math.floor(Math.random() * 500) + 50;
        const coinsEarned = isRewardVendor ? Math.floor(amount / 50) : 0;
        
        // Navigate to success page with transaction data
        navigate('/success', {
          state: {
            amount: `₹${amount.toLocaleString()}`,
            recipient: "Campus Canteen",
            upiId: "canteen@kiit",
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
            isRewardVendor: isRewardVendor
          }
        });
      }, 2000);
    } else {
      setIsScanning(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* QR Scanner Frame */}
      <div className="relative">
        {/* Outer glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl blur-2xl"></div>
        
        {/* Scanner container */}
        <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
          <div className="relative w-64 h-64 border-4 border-gray-200 rounded-2xl overflow-hidden">
            {/* Scanning animation overlay */}
            {isScanning && (
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent animate-pulse"></div>
            )}
            
            {/* Corner decorations */}
            <div className="absolute top-2 left-2 w-8 h-8 border-l-4 border-t-4 border-purple-500 rounded-tl-lg"></div>
            <div className="absolute top-2 right-2 w-8 h-8 border-r-4 border-t-4 border-purple-500 rounded-tr-lg"></div>
            <div className="absolute bottom-2 left-2 w-8 h-8 border-l-4 border-b-4 border-purple-500 rounded-bl-lg"></div>
            <div className="absolute bottom-2 right-2 w-8 h-8 border-r-4 border-b-4 border-purple-500 rounded-br-lg"></div>
            
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-6">
                <QrCode className="w-20 h-20 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scan button */}
      <button
        onClick={handleScan}
        className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
      >
        <Scan className="w-5 h-5" />
        <span className="font-semibold">{isScanning ? "Scanning..." : "Scan QR Code"}</span>
      </button>

      {/* Helper text */}
      <p className="text-gray-500 text-sm text-center max-w-xs">
        Scan any UPI QR code to make instant payments
      </p>
    </div>
  );
}