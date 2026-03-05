import { CheckCircle, Download, Share2, Home, Coins, Sparkles } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import { useEffect, useRef } from "react";
import { addCoins } from "../utils/coinStorage";
import html2canvas from "html2canvas";
import { useTheme } from "../context/ThemeContext";

interface TransactionData {
  amount: string;
  recipient: string;
  upiId: string;
  transactionId: string;
  dateTime: string;
  status: string;
  kiitCoinsEarned?: number;
  isRewardVendor?: boolean;
}

export function TransactionSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const receiptRef = useRef<HTMLDivElement>(null);
  
  // Get transaction data from navigation state or use default
  const transactionData: TransactionData = location.state || {
    amount: "₹1,250.00",
    recipient: "Rahul Sharma",
    upiId: "rahul.sharma@paytm",
    transactionId: "T2024030212345678",
    dateTime: new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }),
    status: "Success",
    kiitCoinsEarned: 25,
    isRewardVendor: true
  };

  // Add coins when transaction is successful
  useEffect(() => {
    if (transactionData.isRewardVendor && transactionData.kiitCoinsEarned) {
      addCoins(
        transactionData.kiitCoinsEarned, 
        `Payment to ${transactionData.recipient}`
      );
    }
  }, [transactionData.isRewardVendor, transactionData.kiitCoinsEarned, transactionData.recipient]);

  const handleDownload = async () => {
    if (receiptRef.current) {
      try {
        const canvas = await html2canvas(receiptRef.current, {
          backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
          scale: 2
        });
        
        const link = document.createElement("a");
        link.download = `receipt-${transactionData.transactionId}.png`;
        link.href = canvas.toDataURL();
        link.click();
      } catch (error) {
        console.error("Error downloading receipt:", error);
        alert("Failed to download receipt");
      }
    }
  };

  const handleShare = async () => {
    if (receiptRef.current) {
      try {
        const canvas = await html2canvas(receiptRef.current, {
          backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
          scale: 2
        });
        
        canvas.toBlob(async (blob) => {
          if (blob) {
            const file = new File([blob], `receipt-${transactionData.transactionId}.png`, { type: "image/png" });
            
            if (navigator.share && navigator.canShare({ files: [file] })) {
              await navigator.share({
                title: "Transaction Receipt",
                text: `Payment receipt for ${transactionData.amount}`,
                files: [file]
              });
            } else {
              // Fallback: copy to clipboard
              alert("Sharing not supported. Receipt will be copied to clipboard.");
              const item = new ClipboardItem({ "image/png": blob });
              await navigator.clipboard.write([item]);
            }
          }
        });
      } catch (error) {
        console.error("Error sharing receipt:", error);
        alert("Failed to share receipt");
      }
    }
  };

  return (
    <div className="size-full min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Success Animation */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="relative bg-white rounded-full p-6 shadow-2xl">
              <CheckCircle className="w-24 h-24 text-green-500" strokeWidth={2} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mt-6">Payment Successful!</h1>
          <p className="text-gray-500 mt-2">Your transaction has been completed</p>
        </div>

        {/* KiiT Coins Earned - Only show if vendor offers rewards */}
        {transactionData.isRewardVendor && transactionData.kiitCoinsEarned && (
          <div className="bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 rounded-3xl shadow-xl p-6 mb-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-50"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-white/30 backdrop-blur-sm rounded-full p-3 animate-bounce">
                  <Coins className="w-8 h-8 text-white" />
                </div>
                <div className="text-white">
                  <p className="text-sm font-medium opacity-90">You Earned!</p>
                  <p className="text-3xl font-bold">+{transactionData.kiitCoinsEarned} KiiT Coins</p>
                </div>
              </div>
              <Sparkles className="w-8 h-8 text-white opacity-80" />
            </div>
          </div>
        )}

        {/* Transaction Details Card */}
        <div ref={receiptRef} className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
          {/* Amount */}
          <div className="text-center pb-6 border-b border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Amount Paid</p>
            <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {transactionData.amount}
            </p>
          </div>

          {/* Details */}
          <div className="space-y-4 mt-6">
            <DetailRow label="Paid To" value={transactionData.recipient} />
            <DetailRow label="UPI ID" value={transactionData.upiId} />
            <DetailRow label="Transaction ID" value={transactionData.transactionId} />
            <DetailRow label="Date & Time" value={transactionData.dateTime} />
            <DetailRow 
              label="Status" 
              value={transactionData.status}
              valueClassName="text-green-600 font-semibold"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <button 
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
          >
            <Download className="w-5 h-5" />
            <span className="font-semibold">Download Receipt</span>
          </button>
          
          <button 
            onClick={handleShare}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white text-gray-700 rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-200"
          >
            <Share2 className="w-5 h-5" />
            <span className="font-semibold">Share Receipt</span>
          </button>
        </div>

        {/* Back to Home */}
        <button 
          onClick={() => navigate('/')}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 text-purple-600 font-medium hover:bg-white/50 rounded-2xl transition-all"
        >
          <Home className="w-5 h-5" />
          <span>Back to Home</span>
        </button>
      </div>
    </div>
  );
}

interface DetailRowProps {
  label: string;
  value: string;
  valueClassName?: string;
}

function DetailRow({ label, value, valueClassName = "text-gray-800" }: DetailRowProps) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500">{label}</span>
      <span className={`text-sm font-medium ${valueClassName}`}>{value}</span>
    </div>
  );
}