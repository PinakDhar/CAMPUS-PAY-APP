import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'coin_service.dart';

class ReferralService extends ChangeNotifier {
  static const _keyReferralCode = 'referral_code';
  static const _keyReferralCount = 'referral_count';
  static const _keyUsedReferral = 'used_referral';

  static const int coinsPerReferral = 20; // coins awarded per successful referral

  String _referralCode = '';
  int _referralCount = 0;
  bool _hasUsedReferral = false;
  bool _isLoading = true;

  String get referralCode => _referralCode;
  int get referralCount => _referralCount;
  bool get hasUsedReferral => _hasUsedReferral;
  bool get isLoading => _isLoading;

  ReferralService() {
    _load();
  }

  Future<void> _load() async {
    final prefs = await SharedPreferences.getInstance();
    _referralCode = prefs.getString(_keyReferralCode) ?? '';
    _referralCount = prefs.getInt(_keyReferralCount) ?? 0;
    _hasUsedReferral = prefs.getBool(_keyUsedReferral) ?? false;
    _isLoading = false;
    notifyListeners();
  }

  /// Generate a unique referral code based on student ID.
  Future<void> generateCode(String studentId) async {
    if (_referralCode.isNotEmpty) return; // already generated

    // e.g. "CP-22052XXX" trimmed to 10 chars
    final base = studentId.replaceAll(RegExp(r'[^A-Z0-9]'), '');
    final code = 'CP-${base.substring(0, base.length.clamp(0, 6))}';
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_keyReferralCode, code);
    _referralCode = code;
    notifyListeners();
  }

  /// MVP: Let a user "apply" someone else's referral code.
  /// Returns null on success, or an error string.
  Future<String?> applyReferralCode(
      String code, CoinService coinService) async {
    if (_hasUsedReferral) return 'You have already applied a referral code.';
    if (code.trim().toUpperCase() == _referralCode) {
      return "You can't use your own referral code!";
    }
    if (!code.trim().toUpperCase().startsWith('CP-')) {
      return 'Invalid referral code format. Should start with CP-';
    }

    // Simulate network call
    await Future.delayed(const Duration(milliseconds: 800));

    // Award coins to the new user
    await coinService.addBonusCoins(
      coinsPerReferral,
      'Referral Bonus',
    );

    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool(_keyUsedReferral, true);
    _hasUsedReferral = true;
    notifyListeners();
    return null; // success
  }

  /// Called when someone uses YOUR referral code (simulated).
  Future<void> incrementReferralCount(CoinService coinService) async {
    _referralCount++;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setInt(_keyReferralCount, _referralCount);
    // Award the referrer
    await coinService.addBonusCoins(
      coinsPerReferral,
      'Referral Reward',
    );
    notifyListeners();
  }
}
