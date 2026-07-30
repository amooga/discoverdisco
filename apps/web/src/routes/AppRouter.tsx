import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import AdvertisementDetailsPage from "../pages/AdvertisementDetailsPage";
import CreateAdvertisementPage from "../pages/CreateAdvertisementPage";
import DashboardPage from "../pages/DashboardPage";
import NotFoundPage from "../pages/NotFoundPage";
import CreatePostPage from "../pages/CreatePostPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/advertisements/:id"
          element={<AdvertisementDetailsPage />}
        />
        <Route
          path="/advertise"
          element={<CreateAdvertisementPage />}
        />
        <Route path="/dashboard" element={<DashboardPage />} />
         <Route
          path="/create-post"
          element={<CreatePostPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}