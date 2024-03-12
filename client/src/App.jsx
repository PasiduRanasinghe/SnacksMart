import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

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
import Product from './pages/Product';
import Footer from './components/Footer';
import Orders from './pages/Orders';
import Cart from './pages/Cart';

import Unauthorized from './pages/Unauthorized';
import ContactUs from './pages/ContactUs';
import InquiriesList from './pages/admin/InquiriesList';
import UsersList from './pages/admin/UsersList';
import OrdersList from './pages/admin/OrdersList';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route element={<PrivateRoute />}>
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/product/:productId" element={<Product />} />
          </Route>

          <Route element={<PrivateRoute role={'admin'} />}>
            <Route path="/admin" element={<Admin />}>
              <Route index element={<DashBoard />} />
              <Route path="" element={<DashBoard />} />
              <Route path="create-product" element={<CreateProduct />} />
              <Route path="list-products" element={<ProductsList />} />
              <Route path="list-inquiries" element={<InquiriesList />} />
              <Route path="list-users" element={<UsersList />} />
              <Route path="list-orders" element={<OrdersList />} />
            </Route>
            <Route
              path="admin/update-product/:productId"
              element={<UpdateProduct />}
            />
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          theme="colored"
          transition={Slide}
          pauseOnFocusLoss={false}
          autoClose={2200}
          pauseOnHover={false}
        />
      </div>
      <Footer />
    </BrowserRouter>
  );
}
