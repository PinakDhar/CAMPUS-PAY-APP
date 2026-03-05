import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { TransactionSuccess } from "./components/TransactionSuccess";
import { RewardsPage } from "./pages/RewardsPage";
import { RedeemPage } from "./pages/RedeemPage";
import { ProfilePage } from "./pages/ProfilePage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { TransactionHistoryPage } from "./pages/TransactionHistoryPage";
import { UPIAppSelector } from "./pages/UPIAppSelector";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { EditProfilePage } from "./pages/EditProfilePage";
import { LinkedAccountsPage } from "./pages/LinkedAccountsPage";
import { SecurityPrivacyPage } from "./pages/SecurityPrivacyPage";
import { SettingsPage } from "./pages/SettingsPage";
import { SendMoneyPage } from "./pages/SendMoneyPage";
import { RequestMoneyPage } from "./pages/RequestMoneyPage";
import { MobileRechargePage } from "./pages/MobileRechargePage";
import { BankTransferPage } from "./pages/BankTransferPage";
import { TransactionDetailPage } from "./pages/TransactionDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/signup",
    Component: SignUpPage,
  },
  {
    path: "/forgot-password",
    Component: ForgotPasswordPage,
  },
  {
    path: "/select-upi",
    Component: UPIAppSelector,
  },
  {
    path: "/success",
    Component: TransactionSuccess,
  },
  {
    path: "/rewards",
    Component: RewardsPage,
  },
  {
    path: "/redeem",
    Component: RedeemPage,
  },
  {
    path: "/profile",
    Component: ProfilePage,
  },
  {
    path: "/edit-profile",
    Component: EditProfilePage,
  },
  {
    path: "/linked-accounts",
    Component: LinkedAccountsPage,
  },
  {
    path: "/security-privacy",
    Component: SecurityPrivacyPage,
  },
  {
    path: "/settings",
    Component: SettingsPage,
  },
  {
    path: "/notifications",
    Component: NotificationsPage,
  },
  {
    path: "/history",
    Component: TransactionHistoryPage,
  },
  {
    path: "/send-money",
    Component: SendMoneyPage,
  },
  {
    path: "/request-money",
    Component: RequestMoneyPage,
  },
  {
    path: "/mobile-recharge",
    Component: MobileRechargePage,
  },
  {
    path: "/bank-transfer",
    Component: BankTransferPage,
  },
  {
    path: "/transaction-detail",
    Component: TransactionDetailPage,
  },
]);