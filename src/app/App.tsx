import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthPage } from "../pages/AuthPage/AuthPage";
import { MainPage } from "@/pages/MainPage/MainPage";
import { FavoritesPage } from "@/pages/FavoritePage/FavoritePage";
import { ProfilePage } from "@/pages/ProfilePage/ProfilePage";
import { MyPostsPage } from "@/pages/MyPostsPage/MyPostsPage";
import { ProtectedRoute } from "@/features/authRoutes/ui/ProtectedRoute";
import { PublicOnlyRoute } from "@/features/authRoutes/ui/PublicOnlyRoute";
import { Layout } from "@/shared/ui/Layout/Layout";
import "../shared/styles/variables.css";
import "../shared/styles/index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />

        <Route
          path="/auth"
          element={
            <PublicOnlyRoute>
              <AuthPage />
            </PublicOnlyRoute>
          }
        />

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/main" element={<MainPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/my-posts" element={<MyPostsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
