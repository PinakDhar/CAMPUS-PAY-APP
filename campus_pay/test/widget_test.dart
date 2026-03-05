import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';
import 'package:campus_pay/services/coin_service.dart';
import 'package:campus_pay/main.dart';

void main() {
  testWidgets('Home screen loads correctly', (WidgetTester tester) async {
    await tester.pumpWidget(
      MultiProvider(
        providers: [
          ChangeNotifierProvider(create: (_) => CoinService()),
        ],
        child: const CampusPayApp(),
      ),
    );
    expect(find.text('Campus Pay'), findsWidgets);
  });
}
