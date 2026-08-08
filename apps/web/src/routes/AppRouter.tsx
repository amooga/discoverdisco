import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import AdvertisementDetailsPage from "../pages/AdvertisementDetailsPage";
import CreateAdvertisementPage from "../pages/CreateAdvertisementPage";
import DashboardPage from "../pages/DashboardPage";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import CategoriesPage from "../pages/CategoriesPage";
import ProtectedRoute from "../components/auth/ProtectedRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/advertisements/:id"
          element={<AdvertisementDetailsPage />}
        />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/advertise"
            element={<CreateAdvertisementPage />}
          />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}