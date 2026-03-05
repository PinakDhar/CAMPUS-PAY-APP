import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/coin_service.dart';
import '../models/reward_item.dart';
import '../utils/theme.dart';
import 'voucher_screen.dart';

class RewardsScreen extends StatelessWidget {
  const RewardsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(title: const Text('Reward Store')),
      body: Consumer<CoinService>(
        builder: (context, coinService, _) {
          return Column(
            children: [
              // Balance Banner
              Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(vertical: 20),
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: isDark 
                        ? [const Color(0xFF6C47FF), const Color(0xFF2A1080)]
                        : [const Color(0xFF030213), const Color(0xFF1A1040)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                ),
                child: Column(
                  children: [
                    const Text(
                      'Your Coin Balance',
                      style: TextStyle(color: Colors.white70, fontSize: 14),
                    ),
                    const SizedBox(height: 8),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(Icons.monetization_on,
                            color: Colors.amber, size: 32),
                        const SizedBox(width: 8),
                        Text(
                          coinService.coinBalance.toString(),
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 40,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 6),
                    Text(
                      'Earn by paying at authorized stores',
                      style: TextStyle(
                        color: Colors.white.withValues(alpha: 0.6),
                        fontSize: 12,
                      ),
                    ),
                  ],
                ),
              ),
              
              // Flash Deals Section
              const _FlashDealsCarousel(),
              
              // Standard Catalog
              Padding(
                padding: const EdgeInsets.fromLTRB(16, 24, 16, 8),
                child: Align(
                  alignment: Alignment.centerLeft,
                  child: Text(
                    'All Rewards',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: theme.textTheme.displayLarge?.color,
                    ),
                  ),
                ),
              ),
              Expanded(
                child: ListView.builder(
                  padding: const EdgeInsets.all(16),
                  itemCount: rewardCatalog.length,
                  itemBuilder: (context, i) {
                    final item = rewardCatalog[i];
                    final canAfford = coinService.coinBalance >= item.coinCost;
                    return _RewardCard(
                      item: item,
                      canAfford: canAfford,
                      onRedeem: () =>
                          _redeemItem(context, coinService, item),
                    );
                  },
                ),
              ),
            ],
          );
        },
      ),
    );
  }

  void _redeemItem(
      BuildContext context, CoinService coinService, RewardItem item) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text('Redeem ${item.name}?'),
        content: Text(
            'This will cost ${item.coinCost} coins. You currently have ${coinService.coinBalance} coins.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () => Navigator.pop(ctx, true),
            child: const Text('Redeem'),
          ),
        ],
      ),
    );

    if (confirmed == true && context.mounted) {
      final success = await coinService.spendCoins(
        item.coinCost,
        rewardName: item.name,
      );
      if (context.mounted) {
        if (success) {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (_) => VoucherScreen(
                reward: item,
                coinsSpent: item.coinCost,
              ),
            ),
          );
        } else {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Not enough coins!')),
          );
        }
      }
    }
  }
}

class _FlashDealsCarousel extends StatelessWidget {
  const _FlashDealsCarousel();

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    final deals = [
      {'title': 'Lunch Happy Hour', 'desc': '20% off at Main Canteen', 'icon': Icons.fastfood_rounded, 'color': Colors.orange},
      {'title': 'Print Fest', 'desc': '5 Free photocopies today', 'icon': Icons.print_rounded, 'color': Colors.blue},
      {'title': 'Coffee Break', 'desc': 'Save ₹15 on cold coffee', 'icon': Icons.local_cafe_rounded, 'color': Colors.brown},
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 24, 16, 12),
          child: Row(
            children: [
              const Icon(Icons.flash_on_rounded, color: Colors.amber, size: 20),
              const SizedBox(width: 6),
              const Text(
                'Flash Deals',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              const Spacer(),
              Text(
                'Ends in 02:45:10',
                style: TextStyle(fontSize: 12, color: Colors.red.shade400, fontWeight: FontWeight.bold),
              ),
            ],
          ),
        ),
        SizedBox(
          height: 130,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 12),
            itemCount: deals.length,
            itemBuilder: (context, i) {
              final deal = deals[i];
              final color = deal['color'] as Color;
              return Container(
                width: 240,
                margin: const EdgeInsets.symmetric(horizontal: 6),
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [
                      color.withValues(alpha: isDark ? 0.3 : 0.8), 
                      color.withValues(alpha: isDark ? 0.1 : 0.6)
                    ],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(16),
                  border: isDark ? Border.all(color: color.withValues(alpha: 0.5)) : null,
                ),
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Row(
                      children: [
                        Icon(deal['icon'] as IconData, color: Colors.white, size: 28),
                        const Spacer(),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                          decoration: BoxDecoration(
                            color: Colors.white.withValues(alpha: 0.2),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: const Text(
                            'Claim',
                            style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    Text(
                      deal['title'] as String,
                      style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      deal['desc'] as String,
                      style: TextStyle(color: Colors.white.withValues(alpha: 0.9), fontSize: 13),
                    ),
                  ],
                ),
              );
            },
          ),
        ),
      ],
    );
  }
}

class _RewardCard extends StatelessWidget {
  final RewardItem item;
  final bool canAfford;
  final VoidCallback onRedeem;

  const _RewardCard({
    required this.item,
    required this.canAfford,
    required this.onRedeem,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 14),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Row(
          children: [
            Container(
              width: 54,
              height: 54,
              decoration: BoxDecoration(
                color: canAfford
                    ? AppTheme.primaryColor.withValues(alpha: 0.1)
                    : Colors.grey.shade100,
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(
                item.icon,
                color: canAfford ? AppTheme.primaryColor : Colors.grey,
                size: 28,
              ),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    item.name,
                    style: const TextStyle(
                        fontWeight: FontWeight.bold, fontSize: 15),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    item.description,
                    style: const TextStyle(fontSize: 12, color: Colors.grey),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 6),
                  Row(
                    children: [
                      Container(
                        padding:
                            const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: Colors.grey.withValues(alpha: 0.2),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Text(
                          item.category,
                          style: const TextStyle(fontSize: 10, color: Colors.grey),
                        ),
                      ),
                      const SizedBox(width: 6),
                      Container(
                        padding:
                            const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: Colors.green.withValues(alpha: 0.15),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Text(
                          item.savings,
                          style: const TextStyle(
                            fontSize: 10, 
                            color: Colors.green,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(width: 12),
            Column(
              children: [
                Row(
                  children: [
                    const Icon(Icons.monetization_on,
                        color: Colors.amber, size: 16),
                    const SizedBox(width: 2),
                    Text(
                      '${item.coinCost}',
                      style: const TextStyle(
                          fontWeight: FontWeight.bold, fontSize: 15),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                SizedBox(
                  width: 76,
                  child: ElevatedButton(
                    onPressed: canAfford ? onRedeem : null,
                    style: ElevatedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 8),
                    ),
                    child: const Text('Get it', style: TextStyle(fontSize: 12)),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
