import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/auth_service.dart';
import '../services/coin_service.dart';
import '../models/transaction.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthService>(context);
    final coinService = Provider.of<CoinService>(context);

    final stats = _computeStats(coinService.transactions);
    final tier = _getTier(coinService.coinBalance);

    return Scaffold(
      backgroundColor: const Color(0xFFF4F4F8),
      body: CustomScrollView(
        slivers: [
          // Hero AppBar
          SliverAppBar(
            expandedHeight: 230,
            pinned: true,
            backgroundColor: const Color(0xFF030213),
            flexibleSpace: FlexibleSpaceBar(
              background: _ProfileHeader(
                auth: auth,
                tier: tier,
                totalCoins: coinService.coinBalance,
              ),
            ),
            leading: IconButton(
              icon: const Icon(Icons.arrow_back_ios, color: Colors.white),
              onPressed: () => Navigator.pop(context),
            ),
            actions: [
              TextButton.icon(
                onPressed: () async {
                  final nav = Navigator.of(context);
                  await auth.logout();
                  nav.pop();
                },
                icon: const Icon(Icons.logout, color: Colors.white70, size: 16),
                label: const Text('Logout',
                    style: TextStyle(color: Colors.white70, fontSize: 13)),
              ),
            ],
          ),

          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Tier progress card
                  _TierProgressCard(tier: tier, coins: coinService.coinBalance),
                  const SizedBox(height: 20),

                  // Stats row
                  const Text('Your Stats',
                      style: TextStyle(
                          fontSize: 17, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 12),
                  _StatsRow(stats: stats),
                  const SizedBox(height: 24),

                  // Spending breakdown
                  const Text('Spending Breakdown',
                      style: TextStyle(
                          fontSize: 17, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 12),
                  _SpendingBreakdown(transactions: coinService.transactions),
                  const SizedBox(height: 24),

                  // Achievements
                  const Text('Achievements',
                      style: TextStyle(
                          fontSize: 17, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 12),
                  _Achievements(stats: stats, coins: coinService.coinBalance),
                  const SizedBox(height: 32),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  _Stats _computeStats(List<Transaction> txns) {
    final payments = txns.where((t) => t.type == TransactionType.payment).toList();
    final rewards = txns.where((t) => t.type == TransactionType.reward).toList();
    final totalSpend = payments.fold<double>(0, (s, t) => s + t.amount);
    final totalEarned = payments.fold<int>(0, (s, t) => s + t.coinsEarned);
    final totalSpent = rewards.fold<int>(0, (s, t) => s + t.coinsEarned.abs());
    return _Stats(
      paymentCount: payments.length,
      rewardCount: rewards.length,
      totalSpend: totalSpend,
      totalEarned: totalEarned,
      totalSpent: totalSpent,
    );
  }

  _Tier _getTier(int coins) {
    if (coins >= 500) {
      return _Tier('Platinum', '💎', const Color(0xFF00BCD4), 500, 1000);
    } else if (coins >= 200) {
      return _Tier('Gold', '🥇', const Color(0xFFFFB300), 200, 500);
    } else if (coins >= 50) {
      return _Tier('Silver', '🥈', const Color(0xFF9E9E9E), 50, 200);
    } else {
      return _Tier('Bronze', '🥉', const Color(0xFFBF8F5B), 0, 50);
    }
  }
}

class _Stats {
  final int paymentCount;
  final int rewardCount;
  final double totalSpend;
  final int totalEarned;
  final int totalSpent;
  const _Stats({
    required this.paymentCount,
    required this.rewardCount,
    required this.totalSpend,
    required this.totalEarned,
    required this.totalSpent,
  });
}

class _Tier {
  final String name;
  final String emoji;
  final Color color;
  final int minCoins;
  final int maxCoins;
  const _Tier(this.name, this.emoji, this.color, this.minCoins, this.maxCoins);
}

// ─── Header ──────────────────────────────────────────────────────────────────

class _ProfileHeader extends StatelessWidget {
  final AuthService auth;
  final _Tier tier;
  final int totalCoins;
  const _ProfileHeader(
      {required this.auth, required this.tier, required this.totalCoins});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          colors: [Color(0xFF030213), Color(0xFF1B0F5E), Color(0xFF2A1080)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
      ),
      padding: const EdgeInsets.fromLTRB(24, 80, 24, 24),
      child: Row(
        children: [
          Stack(
            children: [
              CircleAvatar(
                radius: 38,
                backgroundColor: tier.color.withValues(alpha: 0.3),
                child: Text(
                  auth.studentName.isNotEmpty
                      ? auth.studentName[0].toUpperCase()
                      : '?',
                  style: const TextStyle(
                      fontSize: 36,
                      fontWeight: FontWeight.bold,
                      color: Colors.white),
                ),
              ),
              Positioned(
                bottom: 0,
                right: 0,
                child: Container(
                  padding: const EdgeInsets.all(4),
                  decoration: BoxDecoration(
                    color: tier.color,
                    shape: BoxShape.circle,
                    border: Border.all(color: Colors.white, width: 2),
                  ),
                  child: Text(tier.emoji,
                      style: const TextStyle(fontSize: 12)),
                ),
              ),
            ],
          ),
          const SizedBox(width: 18),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  auth.studentName,
                  style: const TextStyle(
                      color: Colors.white,
                      fontSize: 20,
                      fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 4),
                Text(
                  auth.studentId,
                  style: TextStyle(
                      color: Colors.white.withValues(alpha: 0.6),
                      fontSize: 13),
                ),
                const SizedBox(height: 8),
                Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: tier.color.withValues(alpha: 0.25),
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(
                        color: tier.color.withValues(alpha: 0.5), width: 1),
                  ),
                  child: Text(
                    '${tier.emoji} ${tier.name} Member',
                    style: TextStyle(
                        color: tier.color,
                        fontSize: 12,
                        fontWeight: FontWeight.bold),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

// ─── Tier Progress ────────────────────────────────────────────────────────────

class _TierProgressCard extends StatelessWidget {
  final _Tier tier;
  final int coins;
  const _TierProgressCard({required this.tier, required this.coins});

  @override
  Widget build(BuildContext context) {
    final range = tier.maxCoins - tier.minCoins;
    final progress =
        range == 0 ? 1.0 : (coins - tier.minCoins).clamp(0, range) / range;
    final coinsToNext = tier.maxCoins - coins;

    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(18),
        boxShadow: [
          BoxShadow(
              color: Colors.black.withValues(alpha: 0.06),
              blurRadius: 12,
              offset: const Offset(0, 4))
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('${tier.emoji} ${tier.name} Tier',
                  style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 15,
                      color: tier.color)),
              Text('$coins coins',
                  style: const TextStyle(
                      fontWeight: FontWeight.w600, fontSize: 14)),
            ],
          ),
          const SizedBox(height: 12),
          ClipRRect(
            borderRadius: BorderRadius.circular(8),
            child: LinearProgressIndicator(
              value: progress.toDouble(),
              minHeight: 10,
              backgroundColor: Colors.grey.shade200,
              valueColor: AlwaysStoppedAnimation<Color>(tier.color),
            ),
          ),
          const SizedBox(height: 8),
          if (coinsToNext > 0)
            Text(
              '$coinsToNext more coins to reach next tier',
              style: TextStyle(fontSize: 12, color: Colors.grey.shade600),
            )
          else
            const Text('🎉 Maximum tier reached!',
                style: TextStyle(fontSize: 12, color: Colors.green)),
        ],
      ),
    );
  }
}

// ─── Stats Row ───────────────────────────────────────────────────────────────

class _StatsRow extends StatelessWidget {
  final _Stats stats;
  const _StatsRow({required this.stats});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
            child: _StatBox(
                label: 'Payments',
                value: '${stats.paymentCount}',
                icon: Icons.payment,
                color: const Color(0xFF030213))),
        const SizedBox(width: 12),
        Expanded(
            child: _StatBox(
                label: 'Total Spent',
                value: '₹${stats.totalSpend.toStringAsFixed(0)}',
                icon: Icons.currency_rupee,
                color: Colors.blue.shade700)),
        const SizedBox(width: 12),
        Expanded(
            child: _StatBox(
                label: 'Redeemed',
                value: '${stats.rewardCount}',
                icon: Icons.card_giftcard,
                color: Colors.amber.shade700)),
      ],
    );
  }
}

class _StatBox extends StatelessWidget {
  final String label;
  final String value;
  final IconData icon;
  final Color color;
  const _StatBox(
      {required this.label,
      required this.value,
      required this.icon,
      required this.color});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        boxShadow: [
          BoxShadow(
              color: Colors.black.withValues(alpha: 0.05),
              blurRadius: 8,
              offset: const Offset(0, 3))
        ],
      ),
      child: Column(
        children: [
          Icon(icon, color: color, size: 22),
          const SizedBox(height: 8),
          Text(value,
              style: TextStyle(
                  fontWeight: FontWeight.bold, fontSize: 16, color: color)),
          const SizedBox(height: 2),
          Text(label,
              style:
                  TextStyle(fontSize: 10, color: Colors.grey.shade600),
              textAlign: TextAlign.center),
        ],
      ),
    );
  }
}

// ─── Spending Breakdown ──────────────────────────────────────────────────────

class _SpendingBreakdown extends StatelessWidget {
  final List<Transaction> transactions;
  const _SpendingBreakdown({required this.transactions});

  @override
  Widget build(BuildContext context) {
    // Group payments by merchant
    final Map<String, double> byMerchant = {};
    for (final t in transactions) {
      if (t.type == TransactionType.payment) {
        byMerchant[t.merchantName] =
            (byMerchant[t.merchantName] ?? 0) + t.amount;
      }
    }

    if (byMerchant.isEmpty) {
      return Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
            color: Colors.white, borderRadius: BorderRadius.circular(14)),
        child: const Center(
          child: Text('No spending data yet.',
              style: TextStyle(color: Colors.grey)),
        ),
      );
    }

    final total = byMerchant.values.fold<double>(0, (a, b) => a + b);
    final sorted = byMerchant.entries.toList()
      ..sort((a, b) => b.value.compareTo(a.value));

    final colors = [
      const Color(0xFF030213),
      const Color(0xFF6C47FF),
      const Color(0xFF00897B),
      Colors.orange.shade700,
      Colors.pink.shade700,
    ];

    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
          color: Colors.white, borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(
                color: Colors.black.withValues(alpha: 0.05),
                blurRadius: 10,
                offset: const Offset(0, 3))
          ]),
      child: Column(
        children: [
          ...sorted.take(5).toList().asMap().entries.map((entry) {
            final i = entry.key;
            final e = entry.value;
            final pct = e.value / total;
            return Padding(
              padding: const EdgeInsets.only(bottom: 14),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(e.key,
                          style: const TextStyle(
                              fontSize: 13, fontWeight: FontWeight.w600)),
                      Text('₹${e.value.toStringAsFixed(0)}',
                          style: const TextStyle(fontSize: 13)),
                    ],
                  ),
                  const SizedBox(height: 6),
                  ClipRRect(
                    borderRadius: BorderRadius.circular(6),
                    child: LinearProgressIndicator(
                      value: pct,
                      minHeight: 8,
                      backgroundColor: Colors.grey.shade100,
                      valueColor: AlwaysStoppedAnimation<Color>(
                          colors[i % colors.length]),
                    ),
                  ),
                ],
              ),
            );
          }),
        ],
      ),
    );
  }
}

// ─── Achievements ────────────────────────────────────────────────────────────

class _Achievements extends StatelessWidget {
  final _Stats stats;
  final int coins;
  const _Achievements({required this.stats, required this.coins});

  @override
  Widget build(BuildContext context) {
    final badges = <_Badge>[
      _Badge('First Payment', '🎯', 'Made your first payment',
          stats.paymentCount >= 1),
      _Badge('10 Payments', '🏅', 'Made 10 payments',
          stats.paymentCount >= 10),
      _Badge('Centurion', '💯', 'Earned 100+ coins', coins >= 100),
      _Badge('High Roller', '💰', 'Spent ₹500+ at campus',
          stats.totalSpend >= 500),
      _Badge('Redeemer', '🎁', 'Redeemed your first reward',
          stats.rewardCount >= 1),
      _Badge('Loyal', '⭐', 'Made 25+ payments',
          stats.paymentCount >= 25),
    ];

    return Wrap(
      spacing: 12,
      runSpacing: 12,
      children: badges.map((b) => _BadgeChip(badge: b)).toList(),
    );
  }
}

class _Badge {
  final String title;
  final String emoji;
  final String desc;
  final bool unlocked;
  const _Badge(this.title, this.emoji, this.desc, this.unlocked);
}

class _BadgeChip extends StatelessWidget {
  final _Badge badge;
  const _BadgeChip({required this.badge});

  @override
  Widget build(BuildContext context) {
    return Tooltip(
      message: badge.desc,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
        decoration: BoxDecoration(
          color: badge.unlocked
              ? const Color(0xFF030213)
              : Colors.grey.shade100,
          borderRadius: BorderRadius.circular(30),
          border: Border.all(
              color: badge.unlocked
                  ? const Color(0xFF030213)
                  : Colors.grey.shade300),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(badge.emoji,
                style: TextStyle(
                    fontSize: 16,
                    color: badge.unlocked ? null : const Color(0x55000000))),
            const SizedBox(width: 6),
            Text(
              badge.title,
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w600,
                color:
                    badge.unlocked ? Colors.white : Colors.grey.shade400,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
