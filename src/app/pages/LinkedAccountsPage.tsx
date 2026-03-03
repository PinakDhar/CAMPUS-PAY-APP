import { ArrowLeft, Plus, Trash2, CheckCircle, Building2 } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";

interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountType: string;
  isPrimary: boolean;
  isVerified: boolean;
}

export function LinkedAccountsPage() {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);

  const [accounts, setAccounts] = useState<BankAccount[]>([
    {
      id: "1",
      bankName: "State Bank of India",
      accountNumber: "XXXX XXXX 1234",
      ifscCode: "SBIN0001234",
      accountType: "Savings",
      isPrimary: true,
      isVerified: true
    },
    {
      id: "2",
      bankName: "HDFC Bank",
      accountNumber: "XXXX XXXX 5678",
      ifscCode: "HDFC0001234",
      accountType: "Savings",
      isPrimary: false,
      isVerified: true
    }
  ]);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to remove this bank account?")) {
      setAccounts(accounts.filter(acc => acc.id !== id));
    }
  };

  const handleSetPrimary = (id: string) => {
    setAccounts(accounts.map(acc => ({
      ...acc,
      isPrimary: acc.id === id
    })));
  };

  return (
    <div className="size-full min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/profile')}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">Linked Bank Accounts</h1>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white flex items-center justify-center hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="p-4 pb-20">
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Your bank accounts are securely encrypted and used only for UPI transactions.
          </p>
        </div>

        {/* Bank Accounts List */}
        <div className="space-y-4">
          {accounts.map((account) => (
            <div
              key={account.id}
              className={`bg-white rounded-2xl shadow-md p-5 ${
                account.isPrimary ? 'ring-2 ring-purple-500' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{account.bankName}</h3>
                    <p className="text-sm text-gray-500">{account.accountNumber}</p>
                  </div>
                </div>
                {account.isVerified && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">IFSC Code</span>
                  <span className="font-medium text-gray-800">{account.ifscCode}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Account Type</span>
                  <span className="font-medium text-gray-800">{account.accountType}</span>
                </div>
              </div>

              {account.isPrimary && (
                <div className="bg-purple-50 rounded-lg px-3 py-2 mb-3">
                  <p className="text-xs font-medium text-purple-700">⭐ Primary Account</p>
                </div>
              )}

              <div className="flex gap-2">
                {!account.isPrimary && (
                  <button
                    onClick={() => handleSetPrimary(account.id)}
                    className="flex-1 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
                  >
                    Set as Primary
                  </button>
                )}
                <button
                  onClick={() => handleDelete(account.id)}
                  disabled={account.isPrimary}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {accounts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Building2 className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-500 text-center mb-4">No bank accounts linked</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
            >
              Add Your First Account
            </button>
          </div>
        )}

        {/* Add Account Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Add Bank Account</h2>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Bank Name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="text"
                  placeholder="Account Number"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="text"
                  placeholder="IFSC Code"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="">Select Account Type</option>
                  <option value="savings">Savings</option>
                  <option value="current">Current</option>
                </select>
                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                  >
                    Add Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
