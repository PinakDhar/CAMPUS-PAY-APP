import 'dart:convert';

enum TransactionType { payment, reward, bonus }
enum TransactionStatus { success, failed, pending }
enum TransactionCategory { canteen, stationery, photocopy, unmapped }

class Transaction {
  final String id;
  final String merchantName;
  final String merchantUpiId;
  final double amount;
  final int coinsEarned;
  final TransactionType type;
  final TransactionStatus status;
  final TransactionCategory category;
  final DateTime createdAt;

  Transaction({
    required this.id,
    required this.merchantName,
    required this.merchantUpiId,
    required this.amount,
    required this.coinsEarned,
    required this.type,
    required this.status,
    this.category = TransactionCategory.unmapped,
    required this.createdAt,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'merchantName': merchantName,
      'merchantUpiId': merchantUpiId,
      'amount': amount,
      'coinsEarned': coinsEarned,
      'type': type.index,
      'status': status.index,
      'category': category.index,
      'createdAt': createdAt.millisecondsSinceEpoch,
    };
  }

  factory Transaction.fromMap(Map<String, dynamic> map) {
    return Transaction(
      id: map['id'],
      merchantName: map['merchantName'],
      merchantUpiId: map['merchantUpiId'],
      amount: map['amount'],
      coinsEarned: map['coinsEarned'],
      type: TransactionType.values[map['type']],
      status: TransactionStatus.values[map['status']],
      category: TransactionCategory.values[map['category'] ?? 3], // fallback to unmapped
      createdAt: DateTime.fromMillisecondsSinceEpoch(map['createdAt']),
    );
  }

  String toJson() => json.encode(toMap());
  factory Transaction.fromJson(String source) =>
      Transaction.fromMap(json.decode(source));
}
