import { ArrowLeft, Coffee, Book, Utensils, ShoppingBag, Minus, Plus } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";

interface RedeemItem {
  id: string;
  name: string;
  category: string;
  icon: typeof Coffee;
  coinsRequired: number;
  image: string;
  vendor: string;
}

export function RedeemPage() {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<Map<string, number>>(new Map());
  
  const userCoins = 450;

  const redeemItems: RedeemItem[] = [
    {
      id: "1",
      name: "Coffee",
      category: "Canteen",
      icon: Coffee,
      coinsRequired: 50,
      image: "☕",
      vendor: "Campus Café"
    },
    {
      id: "2",
      name: "Sandwich",
      category: "Canteen",
      icon: Utensils,
      coinsRequired: 100,
      image: "🥪",
      vendor: "Campus Café"
    },
    {
      id: "3",
      name: "Notebook (80 pages)",
      category: "Stationary",
      icon: Book,
      coinsRequired: 75,
      image: "📓",
      vendor: "Campus Store"
    },
    {
      id: "4",
      name: "Pen Set (5 pcs)",
      category: "Stationary",
      icon: Book,
      coinsRequired: 60,
      image: "🖊️",
      vendor: "Campus Store"
    },
    {
      id: "5",
      name: "Combo Meal",
      category: "Food Court",
      icon: Utensils,
      coinsRequired: 150,
      image: "🍱",
      vendor: "Food Court"
    },
    {
      id: "6",
      name: "Snack Box",
      category: "Canteen",
      icon: ShoppingBag,
      coinsRequired: 80,
      image: "🍿",
      vendor: "Campus Café"
    }
  ];

  const updateQuantity = (itemId: string, change: number) => {
    const newMap = new Map(selectedItems);
    const current = newMap.get(itemId) || 0;
    const newValue = Math.max(0, current + change);
    
    if (newValue === 0) {
      newMap.delete(itemId);
    } else {
      newMap.set(itemId, newValue);
    }
    
    setSelectedItems(newMap);
  };

  const getTotalCoins = () => {
    let total = 0;
    selectedItems.forEach((quantity, itemId) => {
      const item = redeemItems.find(i => i.id === itemId);
      if (item) {
        total += item.coinsRequired * quantity;
      }
    });
    return total;
  };

  const totalCoins = getTotalCoins();
  const canRedeem = totalCoins > 0 && totalCoins <= userCoins;

  return (
    <div className="size-full min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4 p-4">
          <button
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-800">Redeem KiiT Coins</h1>
            <p className="text-sm text-gray-500">Available: {userCoins} coins</p>
          </div>
        </div>
      </header>

      <div className="p-4 pb-32">
        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {redeemItems.map((item) => {
            const quantity = selectedItems.get(item.id) || 0;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-4">
                  {/* Item Image/Icon */}
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center text-4xl">
                    {item.image}
                  </div>

                  {/* Item Details */}
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{item.name}</h3>
                    <p className="text-xs text-gray-500 mb-2">{item.vendor}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                        {item.category}
                      </span>
                      <span className="text-sm font-bold text-amber-600">
                        {item.coinsRequired} coins
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={quantity === 0}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-semibold">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center hover:bg-purple-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  {quantity > 0 && (
                    <span className="text-sm font-semibold text-purple-600">
                      {item.coinsRequired * quantity} coins
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Checkout Footer */}
      {selectedItems.size > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-2xl">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500">Total Cost</p>
                <p className="text-2xl font-bold text-gray-800">{totalCoins} coins</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Remaining</p>
                <p className={`text-2xl font-bold ${canRedeem ? 'text-green-600' : 'text-red-600'}`}>
                  {userCoins - totalCoins} coins
                </p>
              </div>
            </div>
            <button
              disabled={!canRedeem}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {canRedeem ? 'Redeem Now' : 'Insufficient Coins'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
