import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import useAuthStore from "./zustand-store/authStore";

const App = () => {
  const { isLoggedIn } = useAuthStore();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/" replace /> : <Register />}
        />
      </Routes>
    </>
  );
};

export default App;
