import { ArrowLeft, Search, Calendar, Filter, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";

interface Transaction {
  id: string;
  type: "sent" | "received";
  amount: number;
  recipient: string;
  date: string;
  time: string;
  status: "success" | "pending" | "failed";
  kiitCoinsEarned?: number;
}

export function TransactionHistoryPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const transactions: Transaction[] = [
    {
      id: "T2024030212345678",
      type: "sent",
      amount: 1250,
      recipient: "Campus Canteen",
      date: "03 Mar 2026",
      time: "2:30 PM",
      status: "success",
      kiitCoinsEarned: 25
    },
    {
      id: "T2024030212345677",
      type: "sent",
      amount: 150,
      recipient: "Campus Stationary",
      date: "03 Mar 2026",
      time: "11:15 AM",
      status: "success",
      kiitCoinsEarned: 3
    },
    {
      id: "T2024030212345676",
      type: "received",
      amount: 500,
      recipient: "Priya Sharma",
      date: "02 Mar 2026",
      time: "4:45 PM",
      status: "success"
    },
    {
      id: "T2024030212345675",
      type: "sent",
      amount: 75,
      recipient: "Campus Café",
      date: "01 Mar 2026",
      time: "1:20 PM",
      status: "success",
      kiitCoinsEarned: 2
    },
    {
      id: "T2024030212345674",
      type: "sent",
      amount: 300,
      recipient: "Food Court",
      date: "28 Feb 2026",
      time: "7:30 PM",
      status: "success",
      kiitCoinsEarned: 6
    }
  ];

  const filteredTransactions = transactions.filter(t =>
    t.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="size-full min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">Transaction History</h1>
          </div>

          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center hover:bg-purple-700 transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="p-4 pb-20">
        {filteredTransactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Calendar className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-500 text-center">No transactions found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <button
                key={transaction.id}
                onClick={() => navigate('/transaction-detail', { state: transaction })}
                className="w-full bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow text-left"
              >
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    transaction.type === "sent" 
                      ? "bg-red-100" 
                      : "bg-green-100"
                  }`}>
                    {transaction.type === "sent" ? (
                      <ArrowUpRight className={`w-6 h-6 ${
                        transaction.type === "sent" ? "text-red-600" : "text-green-600"
                      }`} />
                    ) : (
                      <ArrowDownLeft className="w-6 h-6 text-green-600" />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-gray-800 truncate">
                        {transaction.recipient}
                      </h3>
                      <span className={`font-bold text-sm ${
                        transaction.type === "sent" ? "text-red-600" : "text-green-600"
                      }`}>
                        {transaction.type === "sent" ? "-" : "+"}₹{transaction.amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">
                        {transaction.date} • {transaction.time}
                      </p>
                      {transaction.kiitCoinsEarned && (
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                          +{transaction.kiitCoinsEarned} coins
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
