import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/about';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';
import CreateProduct from './pages/CreateProduct';
import SideBar from './pages/admin/SideBar';
import ProductsList from './pages/admin/ProductsList';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className=" mt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/productlist" element={<ProductsList />} />
          </Route>
          <Route path="/dashboard" element={<SideBar />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
