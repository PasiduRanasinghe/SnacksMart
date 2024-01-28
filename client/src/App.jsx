import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/about';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';
import CreateProduct from './pages/admin/CreateProduct';
import Admin from './pages/admin/Admin';
import ProductsList from './pages/admin/ProductsList';
import DashBoard from './pages/admin/DashBoard';
import Shop from './pages/Shop';
import UpdateProduct from './pages/admin/UpdateProduct';

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
          <Route path="/shop" element={<Shop />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />}>
              <Route index element={<DashBoard />} />
              <Route path="" element={<DashBoard />} />
              <Route path="create-product" element={<CreateProduct />} />
              <Route path="list-products" element={<ProductsList />} />
            </Route>
            <Route
              path="admin/update-product/:productId"
              element={<UpdateProduct />}
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
