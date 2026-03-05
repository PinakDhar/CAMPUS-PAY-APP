import 'package:flutter/material.dart';

class AppTheme {
  static const Color primaryColor = Color(0xFF030213); // From --primary
  static const Color backgroundColor = Color(0xFFFFFFFF); // From --background
  static const Color accentColor = Color(0xFFE9EBEF); // From --accent
  static const Color mutedColor = Color(0xFFECECF0); // From --muted
  static const Color destructiveColor = Color(0xFFD4183D); // From --destructive

  static final ThemeData lightTheme = ThemeData(
    useMaterial3: true,
    brightness: Brightness.light,
    primaryColor: primaryColor,
    scaffoldBackgroundColor: backgroundColor,
    colorScheme: ColorScheme.light(
      primary: primaryColor,
      secondary: accentColor,
      surface: backgroundColor,
      error: destructiveColor,
    ),
    appBarTheme: const AppBarTheme(
      backgroundColor: backgroundColor,
      foregroundColor: primaryColor,
      elevation: 0,
      centerTitle: true,
      titleTextStyle: TextStyle(
        color: primaryColor,
        fontSize: 20,
        fontWeight: FontWeight.w600,
      ),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: primaryColor,
        foregroundColor: Colors.white,
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10), // From --radius: 0.625rem
        ),
        textStyle: const TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.w500,
        ),
      ),
    ),
    textTheme: const TextTheme(
      displayLarge: TextStyle(color: primaryColor, fontWeight: FontWeight.bold),
      displayMedium: TextStyle(color: primaryColor, fontWeight: FontWeight.bold),
      bodyLarge: TextStyle(color: primaryColor, fontSize: 16),
      bodyMedium: TextStyle(color: Color(0xFF717182), fontSize: 14), // --muted-foreground
    ),
    cardTheme: CardTheme(
      color: Colors.white,
      elevation: 2,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10),
      ),
    ),
  );

  static final ThemeData darkTheme = ThemeData(
    useMaterial3: true,
    brightness: Brightness.dark,
    primaryColor: const Color(0xFF6C47FF), // Purple accent for dark mode
    scaffoldBackgroundColor: const Color(0xFF030213), // Deep Navy background
    colorScheme: const ColorScheme.dark(
      primary: Color(0xFF6C47FF),
      secondary: Color(0xFF2A1080),
      surface: Color(0xFF131127), // Card backgrounds
      error: Color(0xFFFF5252),
    ),
    appBarTheme: const AppBarTheme(
      backgroundColor: Color(0xFF030213),
      foregroundColor: Colors.white,
      elevation: 0,
      centerTitle: true,
      titleTextStyle: TextStyle(
        color: Colors.white,
        fontSize: 20,
        fontWeight: FontWeight.w600,
      ),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: const Color(0xFF6C47FF),
        foregroundColor: Colors.white,
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10),
        ),
        textStyle: const TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.w500,
        ),
      ),
    ),
    textTheme: const TextTheme(
      displayLarge: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
      displayMedium: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
      bodyLarge: TextStyle(color: Colors.white, fontSize: 16),
      bodyMedium: TextStyle(color: Color(0xFFA0A0B0), fontSize: 14),
    ),
    cardTheme: CardTheme(
      color: const Color(0xFF131127), // Elevated navy cards
      elevation: 4,
      shadowColor: Colors.black.withValues(alpha: 0.4),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10),
        side: const BorderSide(color: Color(0xFF2A1080), width: 1), // Subtle border
      ),
    ),
    bottomNavigationBarTheme: const BottomNavigationBarThemeData(
      backgroundColor: Color(0xFF131127),
      selectedItemColor: Color(0xFF6C47FF),
      unselectedItemColor: Color(0xFFA0A0B0),
    ),
    bottomAppBarTheme: const BottomAppBarTheme(
      color: Color(0xFF131127),
    ),
    dividerTheme: const DividerThemeData(
      color: Color(0xFF2A1080),
      thickness: 1,
    ),
  );
}
