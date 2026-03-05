import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';
import '../services/coin_service.dart';
import '../models/merchant.dart';
import 'payment_success_screen.dart';

class PaymentScreen extends StatefulWidget {
  final String? scannedUpiId;
  final String? scannedMerchantName;
  const PaymentScreen({super.key, this.scannedUpiId, this.scannedMerchantName});

  @override
  State<PaymentScreen> createState() => _PaymentScreenState();
}

class _PaymentScreenState extends State<PaymentScreen> {
  final _amountController = TextEditingController();
  late final TextEditingController _upiIdController;
  late final TextEditingController _merchantNameController;
  bool _isProcessing = false;
  Merchant? _selectedAuthorized;

  // The known UPI apps we can deep-link into, each with its URI prefix
  final List<Map<String, String>> _upiApps = const [
    {
      'name': 'Google Pay',
      'package': 'com.google.android.apps.nbu.paisa.user',
      'icon': 'gpay',
    },
    {
      'name': 'PhonePe',
      'package': 'com.phonepe.app',
      'icon': 'phonepe',
    },
    {
      'name': 'Paytm',
      'package': 'net.one97.paytm',
      'icon': 'paytm',
    },
    {
      'name': 'BHIM',
      'package': 'in.org.npci.upiapp',
      'icon': 'bhim',
    },
  ];

  @override
  void initState() {
    super.initState();
    _upiIdController = TextEditingController(text: widget.scannedUpiId ?? '');
    _merchantNameController =
        TextEditingController(text: widget.scannedMerchantName ?? '');
  }

  Future<void> _initiatePayment() async {
    final amountText = _amountController.text.trim();
    final upiId = _upiIdController.text.trim();
    final merchantName = _merchantNameController.text.trim().isEmpty
        ? 'Campus Merchant'
        : _merchantNameController.text.trim();

    if (amountText.isEmpty || double.tryParse(amountText) == null) {
      _showSnack('Please enter a valid amount.');
      return;
    }
    if (upiId.isEmpty || !upiId.contains('@')) {
      _showSnack('Please enter a valid UPI ID (e.g. canteen@upi).');
      return;
    }

    final amount = double.parse(amountText);

    // Show UPI app chooser
    if (!mounted) return;
    _showUpiChooser(
      upiId: upiId,
      merchantName: merchantName,
      amount: amount,
    );
  }

  void _showUpiChooser({
    required String upiId,
    required String merchantName,
    required double amount,
  }) {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (ctx) {
        return Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Pay ₹$amount to $merchantName',
                style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
              const Text(
                'Choose a UPI app to continue',
                style: TextStyle(color: Colors.grey, fontSize: 13),
              ),
              const SizedBox(height: 20),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: _upiApps.map((app) {
                  return GestureDetector(
                    onTap: () {
                      Navigator.pop(ctx);
                      _launchUpiIntent(
                        upiId: upiId,
                        merchantName: merchantName,
                        amount: amount,
                        packageHint: app['package']!,
                      );
                    },
                    child: Column(
                      children: [
                        Container(
                          width: 60,
                          height: 60,
                          decoration: BoxDecoration(
                            color: Colors.grey.shade100,
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(color: Colors.grey.shade300),
                          ),
                          child: const Icon(Icons.payment, size: 28),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          app['name']!,
                          style: const TextStyle(fontSize: 12),
                          textAlign: TextAlign.center,
                        ),
                      ],
                    ),
                  );
                }).toList(),
              ),
              const SizedBox(height: 16),
            ],
          ),
        );
      },
    );
  }

  Future<void> _launchUpiIntent({
    required String upiId,
    required String merchantName,
    required double amount,
    required String packageHint,
  }) async {
    setState(() => _isProcessing = true);

    final encodedName = Uri.encodeComponent(merchantName);
    final upiUrl =
        'upi://pay?pa=$upiId&pn=$encodedName&am=${amount.toStringAsFixed(2)}&cu=INR&tn=CampusPay';

    // Capture context-sensitive objects BEFORE the first async gap
    final coinService = Provider.of<CoinService>(context, listen: false);
    final messenger = ScaffoldMessenger.of(context);

    try {
      final uri = Uri.parse(upiUrl);
      bool launched = false;
      if (await canLaunchUrl(uri)) {
        await launchUrl(uri, mode: LaunchMode.externalApplication);
        launched = true;
      }

      if (!launched) {
        messenger.showSnackBar(
          const SnackBar(content: Text('Could not open UPI app. Please try another.')),
        );
        setState(() => _isProcessing = false);
        return;
      }

      // MVP: After returning, record the payment.
      await Future.delayed(const Duration(seconds: 2));

      if (!mounted) return;

      final earned = await coinService.recordPayment(
        merchantName: merchantName,
        merchantUpiId: upiId,
        amount: amount,
      );

      if (!mounted) return;

      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (_) => PaymentSuccessScreen(
            merchantName: merchantName,
            amount: amount,
            coinsEarned: earned,
          ),
        ),
      );
    } catch (e) {
      messenger.showSnackBar(SnackBar(content: Text('Error: $e')));
    } finally {
      if (mounted) setState(() => _isProcessing = false);
    }
  }

  void _showSnack(String msg) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(msg)));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Make a Payment')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Authorized Merchants quick pick
            const Text(
              'Authorized Stores',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 10),
            SizedBox(
              height: 88,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                itemCount: authorizedMerchants.length,
                separatorBuilder: (_, __) => const SizedBox(width: 12),
                itemBuilder: (context, i) {
                  final m = authorizedMerchants[i];
                  final isSelected = _selectedAuthorized?.id == m.id;
                  return GestureDetector(
                    onTap: () {
                      setState(() {
                        _selectedAuthorized = m;
                        _upiIdController.text = m.upiId;
                        _merchantNameController.text = m.name;
                      });
                    },
                    child: Container(
                      width: 110,
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: isSelected
                            ? const Color(0xFF030213)
                            : Colors.white,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(
                          color: isSelected
                              ? const Color(0xFF030213)
                              : Colors.grey.shade300,
                          width: 2,
                        ),
                      ),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(
                            Icons.storefront,
                            color: isSelected ? Colors.white : const Color(0xFF030213),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            m.name,
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              fontSize: 11,
                              color: isSelected ? Colors.white : Colors.black87,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 24),
            const Divider(),
            const SizedBox(height: 16),
            const Text(
              'Or Enter Manually',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: _merchantNameController,
              decoration: const InputDecoration(
                labelText: 'Merchant Name',
                border: OutlineInputBorder(),
                prefixIcon: Icon(Icons.store),
              ),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: _upiIdController,
              decoration: const InputDecoration(
                labelText: 'Merchant UPI ID',
                hintText: 'e.g. canteen@upi',
                border: OutlineInputBorder(),
                prefixIcon: Icon(Icons.alternate_email),
              ),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: _amountController,
              keyboardType:
                  const TextInputType.numberWithOptions(decimal: true),
              decoration: const InputDecoration(
                labelText: 'Amount (₹)',
                border: OutlineInputBorder(),
                prefixIcon: Icon(Icons.currency_rupee),
              ),
            ),
            const SizedBox(height: 24),
            SizedBox(
              height: 54,
              child: ElevatedButton.icon(
                onPressed: _isProcessing ? null : _initiatePayment,
                icon: _isProcessing
                    ? const SizedBox(
                        width: 20,
                        height: 20,
                        child: CircularProgressIndicator(
                          color: Colors.white,
                          strokeWidth: 2,
                        ),
                      )
                    : const Icon(Icons.payment),
                label: Text(
                  _isProcessing ? 'Processing...' : 'Pay via UPI Apps',
                  style: const TextStyle(fontSize: 16),
                ),
              ),
            ),
            const SizedBox(height: 20),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.blue.shade50,
                borderRadius: BorderRadius.circular(10),
                border: Border.all(color: Colors.blue.shade200),
              ),
              child: const Row(
                children: [
                  Icon(Icons.info_outline, color: Colors.blue, size: 18),
                  SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      'Coins are only awarded for authorized college stores. Pay at your canteen or stationery shop!',
                      style: TextStyle(fontSize: 12, color: Colors.blue),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  void dispose() {
    _amountController.dispose();
    _upiIdController.dispose();
    _merchantNameController.dispose();
    super.dispose();
  }
}
