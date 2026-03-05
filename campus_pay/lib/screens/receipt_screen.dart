import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';
import '../models/transaction.dart' as model;
import '../services/auth_service.dart';

class ReceiptScreen extends StatelessWidget {
  final model.Transaction transaction;

  const ReceiptScreen({
    super.key,
    required this.transaction,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final auth = Provider.of<AuthService>(context, listen: false);

    final isCredit = transaction.type == model.TransactionType.reward ||
        transaction.type == model.TransactionType.bonus;
        
    final amountColor = isCredit ? Colors.green : Colors.redAccent;
    final amountPrefix = isCredit ? '+' : '-';

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      appBar: AppBar(
        title: const Text('Transaction Receipt'),
        elevation: 0,
        backgroundColor: Colors.transparent,
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            children: [
              // Receipt Container
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  color: theme.cardColor,
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: [
                    if (!isDark)
                      BoxShadow(
                        color: Colors.black.withValues(alpha: 0.05),
                        blurRadius: 20,
                        offset: const Offset(0, 10),
                      ),
                  ],
                  border: isDark ? Border.all(color: theme.dividerColor) : null,
                ),
                child: Column(
                  children: [
                    // Header Logo
                    Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: theme.colorScheme.primary.withValues(alpha: 0.1),
                        shape: BoxShape.circle,
                      ),
                      child: Icon(
                        Icons.receipt_long_rounded,
                        size: 40,
                        color: theme.colorScheme.primary,
                      ),
                    ),
                    const SizedBox(height: 20),
                    
                    Text(
                      transaction.merchantName,
                      style: const TextStyle(
                        fontSize: 22,
                        fontWeight: FontWeight.bold,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 8),
                    Text(
                      DateFormat('dd MMM yyyy • hh:mm a').format(transaction.createdAt),
                      style: TextStyle(
                        fontSize: 14,
                        color: isDark ? Colors.grey.shade400 : Colors.grey.shade600,
                      ),
                    ),
                    
                    const SizedBox(height: 30),
                    
                    // Amount
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          amountPrefix,
                          style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: amountColor),
                        ),
                        const SizedBox(width: 4),
                        const Icon(Icons.monetization_on, color: Colors.amber, size: 32),
                        const SizedBox(width: 8),
                        Text(
                          '${transaction.amount}',
                          style: TextStyle(
                            fontSize: 40,
                            fontWeight: FontWeight.bold,
                            color: amountColor,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                      decoration: BoxDecoration(
                        color: isCredit ? Colors.green.withValues(alpha: 0.1) : Colors.red.withValues(alpha: 0.1),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Text(
                        isCredit ? 'Coins Earned' : 'Coins Spent',
                        style: TextStyle(
                          color: amountColor,
                          fontWeight: FontWeight.w600,
                          fontSize: 12,
                        ),
                      ),
                    ),
                    
                    const SizedBox(height: 30),
                    Divider(color: isDark ? theme.dividerColor : Colors.grey.shade300),
                    const SizedBox(height: 20),
                    
                    // Details
                    _ReceiptRow('Transaction ID', transaction.id, isCopyable: true),
                    const SizedBox(height: 16),
                    _ReceiptRow('Student ID', auth.studentId),
                    const SizedBox(height: 16),
                    _ReceiptRow('Type', transaction.type.name.toUpperCase()),
                    const SizedBox(height: 16),
                    _ReceiptRow('Status', 'SUCCESS', valueColor: Colors.green),
                    
                    const SizedBox(height: 20),
                    Divider(color: isDark ? theme.dividerColor : Colors.grey.shade300),
                    const SizedBox(height: 20),
                    
                    // Total Footer
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          'Total Impact',
                          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                        Text(
                          '$amountPrefix${transaction.amount} Coins',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                            color: amountColor,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              
              const SizedBox(height: 32),
              
              // Action Buttons
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: () {},
                      icon: const Icon(Icons.share_rounded, size: 18),
                      label: const Text('Share'),
                      style: OutlinedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 14),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      ),
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: ElevatedButton.icon(
                      onPressed: () {},
                      icon: const Icon(Icons.download_rounded, size: 18),
                      label: const Text('Download'),
                      style: ElevatedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 14),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _ReceiptRow extends StatelessWidget {
  final String label;
  final String value;
  final bool isCopyable;
  final Color? valueColor;

  const _ReceiptRow(this.label, this.value, {this.isCopyable = false, this.valueColor});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          label,
          style: TextStyle(color: Colors.grey.shade600, fontSize: 13),
        ),
        Row(
          children: [
            Text(
              value,
              style: TextStyle(
                fontWeight: FontWeight.w600, 
                fontSize: 14,
                color: valueColor,
              ),
            ),
            if (isCopyable) ...[
              const SizedBox(width: 6),
              const Icon(Icons.copy_rounded, size: 14, color: Colors.grey),
            ],
          ],
        ),
      ],
    );
  }
}
