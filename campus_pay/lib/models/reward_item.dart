import 'package:flutter/material.dart';

class RewardItem {
  final String id;
  final String name;
  final String description;
  final String savings;
  final int coinCost;
  final IconData icon;
  final String category;

  const RewardItem({
    required this.id,
    required this.name,
    required this.description,
    required this.savings,
    required this.coinCost,
    required this.icon,
    required this.category,
  });
}

/// Preconfigured catalog of available reward items
final List<RewardItem> rewardCatalog = [
  const RewardItem(
    id: 'r1',
    name: 'Campus Notebook',
    description: 'A standard 100-page ruled notebook from the stationery store.',
    savings: 'Save ₹40',
    coinCost: 50,
    icon: Icons.menu_book,
    category: 'Stationery',
  ),
  const RewardItem(
    id: 'r2',
    name: 'Free Tea/Coffee',
    description: 'Redeem for one free hot beverage at the college canteen.',
    savings: 'Save ₹15',
    coinCost: 80,
    icon: Icons.local_cafe,
    category: 'Food',
  ),
  const RewardItem(
    id: 'r3',
    name: 'Canteen Combo Meal',
    description: 'Your choice of any combo meal from the canteen menu.',
    savings: 'Save ₹120',
    coinCost: 200,
    icon: Icons.lunch_dining,
    category: 'Food',
  ),
  const RewardItem(
    id: 'r4',
    name: 'Ballpoint Pen Set',
    description: 'A set of 5 assorted colored pens.',
    savings: 'Save ₹25',
    coinCost: 30,
    icon: Icons.edit,
    category: 'Stationery',
  ),
  const RewardItem(
    id: 'r5',
    name: 'College T-Shirt',
    description: 'Official Campus College T-Shirt (Standard Size).',
    savings: 'Save ₹350',
    coinCost: 500,
    icon: Icons.checkroom,
    category: 'Merchandise',
  ),
  const RewardItem(
    id: 'r6',
    name: 'Highlighter Set',
    description: 'Pack of 4 fluorescent highlighters.',
    savings: 'Save ₹60',
    coinCost: 40,
    icon: Icons.highlight,
    category: 'Stationery',
  ),
];
