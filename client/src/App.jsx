import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./views/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
