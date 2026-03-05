import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';
import '../services/coin_service.dart';
import '../models/transaction.dart';
import 'receipt_screen.dart';

class TransactionHistoryScreen extends StatefulWidget {
  const TransactionHistoryScreen({super.key});

  @override
  State<TransactionHistoryScreen> createState() => _TransactionHistoryScreenState();
}

class _TransactionHistoryScreenState extends State<TransactionHistoryScreen> {
  TransactionCategory? _selectedCategory;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Transaction History')),
      body: Consumer<CoinService>(
        builder: (context, coinService, _) {
          var txns = coinService.transactions;
          
          if (_selectedCategory != null) {
            txns = txns.where((t) => t.category == _selectedCategory).toList();
          }

          final theme = Theme.of(context);
          final isDark = theme.brightness == Brightness.dark;

          return Column(
            children: [
              // Category Filter Tabs
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
                child: Row(
                  children: [
                    _filterChip('All', null, isDark, theme),
                    const SizedBox(width: 8),
                    _filterChip('Canteen', TransactionCategory.canteen, isDark, theme),
                    const SizedBox(width: 8),
                    _filterChip('Stationery', TransactionCategory.stationery, isDark, theme),
                    const SizedBox(width: 8),
                    _filterChip('Photocopy', TransactionCategory.photocopy, isDark, theme),
                    const SizedBox(width: 8),
                    _filterChip('Other', TransactionCategory.unmapped, isDark, theme),
                  ],
                ),
              ),
              
              Expanded(
                child: txns.isEmpty
                    ? const Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(Icons.receipt_long, size: 72, color: Colors.grey),
                            SizedBox(height: 16),
                            Text(
                              'No transactions found.',
                              style: TextStyle(color: Colors.grey, fontSize: 16),
                            ),
                          ],
                        ),
                      )
                    : ListView.builder(
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                        itemCount: txns.length,
                        itemBuilder: (context, i) => _TransactionTile(txn: txns[i]),
                      ),
              ),
            ],
          );
        },
      ),
    );
  }

  Widget _filterChip(String label, TransactionCategory? category, bool isDark, ThemeData theme) {
    final isSelected = _selectedCategory == category;
    return InkWell(
      onTap: () => setState(() => _selectedCategory = category),
      borderRadius: BorderRadius.circular(20),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        decoration: BoxDecoration(
          color: isSelected 
              ? theme.colorScheme.primary 
              : (isDark ? theme.cardColor : Colors.grey.shade200),
          borderRadius: BorderRadius.circular(20),
          border: isSelected ? null : Border.all(color: isDark ? theme.dividerColor : Colors.transparent),
        ),
        child: Text(
          label,
          style: TextStyle(
            color: isSelected 
                ? Colors.white 
                : (isDark ? Colors.grey.shade300 : Colors.black87),
            fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
            fontSize: 13,
          ),
        ),
      ),
    );
  }
}

class _TransactionTile extends StatelessWidget {
  final Transaction txn;
  const _TransactionTile({required this.txn});

  @override
  Widget build(BuildContext context) {
    final isReward = txn.type == TransactionType.reward;
    final dateStr =
        DateFormat('dd MMM, hh:mm a').format(txn.createdAt);
    final coinText = txn.coinsEarned > 0
        ? '+${txn.coinsEarned} coins'
        : '${txn.coinsEarned} coins';
    final coinColor =
        txn.coinsEarned >= 0 ? Colors.green.shade700 : Colors.red.shade700;

    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: ListTile(
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        leading: CircleAvatar(
          backgroundColor: isReward
              ? Colors.amber.shade100
              : const Color(0xFF030213).withValues(alpha: 0.1),
          child: Icon(
            isReward ? Icons.card_giftcard : Icons.payment,
            color: isReward ? Colors.amber.shade800 : const Color(0xFF030213),
          ),
        ),
        title: Text(
          txn.merchantName,
          style: const TextStyle(fontWeight: FontWeight.bold),
        ),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (!isReward)
              Text(
                '₹${txn.amount.toStringAsFixed(2)}',
                style: const TextStyle(fontSize: 13),
              ),
            Text(dateStr, style: const TextStyle(fontSize: 12, color: Colors.grey)),
          ],
        ),
        trailing: Text(
          coinText,
          style: TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 14,
            color: coinColor,
          ),
        ),
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (_) => ReceiptScreen(transaction: txn),
            ),
          );
        },
      ),
    );
  }
}
