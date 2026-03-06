import { createBrowserRouter } from "react-router";

import { AppLayout } from "../layouts/AppLayout/index.jsx";
import { HomePage } from "../pages/HomePage";
import { AnalyticsPage } from "../pages/AnalyticsPage";
import { BoardPage } from "../pages/BoardPage";
import { DashboardPage } from "../pages/DashboardPage";
import { SettingsPage } from "../pages/SettingsPage";

export const ROUTES = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "analytics", element: <AnalyticsPage /> },
      { path: "board", element: <BoardPage /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
]);
