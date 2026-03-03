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
import { EditProfilePage } from "./pages/EditProfilePage";
import { LinkedAccountsPage } from "./pages/LinkedAccountsPage";
import { SecurityPrivacyPage } from "./pages/SecurityPrivacyPage";

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
    path: "/notifications",
    Component: NotificationsPage,
  },
  {
    path: "/history",
    Component: TransactionHistoryPage,
  },
]);