import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./views/Login";
import Register from "./views/Register";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
