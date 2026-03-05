import { ArrowLeft, Download, Share2, Copy, CheckCircle, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import { useTheme } from "../context/ThemeContext";
import html2canvas from "html2canvas";
import { useRef } from "react";

export function TransactionDetailPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const location = useLocation();
  const receiptRef = useRef<HTMLDivElement>(null);

  const transaction = location.state || {
    id: "T2024030212345678",
    type: "sent",
    amount: 1250,
    recipient: "Campus Canteen",
    date: "03 Mar 2026",
    time: "2:30 PM",
    status: "success",
    kiitCoinsEarned: 25
  };

  const handleDownload = async () => {
    if (receiptRef.current) {
      try {
        const canvas = await html2canvas(receiptRef.current, {
          backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
          scale: 2
        });
        
        const link = document.createElement("a");
        link.download = `receipt-${transaction.id}.png`;
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
            const file = new File([blob], `receipt-${transaction.id}.png`, { type: "image/png" });
            
            if (navigator.share && navigator.canShare({ files: [file] })) {
              await navigator.share({
                title: "Transaction Receipt",
                text: `Payment receipt for ₹${transaction.amount}`,
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

  const copyTransactionId = () => {
    navigator.clipboard.writeText(transaction.id);
    alert("Transaction ID copied to clipboard!");
  };

  return (
    <div className="size-full min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4 p-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 dark:text-white" />
          </button>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Transaction Details</h1>
        </div>
      </header>

      <div className="p-4 pb-20">
        {/* Receipt Card */}
        <div 
          ref={receiptRef}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 mb-6 transition-colors"
        >
          {/* Status */}
          <div className="flex flex-col items-center mb-6">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
              transaction.type === "sent" 
                ? "bg-red-100 dark:bg-red-900/30" 
                : "bg-green-100 dark:bg-green-900/30"
            }`}>
              {transaction.type === "sent" ? (
                <ArrowUpRight className="w-10 h-10 text-red-600 dark:text-red-400" />
              ) : (
                <ArrowDownLeft className="w-10 h-10 text-green-600 dark:text-green-400" />
              )}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
              {transaction.type === "sent" ? "Money Sent" : "Money Received"}
            </h2>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
              </span>
            </div>
          </div>

          {/* Amount */}
          <div className="text-center mb-6 pb-6 border-b border-gray-100 dark:border-gray-700">
            <p className={`text-4xl font-bold ${
              transaction.type === "sent" 
                ? "text-red-600 dark:text-red-400" 
                : "text-green-600 dark:text-green-400"
            }`}>
              {transaction.type === "sent" ? "-" : "+"}₹{transaction.amount.toLocaleString("en-IN")}
            </p>
          </div>

          {/* KiiT Coins Earned */}
          {transaction.kiitCoinsEarned && (
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-4 mb-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">KiiT Coins Earned</p>
                  <p className="text-2xl font-bold">+{transaction.kiitCoinsEarned} Coins</p>
                </div>
                <span className="text-3xl">🎁</span>
              </div>
            </div>
          )}

          {/* Transaction Details */}
          <div className="space-y-4">
            <DetailRow label="To/From" value={transaction.recipient} />
            <DetailRow 
              label="Transaction ID" 
              value={transaction.id}
              copyable
              onCopy={copyTransactionId}
            />
            <DetailRow label="Date" value={transaction.date} />
            <DetailRow label="Time" value={transaction.time} />
            <DetailRow 
              label="Status" 
              value={transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
              valueClassName="text-green-600 dark:text-green-400 font-semibold"
            />
          </div>

          {/* Campus Pay Branding */}
          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 text-center">
            <p className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              CAMPUS PAY
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              KIIT University Payment Gateway
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button 
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all"
          >
            <Download className="w-5 h-5" />
            <span className="font-semibold">Download Receipt</span>
          </button>
          
          <button 
            onClick={handleShare}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-white rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700"
          >
            <Share2 className="w-5 h-5" />
            <span className="font-semibold">Share Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
}

interface DetailRowProps {
  label: string;
  value: string;
  valueClassName?: string;
  copyable?: boolean;
  onCopy?: () => void;
}

function DetailRow({ label, value, valueClassName = "text-gray-800 dark:text-white", copyable, onCopy }: DetailRowProps) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
      <div className="flex items-center gap-2">
        <span className={`text-sm font-medium ${valueClassName}`}>{value}</span>
        {copyable && (
          <button
            onClick={onCopy}
            className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
          >
            <Copy className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
