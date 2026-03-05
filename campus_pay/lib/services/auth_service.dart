import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AuthService extends ChangeNotifier {
  static const _keyLoggedIn = 'is_logged_in';
  static const _keyStudentId = 'student_id';
  static const _keyStudentName = 'student_name';
  static const _keyStudentEmail = 'student_email';

  bool _isLoggedIn = false;
  String _studentId = '';
  String _studentName = '';
  String _studentEmail = '';
  bool _isLoading = true;

  bool get isLoggedIn => _isLoggedIn;
  String get studentId => _studentId;
  String get studentName => _studentName;
  String get studentEmail => _studentEmail;
  bool get isLoading => _isLoading;

  AuthService() {
    _loadSession();
  }

  Future<void> _loadSession() async {
    final prefs = await SharedPreferences.getInstance();
    _isLoggedIn = prefs.getBool(_keyLoggedIn) ?? false;
    _studentId = prefs.getString(_keyStudentId) ?? '';
    _studentName = prefs.getString(_keyStudentName) ?? '';
    _studentEmail = prefs.getString(_keyStudentEmail) ?? '';
    _isLoading = false;
    notifyListeners();
  }

  /// MVP mock login — validates that ID starts with 2 and is 10 digits.
  /// In production this would call a real backend API.
  Future<String?> login(String studentId, String password) async {
    // Validate format
    if (studentId.trim().isEmpty || password.trim().isEmpty) {
      return 'Please fill in all fields.';
    }
    if (studentId.trim().length < 8) {
      return 'Student ID must be at least 8 characters.';
    }
    if (password.trim().length < 4) {
      return 'Password must be at least 4 characters.';
    }

    // Simulate network delay
    await Future.delayed(const Duration(seconds: 1));

    // Mock: any valid formatted ID/password works for MVP
    final prefs = await SharedPreferences.getInstance();
    final id = studentId.trim().toUpperCase();
    await prefs.setBool(_keyLoggedIn, true);
    await prefs.setString(_keyStudentId, id);
    await prefs.setString(_keyStudentName, 'Student $id');
    await prefs.setString(_keyStudentEmail, '$id@kiit.ac.in');

    _isLoggedIn = true;
    _studentId = id;
    _studentName = 'Student $id';
    _studentEmail = '$id@kiit.ac.in';
    notifyListeners();
    return null; // null = success
  }

  /// MVP mock signup
  Future<String?> signup(String name, String studentId, String email, String password) async {
    if (name.trim().isEmpty || studentId.trim().isEmpty || email.trim().isEmpty || password.trim().isEmpty) {
      return 'Please fill in all fields.';
    }
    if (studentId.trim().length < 8) {
      return 'Student ID must be at least 8 characters.';
    }
    if (!email.trim().endsWith('@kiit.ac.in')) {
      return 'You must use a valid @kiit.ac.in email.';
    }
    if (password.trim().length < 4) {
      return 'Password must be at least 4 characters.';
    }

    await Future.delayed(const Duration(seconds: 1));

    final prefs = await SharedPreferences.getInstance();
    final id = studentId.trim().toUpperCase();
    await prefs.setBool(_keyLoggedIn, true);
    await prefs.setString(_keyStudentId, id);
    await prefs.setString(_keyStudentName, name.trim());
    await prefs.setString(_keyStudentEmail, email.trim());

    _isLoggedIn = true;
    _studentId = id;
    _studentName = name.trim();
    _studentEmail = email.trim();
    notifyListeners();
    return null;
  }

  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool(_keyLoggedIn, false);
    _isLoggedIn = false;
    _studentId = '';
    _studentName = '';
    _studentEmail = '';
    notifyListeners();
  }
}
