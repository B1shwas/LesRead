import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import useAuthStore from "./zustand-store/authStore";
import ProfilePage from "./pages/ProfilePage";
import RootLayout from "./layout/RootLayout";

const App = () => {
  const { isLoggedIn } = useAuthStore();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <RootLayout>
              <Home />
            </RootLayout>
          }
        />

        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <RootLayout>
                <Navigate to="/" replace />
              </RootLayout>
            ) : (
              <RootLayout>
                <Login />
              </RootLayout>
            )
          }
        />
        <Route
          path="/register"
          element={
            isLoggedIn ? (
              <RootLayout>
                <Navigate to="/" replace />
              </RootLayout>
            ) : (
              <RootLayout>
                <Register />
              </RootLayout>
            )
          }
        />

        <Route
          path="/profile/:username"
          element={
            <RootLayout>
              <ProfilePage />
            </RootLayout>
          }
        />
      </Routes>
    </>
  );
};

export default App;
