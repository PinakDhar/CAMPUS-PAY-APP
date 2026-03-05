import { ArrowLeft, Building2, CreditCard, Search, Clock, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  ifsc: string;
  holderName: string;
  isSaved: boolean;
}

export function BankTransferPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [amount, setAmount] = useState("");
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddAccount, setShowAddAccount] = useState(false);

  const savedAccounts: BankAccount[] = [
    {
      id: "1",
      bankName: "State Bank of India",
      accountNumber: "1234567890",
      ifsc: "SBIN0001234",
      holderName: "Rajesh Kumar",
      isSaved: true
    },
    {
      id: "2",
      bankName: "HDFC Bank",
      accountNumber: "9876543210",
      ifsc: "HDFC0001234",
      holderName: "Priya Sharma",
      isSaved: true
    }
  ];

  const filteredAccounts = savedAccounts.filter(
    (account) =>
      account.bankName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.holderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.accountNumber.includes(searchQuery)
  );

  const handleTransfer = () => {
    if (selectedAccount && amount) {
      navigate("/select-upi", {
        state: {
          amount: `₹${parseFloat(amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
          recipient: selectedAccount.holderName,
          upiId: selectedAccount.accountNumber,
          isBankTransfer: true
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
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Bank Transfer</h1>
        </div>
      </header>

      <div className="p-4 pb-20 space-y-6">
        {/* Amount Input */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 transition-colors">
          <label className="text-sm text-gray-500 dark:text-gray-400 mb-2 block">Transfer Amount</label>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-gray-800 dark:text-white">₹</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="flex-1 text-3xl font-bold bg-transparent border-none outline-none text-gray-800 dark:text-white placeholder-gray-300 dark:placeholder-gray-600"
            />
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search saved accounts"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white transition-colors"
          />
        </div>

        {/* Saved Accounts */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden transition-colors">
          <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <h2 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Saved Accounts
            </h2>
            <button
              onClick={() => setShowAddAccount(true)}
              className="text-purple-600 dark:text-purple-400 text-sm font-medium hover:underline"
            >
              + Add New
            </button>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {filteredAccounts.map((account) => (
              <button
                key={account.id}
                onClick={() => setSelectedAccount(account)}
                className={`w-full p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left ${
                  selectedAccount?.id === account.id
                    ? "bg-purple-50 dark:bg-purple-900/20"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 dark:text-white truncate">
                      {account.holderName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {account.bankName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      •••• {account.accountNumber.slice(-4)} • {account.ifsc}
                    </p>
                  </div>
                  {selectedAccount?.id === account.id && (
                    <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Add New Account Card */}
        <button
          onClick={() => setShowAddAccount(true)}
          className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700 border-dashed"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <PlusCircle className="w-6 h-6 text-purple-600 dark:text-purple-300" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-gray-800 dark:text-white">Add New Bank Account</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Save account for quick transfers</p>
            </div>
          </div>
        </button>

        {/* Transfer Modes */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 transition-colors">
          <h3 className="font-bold text-gray-800 dark:text-white mb-4">Transfer Mode</h3>
          <div className="space-y-3">
            <button className="w-full p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all text-left">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">IMPS</p>
                  <p className="text-xs opacity-90">Instant (24x7)</p>
                </div>
                <span className="text-xs bg-white/20 px-2 py-1 rounded">Recommended</span>
              </div>
            </button>
            <button className="w-full p-4 bg-gray-100 dark:bg-gray-700 rounded-xl text-left hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">NEFT</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Within 2 hours</p>
                </div>
              </div>
            </button>
            <button className="w-full p-4 bg-gray-100 dark:bg-gray-700 rounded-xl text-left hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">RTGS</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">For amounts ₹2 lakhs+</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      {selectedAccount && amount && parseFloat(amount) > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleTransfer}
            className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all font-semibold"
          >
            Transfer ₹{parseFloat(amount).toLocaleString("en-IN")}
          </button>
        </div>
      )}
    </div>
  );
}
