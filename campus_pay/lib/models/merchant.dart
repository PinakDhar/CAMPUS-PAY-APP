/// Represents a college-authorized merchant where payments earn coins
class Merchant {
  final String id;
  final String name;
  final String upiId;
  final String category;

  const Merchant({
    required this.id,
    required this.name,
    required this.upiId,
    required this.category,
  });
}

/// List of authorized college merchants
/// In a real app, this would come from your backend API
final List<Merchant> authorizedMerchants = [
  const Merchant(
    id: 'm1',
    name: 'College Canteen',
    upiId: 'canteen@upi',
    category: 'Food',
  ),
  const Merchant(
    id: 'm2',
    name: 'Campus Stationery',
    upiId: 'stationery@upi',
    category: 'Stationery',
  ),
  const Merchant(
    id: 'm3',
    name: 'College Bookstore',
    upiId: 'bookstore@upi',
    category: 'Books',
  ),
];
