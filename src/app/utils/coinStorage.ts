// KiiT Coins and Level Management using localStorage

export interface CoinData {
  kiitCoins: number;
  level: number;
  totalTransactions: number;
  transactionsInCurrentLevel: number;
}

const COIN_DATA_KEY = 'campusPay_coinData';
const TRANSACTION_HISTORY_KEY = 'campusPay_coinTransactions';

export interface CoinTransaction {
  id: string;
  type: 'earned' | 'redeemed';
  amount: number;
  description: string;
  date: string;
}

// Get current coin data
export const getCoinData = (): CoinData => {
  const stored = localStorage.getItem(COIN_DATA_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  // Default data
  return {
    kiitCoins: 0,
    level: 1,
    totalTransactions: 0,
    transactionsInCurrentLevel: 0
  };
};

// Save coin data
export const saveCoinData = (data: CoinData) => {
  localStorage.setItem(COIN_DATA_KEY, JSON.stringify(data));
};

// Add coins (from transactions)
export const addCoins = (amount: number, description: string) => {
  const currentData = getCoinData();
  const newData: CoinData = {
    kiitCoins: currentData.kiitCoins + amount,
    totalTransactions: currentData.totalTransactions + 1,
    transactionsInCurrentLevel: currentData.transactionsInCurrentLevel + 1,
    level: currentData.level
  };

  // Level up logic - every 10 transactions
  const transactionsForNextLevel = 10;
  if (newData.transactionsInCurrentLevel >= transactionsForNextLevel) {
    newData.level = newData.level + 1;
    newData.transactionsInCurrentLevel = 0;
  }

  saveCoinData(newData);

  // Save transaction history
  addCoinTransaction({
    id: `CT${Date.now()}`,
    type: 'earned',
    amount: amount,
    description: description,
    date: new Date().toISOString()
  });

  return newData;
};

// Redeem coins
export const redeemCoins = (amount: number, description: string): boolean => {
  const currentData = getCoinData();
  
  // Check if user has enough coins
  if (currentData.kiitCoins < amount) {
    return false;
  }

  const newData: CoinData = {
    ...currentData,
    kiitCoins: currentData.kiitCoins - amount
  };

  saveCoinData(newData);

  // Save transaction history
  addCoinTransaction({
    id: `CT${Date.now()}`,
    type: 'redeemed',
    amount: amount,
    description: description,
    date: new Date().toISOString()
  });

  return true;
};

// Get transactions to next level
export const getTransactionsToNextLevel = (): number => {
  const data = getCoinData();
  const transactionsForNextLevel = 10;
  return transactionsForNextLevel - data.transactionsInCurrentLevel;
};

// Coin transaction history
const addCoinTransaction = (transaction: CoinTransaction) => {
  const stored = localStorage.getItem(TRANSACTION_HISTORY_KEY);
  const history: CoinTransaction[] = stored ? JSON.parse(stored) : [];
  history.unshift(transaction); // Add to beginning
  
  // Keep only last 50 transactions
  if (history.length > 50) {
    history.pop();
  }
  
  localStorage.setItem(TRANSACTION_HISTORY_KEY, JSON.stringify(history));
};

export const getCoinTransactions = (): CoinTransaction[] => {
  const stored = localStorage.getItem(TRANSACTION_HISTORY_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Reset coins (for testing or new user)
export const resetCoins = () => {
  localStorage.removeItem(COIN_DATA_KEY);
  localStorage.removeItem(TRANSACTION_HISTORY_KEY);
};
