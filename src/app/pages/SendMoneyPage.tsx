import { ArrowLeft, User, Search, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

interface Contact {
  id: string;
  name: string;
  upiId: string;
  avatar: string;
  isFavorite?: boolean;
  lastUsed?: string;
}

export function SendMoneyPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [amount, setAmount] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const recentContacts: Contact[] = [
    {
      id: "1",
      name: "Campus Canteen",
      upiId: "canteen@kiit",
      avatar: "🍽️",
      isFavorite: true,
      lastUsed: "2 hours ago"
    },
    {
      id: "2",
      name: "Campus Stationary",
      upiId: "stationary@kiit",
      avatar: "📚",
      isFavorite: true,
      lastUsed: "Yesterday"
    },
    {
      id: "3",
      name: "Food Court",
      upiId: "foodcourt@kiit",
      avatar: "🍕",
      isFavorite: true,
      lastUsed: "2 days ago"
    },
    {
      id: "4",
      name: "Rahul Sharma",
      upiId: "rahul.sharma@paytm",
      avatar: "👤",
      lastUsed: "3 days ago"
    }
  ];

  const filteredContacts = recentContacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.upiId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProceed = () => {
    if (selectedContact && amount) {
      navigate("/select-upi", {
        state: {
          amount: `₹${parseFloat(amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
          recipient: selectedContact.name,
          upiId: selectedContact.upiId
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
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Send Money</h1>
        </div>
      </header>

      <div className="p-4 pb-20 space-y-6">
        {/* Amount Input */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 transition-colors">
          <label className="text-sm text-gray-500 dark:text-gray-400 mb-2 block">Enter Amount</label>
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
            placeholder="Search UPI ID or phone number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white transition-colors"
          />
        </div>

        {/* Recent & Favorites */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden transition-colors">
          <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <h2 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent & Favorites
            </h2>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {filteredContacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`w-full p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left ${
                  selectedContact?.id === contact.id
                    ? "bg-purple-50 dark:bg-purple-900/20"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl">
                    {contact.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-800 dark:text-white truncate">
                        {contact.name}
                      </p>
                      {contact.isFavorite && (
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {contact.upiId}
                    </p>
                    {contact.lastUsed && (
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        {contact.lastUsed}
                      </p>
                    )}
                  </div>
                  {selectedContact?.id === contact.id && (
                    <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Enter UPI Manually */}
        <button className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <User className="w-6 h-6 text-purple-600 dark:text-purple-300" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-gray-800 dark:text-white">Enter UPI ID Manually</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Add new contact</p>
            </div>
          </div>
        </button>
      </div>

      {/* Fixed Bottom Button */}
      {selectedContact && amount && parseFloat(amount) > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleProceed}
            className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all font-semibold"
          >
            Proceed to Pay ₹{parseFloat(amount).toLocaleString("en-IN")}
          </button>
        </div>
      )}
    </div>
  );
}
