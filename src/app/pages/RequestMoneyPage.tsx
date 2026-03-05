import { ArrowLeft, User, Search, Clock, Share2, Copy } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

interface Contact {
  id: string;
  name: string;
  upiId: string;
  avatar: string;
}

export function RequestMoneyPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const recentContacts: Contact[] = [
    {
      id: "1",
      name: "Rahul Sharma",
      upiId: "rahul.sharma@paytm",
      avatar: "👤"
    },
    {
      id: "2",
      name: "Priya Singh",
      upiId: "priya.singh@paytm",
      avatar: "👩"
    },
    {
      id: "3",
      name: "Amit Kumar",
      upiId: "amit.kumar@paytm",
      avatar: "👨"
    }
  ];

  const filteredContacts = recentContacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.upiId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendRequest = () => {
    if (selectedContact && amount) {
      alert(`Payment request of ₹${amount} sent to ${selectedContact.name}`);
      navigate("/");
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
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Request Money</h1>
        </div>
      </header>

      <div className="p-4 pb-20 space-y-6">
        {/* Amount Input */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 transition-colors">
          <label className="text-sm text-gray-500 dark:text-gray-400 mb-2 block">Request Amount</label>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl font-bold text-gray-800 dark:text-white">₹</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="flex-1 text-3xl font-bold bg-transparent border-none outline-none text-gray-800 dark:text-white placeholder-gray-300 dark:placeholder-gray-600"
            />
          </div>
          
          {/* Note */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
            <label className="text-sm text-gray-500 dark:text-gray-400 mb-2 block">Add Note (Optional)</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g., Lunch payment, Split bill..."
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white transition-colors"
            />
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search contacts"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white transition-colors"
          />
        </div>

        {/* Recent Contacts */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden transition-colors">
          <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <h2 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Contacts
            </h2>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {filteredContacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`w-full p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left ${
                  selectedContact?.id === contact.id
                    ? "bg-green-50 dark:bg-green-900/20"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-2xl">
                    {contact.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 dark:text-white truncate">
                      {contact.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {contact.upiId}
                    </p>
                  </div>
                  {selectedContact?.id === contact.id && (
                    <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Share Payment Link */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 transition-colors">
          <h3 className="font-bold text-gray-800 dark:text-white mb-4">Or Share Payment Link</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <Share2 className="w-5 h-5" />
              <span className="font-semibold">Share via WhatsApp</span>
            </button>
            <button className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-white rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-600">
              <Copy className="w-5 h-5" />
              <span className="font-semibold">Copy Payment Link</span>
            </button>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      {selectedContact && amount && parseFloat(amount) > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleSendRequest}
            className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all font-semibold"
          >
            Send Request for ₹{parseFloat(amount).toLocaleString("en-IN")}
          </button>
        </div>
      )}
    </div>
  );
}
