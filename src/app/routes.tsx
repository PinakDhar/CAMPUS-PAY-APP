import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { TransactionSuccess } from "./components/TransactionSuccess";
import { RewardsPage } from "./pages/RewardsPage";
import { RedeemPage } from "./pages/RedeemPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
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
]);