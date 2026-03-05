import 'dart:math';
import 'package:flutter/material.dart';
import 'home_screen.dart';

/// Full-page payment success screen with animated checkmark,
/// particle confetti, and coin earned display.
class PaymentSuccessScreen extends StatefulWidget {
  final String merchantName;
  final double amount;
  final int coinsEarned;

  const PaymentSuccessScreen({
    super.key,
    required this.merchantName,
    required this.amount,
    required this.coinsEarned,
  });

  @override
  State<PaymentSuccessScreen> createState() => _PaymentSuccessScreenState();
}

class _PaymentSuccessScreenState extends State<PaymentSuccessScreen>
    with TickerProviderStateMixin {
  late AnimationController _checkController;
  late AnimationController _confettiController;
  late AnimationController _coinController;

  late Animation<double> _checkScale;
  late Animation<double> _checkOpacity;
  late Animation<double> _coinBounce;
  late Animation<double> _cardSlide;

  final List<_Particle> _particles = [];
  final Random _rng = Random();

  @override
  void initState() {
    super.initState();

    // Spawn confetti particles
    for (int i = 0; i < 30; i++) {
      _particles.add(_Particle(_rng));
    }

    _checkController = AnimationController(
        vsync: this, duration: const Duration(milliseconds: 600));
    _confettiController = AnimationController(
        vsync: this, duration: const Duration(milliseconds: 2000));
    _coinController = AnimationController(
        vsync: this, duration: const Duration(milliseconds: 800));

    _checkScale = Tween<double>(begin: 0, end: 1).animate(CurvedAnimation(
        parent: _checkController, curve: Curves.elasticOut));
    _checkOpacity = Tween<double>(begin: 0, end: 1).animate(CurvedAnimation(
        parent: _checkController, curve: const Interval(0, 0.4)));
    _coinBounce = Tween<double>(begin: 0, end: 1).animate(CurvedAnimation(
        parent: _coinController, curve: Curves.elasticOut));
    _cardSlide = Tween<double>(begin: 60, end: 0).animate(CurvedAnimation(
        parent: _checkController,
        curve: const Interval(0.3, 1.0, curve: Curves.easeOut)));

    // Chain animations
    Future.delayed(const Duration(milliseconds: 200), () {
      if (mounted) {
        _checkController.forward();
        _confettiController.forward();
      }
    });
    Future.delayed(const Duration(milliseconds: 800), () {
      if (mounted) _coinController.forward();
    });

    // Auto-navigate to home after 4 seconds
    Future.delayed(const Duration(seconds: 4), () {
      if (mounted) _goHome();
    });
  }

  @override
  void dispose() {
    _checkController.dispose();
    _confettiController.dispose();
    _coinController.dispose();
    super.dispose();
  }

  void _goHome() {
    Navigator.pushAndRemoveUntil(
      context,
      MaterialPageRoute(builder: (_) => const HomeScreen()),
      (route) => false,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          // Gradient background
          Container(
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                colors: [Color(0xFF030213), Color(0xFF1B0F5E)],
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
              ),
            ),
          ),

          // Confetti particles
          AnimatedBuilder(
            animation: _confettiController,
            builder: (context, _) {
              return CustomPaint(
                painter: _ConfettiPainter(
                    _particles, _confettiController.value),
                child: const SizedBox.expand(),
              );
            },
          ),

          // Content
          SafeArea(
            child: Center(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(32),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const SizedBox(height: 20),

                    // Animated checkmark circle
                    AnimatedBuilder(
                      animation: _checkController,
                      builder: (context, _) {
                        return FadeTransition(
                          opacity: _checkOpacity,
                          child: ScaleTransition(
                            scale: _checkScale,
                            child: Container(
                              width: 110,
                              height: 110,
                              decoration: BoxDecoration(
                                color:
                                    Colors.white.withValues(alpha: 0.12),
                                shape: BoxShape.circle,
                                border: Border.all(
                                    color: Colors.white.withValues(alpha: 0.3),
                                    width: 2),
                              ),
                              child: const Icon(
                                Icons.check_circle_rounded,
                                color: Color(0xFF4CAF50),
                                size: 80,
                              ),
                            ),
                          ),
                        );
                      },
                    ),

                    const SizedBox(height: 28),

                    // Title
                    AnimatedBuilder(
                      animation: _cardSlide,
                      builder: (context, child) => Transform.translate(
                        offset: Offset(0, _cardSlide.value),
                        child: child,
                      ),
                      child: Column(
                        children: [
                          const Text(
                            'Payment Successful!',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 26,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            'Paid to ${widget.merchantName}',
                            style: TextStyle(
                                color: Colors.white.withValues(alpha: 0.6),
                                fontSize: 14),
                          ),
                        ],
                      ),
                    ),

                    const SizedBox(height: 32),

                    // Amount card
                    AnimatedBuilder(
                      animation: _cardSlide,
                      builder: (context, child) => Transform.translate(
                        offset: Offset(0, _cardSlide.value * 1.2),
                        child: child,
                      ),
                      child: Container(
                        width: double.infinity,
                        padding: const EdgeInsets.all(24),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(22),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withValues(alpha: 0.25),
                              blurRadius: 24,
                              offset: const Offset(0, 10),
                            ),
                          ],
                        ),
                        child: Column(
                          children: [
                            Text(
                              '₹${widget.amount.toStringAsFixed(2)}',
                              style: const TextStyle(
                                fontSize: 44,
                                fontWeight: FontWeight.bold,
                                color: Color(0xFF030213),
                                height: 1,
                              ),
                            ),
                            const SizedBox(height: 6),
                            Text(
                              widget.merchantName,
                              style: TextStyle(
                                  fontSize: 14, color: Colors.grey.shade600),
                            ),
                            const SizedBox(height: 20),
                            const Divider(),
                            const SizedBox(height: 16),

                            // Coins Earned display
                            ScaleTransition(
                              scale: _coinBounce,
                              child: Container(
                                padding: const EdgeInsets.symmetric(
                                    horizontal: 20, vertical: 12),
                                decoration: BoxDecoration(
                                  gradient: const LinearGradient(
                                    colors: [
                                      Color(0xFFFFF9C4),
                                      Color(0xFFFFE082)
                                    ],
                                  ),
                                  borderRadius: BorderRadius.circular(50),
                                  border: Border.all(
                                      color: Colors.amber.shade400, width: 1.5),
                                ),
                                child: Row(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    const Icon(Icons.monetization_on,
                                        color: Colors.amber, size: 26),
                                    const SizedBox(width: 10),
                                    Text(
                                      '+${widget.coinsEarned} Coins Earned!',
                                      style: const TextStyle(
                                        fontWeight: FontWeight.bold,
                                        fontSize: 16,
                                        color: Color(0xFF5D4037),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),

                    const SizedBox(height: 32),

                    // Buttons
                    AnimatedBuilder(
                      animation: _cardSlide,
                      builder: (context, child) => Transform.translate(
                        offset: Offset(0, _cardSlide.value * 1.5),
                        child: child,
                      ),
                      child: Column(
                        children: [
                          SizedBox(
                            width: double.infinity,
                            height: 52,
                            child: ElevatedButton(
                              onPressed: _goHome,
                              style: ElevatedButton.styleFrom(
                                backgroundColor: Colors.white,
                                foregroundColor: const Color(0xFF030213),
                                shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(14)),
                                elevation: 0,
                              ),
                              child: const Text(
                                'Back to Home',
                                style: TextStyle(
                                    fontWeight: FontWeight.bold, fontSize: 15),
                              ),
                            ),
                          ),
                          const SizedBox(height: 12),
                          Text(
                            'Auto-returning to home...',
                            style: TextStyle(
                                color: Colors.white.withValues(alpha: 0.4),
                                fontSize: 12),
                          ),
                        ],
                      ),
                    ),

                    const SizedBox(height: 40),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

// ─── Confetti Particle System ────────────────────────────────────────────────

class _Particle {
  late double x;
  late double dx;
  late double dy;
  late double size;
  late Color color;
  late double rotation;

  _Particle(Random rng) {
    x = rng.nextDouble();
    dx = (rng.nextDouble() - 0.5) * 0.4;
    dy = rng.nextDouble() * 0.5 + 0.3;
    size = rng.nextDouble() * 8 + 5;
    rotation = rng.nextDouble() * pi * 2;
    color = [
      const Color(0xFFFFD700),
      const Color(0xFF6C47FF),
      const Color(0xFF4CAF50),
      const Color(0xFFFF5722),
      const Color(0xFF03A9F4),
      Colors.pink,
    ][rng.nextInt(6)];
  }
}

class _ConfettiPainter extends CustomPainter {
  final List<_Particle> particles;
  final double progress;

  const _ConfettiPainter(this.particles, this.progress);

  @override
  void paint(Canvas canvas, Size size) {
    for (final p in particles) {
      final x = (p.x + p.dx * progress) * size.width;
      final y = (p.dy * progress - 0.05) * size.height;
      if (y < 0 || y > size.height) continue;

      final paint = Paint()..color = p.color.withValues(alpha: (1 - progress * 0.6));
      canvas.save();
      canvas.translate(x, y);
      canvas.rotate(p.rotation + progress * pi * 2);
      canvas.drawRRect(
        RRect.fromRectAndRadius(
          Rect.fromCenter(
              center: Offset.zero, width: p.size, height: p.size * 0.5),
          const Radius.circular(2),
        ),
        paint,
      );
      canvas.restore();
    }
  }

  @override
  bool shouldRepaint(covariant _ConfettiPainter old) =>
      old.progress != progress;
}
