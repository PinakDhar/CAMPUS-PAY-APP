import 'dart:math';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/transaction.dart';

class CoinService extends ChangeNotifier {
  int _coinBalance = 0;
  List<Transaction> _transactions = [];
  bool _isLoading = true;

  int get coinBalance => _coinBalance;
  List<Transaction> get transactions => List.unmodifiable(_transactions);
  bool get isLoading => _isLoading;

  CoinService() {
    _loadData();
  }

  Future<void> _loadData() async {
    final prefs = await SharedPreferences.getInstance();
    _coinBalance = prefs.getInt('coinBalance') ?? 0;

    final txJson = prefs.getStringList('transactions') ?? [];
    _transactions = txJson
        .map((e) => Transaction.fromJson(e))
        .toList()
      ..sort((a, b) => b.createdAt.compareTo(a.createdAt));

    _isLoading = false;
    notifyListeners();
  }

  Future<void> _saveData() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setInt('coinBalance', _coinBalance);
    await prefs.setStringList(
      'transactions',
      _transactions.map((t) => t.toJson()).toList(),
    );
  }

  /// Logs a successful payment and awards coins.
  Future<int> recordPayment({
    required String merchantName,
    required String merchantUpiId,
    required double amount,
  }) async {
    final earned = (amount / 10).floor();
    
    // Simple category matching logic based on Merchant UPI ID
    TransactionCategory cat = TransactionCategory.unmapped;
    final lowerId = merchantUpiId.toLowerCase();
    if (lowerId.contains('canteen') || lowerId.contains('food') || lowerId.contains('cafe')) {
      cat = TransactionCategory.canteen;
    } else if (lowerId.contains('stationery') || lowerId.contains('store')) {
      cat = TransactionCategory.stationery;
    } else if (lowerId.contains('photo') || lowerId.contains('print')) {
      cat = TransactionCategory.photocopy;
    }

    final tx = Transaction(
      id: _generateId(),
      merchantName: merchantName,
      merchantUpiId: merchantUpiId,
      amount: amount,
      coinsEarned: earned,
      type: TransactionType.payment,
      status: TransactionStatus.success,
      category: cat,
      createdAt: DateTime.now(),
    );

    _transactions.insert(0, tx);
    _coinBalance += earned;
    await _saveData();
    notifyListeners();
    return earned;
  }

  /// Spends coins for a reward. Returns true if successful.
  Future<bool> spendCoins(int amount, {String rewardName = 'Reward'}) async {
    if (_coinBalance < amount) return false;

    final tx = Transaction(
      id: _generateId(),
      merchantName: rewardName,
      merchantUpiId: 'rewards@campus',
      amount: 0,
      coinsEarned: -amount,
      type: TransactionType.reward,
      status: TransactionStatus.success,
      createdAt: DateTime.now(),
    );

    _transactions.insert(0, tx);
    _coinBalance -= amount;
    await _saveData();
    notifyListeners();
    return true;
  }

  /// Awards bonus coins (referral, promotions, etc.).
  Future<void> addBonusCoins(int amount, String label) async {
    final tx = Transaction(
      id: _generateId(),
      merchantName: label,
      merchantUpiId: 'bonus@campus',
      amount: 0,
      coinsEarned: amount,
      type: TransactionType.bonus,
      status: TransactionStatus.success,
      createdAt: DateTime.now(),
    );
    _transactions.insert(0, tx);
    _coinBalance += amount;
    await _saveData();
    notifyListeners();
  }

  String _generateId() =>
      DateTime.now().millisecondsSinceEpoch.toString() +
      Random().nextInt(9999).toString();
}
