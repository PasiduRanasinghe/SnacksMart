import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/Register";
import About from "./pages/about";
import Header from "./components/Header";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
