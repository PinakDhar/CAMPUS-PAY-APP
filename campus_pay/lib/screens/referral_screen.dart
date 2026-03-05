import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import '../services/auth_service.dart';
import '../services/coin_service.dart';
import '../services/referral_service.dart';

class ReferralScreen extends StatefulWidget {
  const ReferralScreen({super.key});

  @override
  State<ReferralScreen> createState() => _ReferralScreenState();
}

class _ReferralScreenState extends State<ReferralScreen>
    with SingleTickerProviderStateMixin {
  final _codeController = TextEditingController();
  bool _isApplying = false;
  String? _errorMsg;
  bool _showSuccess = false;

  late AnimationController _pulseController;
  late Animation<double> _pulseAnim;

  @override
  void initState() {
    super.initState();
    _pulseController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    )..repeat(reverse: true);
    _pulseAnim = Tween<double>(begin: 1.0, end: 1.05).animate(
      CurvedAnimation(parent: _pulseController, curve: Curves.easeInOut),
    );

    // Generate code on first open
    WidgetsBinding.instance.addPostFrameCallback((_) async {
      if (!mounted) return;
      final auth = Provider.of<AuthService>(context, listen: false);
      final referral = Provider.of<ReferralService>(context, listen: false);
      await referral.generateCode(auth.studentId);
    });
  }

  @override
  void dispose() {
    _pulseController.dispose();
    _codeController.dispose();
    super.dispose();
  }

  Future<void> _copyCode(String code) async {
    await Clipboard.setData(ClipboardData(text: code));
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            const Icon(Icons.check_circle, color: Colors.white, size: 18),
            const SizedBox(width: 10),
            Text('Code "$code" copied to clipboard!'),
          ],
        ),
        backgroundColor: Colors.green.shade700,
        duration: const Duration(seconds: 2),
      ),
    );
  }

  Future<void> _applyCode() async {
    final code = _codeController.text.trim().toUpperCase();
    if (code.isEmpty) {
      setState(() => _errorMsg = 'Please enter a referral code.');
      return;
    }

    setState(() {
      _isApplying = true;
      _errorMsg = null;
      _showSuccess = false;
    });

    final referral = Provider.of<ReferralService>(context, listen: false);
    final coins = Provider.of<CoinService>(context, listen: false);
    final error = await referral.applyReferralCode(code, coins);

    if (!mounted) return;
    setState(() {
      _isApplying = false;
      _errorMsg = error;
      _showSuccess = error == null;
    });

    if (error == null) _codeController.clear();
  }

  @override
  Widget build(BuildContext context) {
    final referral = Provider.of<ReferralService>(context);

    return Scaffold(
      backgroundColor: const Color(0xFFF4F4F8),
      appBar: AppBar(
        backgroundColor: const Color(0xFFF4F4F8),
        elevation: 0,
        title: const Text('Refer & Earn',
            style: TextStyle(fontWeight: FontWeight.bold)),
      ),
      body: referral.isLoading
          ? const Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
              padding: const EdgeInsets.all(20),
              child: Column(
                children: [
                  // Hero banner
                  _HeroBanner(
                    pulseAnim: _pulseAnim,
                    referralCode: referral.referralCode,
                    referralCount: referral.referralCount,
                    onCopy: () => _copyCode(referral.referralCode),
                  ),
                  const SizedBox(height: 24),

                  // How it works
                  _HowItWorksCard(),
                  const SizedBox(height: 24),

                  // Apply code section
                  if (!referral.hasUsedReferral) ...[
                    _ApplyCodeCard(
                      controller: _codeController,
                      isApplying: _isApplying,
                      errorMsg: _errorMsg,
                      showSuccess: _showSuccess,
                      onApply: _applyCode,
                    ),
                  ] else ...[
                    _AlreadyAppliedBanner(),
                  ],

                  const SizedBox(height: 32),
                ],
              ),
            ),
    );
  }
}

// ─── Hero Banner ─────────────────────────────────────────────────────────────

class _HeroBanner extends StatelessWidget {
  final Animation<double> pulseAnim;
  final String referralCode;
  final int referralCount;
  final VoidCallback onCopy;

  const _HeroBanner({
    required this.pulseAnim,
    required this.referralCode,
    required this.referralCount,
    required this.onCopy,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(28),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFF030213), Color(0xFF2A1080)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(22),
        boxShadow: [
          BoxShadow(
            color: const Color(0xFF030213).withValues(alpha: 0.35),
            blurRadius: 20,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: Column(
        children: [
          // Pulsing gift icon
          ScaleTransition(
            scale: pulseAnim,
            child: Container(
              width: 72,
              height: 72,
              decoration: BoxDecoration(
                color: Colors.white.withValues(alpha: 0.1),
                shape: BoxShape.circle,
              ),
              child: const Icon(Icons.card_giftcard,
                  color: Colors.amber, size: 40),
            ),
          ),
          const SizedBox(height: 16),
          const Text(
            'Invite Friends,\nEarn Coins Together!',
            textAlign: TextAlign.center,
            style: TextStyle(
              color: Colors.white,
              fontSize: 22,
              fontWeight: FontWeight.bold,
              height: 1.3,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'You & your friend each earn 20 coins\nwhen they join with your code',
            textAlign: TextAlign.center,
            style: TextStyle(
                color: Colors.white.withValues(alpha: 0.6),
                fontSize: 13,
                height: 1.5),
          ),
          const SizedBox(height: 24),

          // Code box
          Container(
            padding:
                const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
            decoration: BoxDecoration(
              color: Colors.white.withValues(alpha: 0.08),
              borderRadius: BorderRadius.circular(14),
              border: Border.all(
                  color: Colors.white.withValues(alpha: 0.2), width: 1.5),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'YOUR REFERRAL CODE',
                      style: TextStyle(
                          color: Colors.white.withValues(alpha: 0.5),
                          fontSize: 10,
                          letterSpacing: 1.2),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      referralCode.isEmpty ? '...' : referralCode,
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        letterSpacing: 2,
                      ),
                    ),
                  ],
                ),
                ElevatedButton.icon(
                  onPressed: onCopy,
                  icon: const Icon(Icons.copy, size: 16),
                  label: const Text('Copy'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.amber.shade600,
                    foregroundColor: Colors.black87,
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10)),
                    padding: const EdgeInsets.symmetric(
                        horizontal: 14, vertical: 10),
                    elevation: 0,
                  ),
                ),
              ],
            ),
          ),

          const SizedBox(height: 16),

          // Referral stats
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.people_alt_outlined,
                  color: Colors.white54, size: 16),
              const SizedBox(width: 6),
              Text(
                '$referralCount friend${referralCount == 1 ? '' : 's'} joined using your code',
                style: const TextStyle(color: Colors.white60, fontSize: 13),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

// ─── How It Works ────────────────────────────────────────────────────────────

class _HowItWorksCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(18),
        boxShadow: [
          BoxShadow(
              color: Colors.black.withValues(alpha: 0.05),
              blurRadius: 10,
              offset: const Offset(0, 3))
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('How It Works',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
          const SizedBox(height: 16),
          _Step(
              n: '1',
              icon: Icons.share_rounded,
              color: const Color(0xFF6C47FF),
              title: 'Share your code',
              subtitle: 'Copy & share it with classmates via WhatsApp or chat'),
          const SizedBox(height: 14),
          _Step(
              n: '2',
              icon: Icons.person_add_rounded,
              color: const Color(0xFF00897B),
              title: 'Friend joins Campus Pay',
              subtitle: 'They sign up and enter your referral code'),
          const SizedBox(height: 14),
          _Step(
              n: '3',
              icon: Icons.monetization_on_rounded,
              color: Colors.amber.shade700,
              title: 'Both of you earn 🎉',
              subtitle: '+20 coins for you, +20 coins for your friend'),
        ],
      ),
    );
  }
}

class _Step extends StatelessWidget {
  final String n;
  final IconData icon;
  final Color color;
  final String title;
  final String subtitle;

  const _Step(
      {required this.n,
      required this.icon,
      required this.color,
      required this.title,
      required this.subtitle});

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          width: 38,
          height: 38,
          decoration: BoxDecoration(
            color: color.withValues(alpha: 0.1),
            shape: BoxShape.circle,
          ),
          child: Icon(icon, color: color, size: 20),
        ),
        const SizedBox(width: 14),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title,
                  style: const TextStyle(
                      fontWeight: FontWeight.w600, fontSize: 14)),
              const SizedBox(height: 2),
              Text(subtitle,
                  style: TextStyle(fontSize: 12, color: Colors.grey.shade600)),
            ],
          ),
        ),
      ],
    );
  }
}

// ─── Apply Code ──────────────────────────────────────────────────────────────

class _ApplyCodeCard extends StatelessWidget {
  final TextEditingController controller;
  final bool isApplying;
  final String? errorMsg;
  final bool showSuccess;
  final VoidCallback onApply;

  const _ApplyCodeCard(
      {required this.controller,
      required this.isApplying,
      required this.errorMsg,
      required this.showSuccess,
      required this.onApply});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(18),
        boxShadow: [
          BoxShadow(
              color: Colors.black.withValues(alpha: 0.05),
              blurRadius: 10,
              offset: const Offset(0, 3))
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Have a Referral Code?',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
          const SizedBox(height: 4),
          Text('Enter a friend\'s code to claim your 20 bonus coins',
              style: TextStyle(fontSize: 12, color: Colors.grey.shade600)),
          const SizedBox(height: 16),
          Row(
            children: [
              Expanded(
                child: TextField(
                  controller: controller,
                  textCapitalization: TextCapitalization.characters,
                  decoration: InputDecoration(
                    hintText: 'e.g. CP-220521',
                    prefixIcon: const Icon(Icons.vpn_key_outlined, size: 20),
                    border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide(color: Colors.grey.shade300)),
                    enabledBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide(color: Colors.grey.shade300)),
                    contentPadding: const EdgeInsets.symmetric(
                        horizontal: 14, vertical: 14),
                    filled: true,
                    fillColor: Colors.grey.shade50,
                  ),
                ),
              ),
              const SizedBox(width: 10),
              SizedBox(
                height: 50,
                child: ElevatedButton(
                  onPressed: isApplying ? null : onApply,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF030213),
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12)),
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    elevation: 0,
                  ),
                  child: isApplying
                      ? const SizedBox(
                          width: 18,
                          height: 18,
                          child: CircularProgressIndicator(
                              color: Colors.white, strokeWidth: 2))
                      : const Text('Apply',
                          style: TextStyle(fontWeight: FontWeight.bold)),
                ),
              ),
            ],
          ),
          if (errorMsg != null) ...[
            const SizedBox(height: 12),
            Row(
              children: [
                Icon(Icons.error_outline,
                    color: Colors.red.shade700, size: 16),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(errorMsg!,
                      style: TextStyle(
                          color: Colors.red.shade700, fontSize: 13)),
                ),
              ],
            ),
          ],
          if (showSuccess) ...[
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.green.shade50,
                borderRadius: BorderRadius.circular(10),
                border: Border.all(color: Colors.green.shade200),
              ),
              child: Row(
                children: [
                  Icon(Icons.check_circle,
                      color: Colors.green.shade700, size: 18),
                  const SizedBox(width: 10),
                  const Expanded(
                    child: Text(
                      '🎉 Code applied! +20 coins added to your balance.',
                      style: TextStyle(
                          fontWeight: FontWeight.w600, fontSize: 13),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ],
      ),
    );
  }
}

class _AlreadyAppliedBanner extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.green.shade50,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: Colors.green.shade200),
      ),
      child: Row(
        children: [
          Icon(Icons.verified_rounded, color: Colors.green.shade700, size: 28),
          const SizedBox(width: 14),
          const Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Referral Code Applied!',
                    style: TextStyle(
                        fontWeight: FontWeight.bold, fontSize: 15)),
                SizedBox(height: 2),
                Text('You already used a referral code — enjoy your 20 coins!',
                    style: TextStyle(fontSize: 13, color: Colors.black54)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
