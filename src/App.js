import React from "react";
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NavBar from './front/component/navbar';
import Homepage from './front/layout/home';
import AboutPage from './front/layout/about';
import ContactPage from './front/layout/contact';
import Footer from './front/component/footer';
import DashboardPage from './admin/layout/dashboard';
import CategoryPage from "./admin/layout/category";
import CategoryEditPage from "./admin/layout/category/categoryEdit";
import CategoryAddPage from "./admin/layout/category/categoryAdd";
import ProductPage from "./admin/layout/product";
import ProductAddPage from "./admin/layout/product/productAdd";
import ProductEditPage from "./admin/layout/product/productEdit";
import OrderPage from "./admin/layout/order";
import OrderAddPage from "./admin/layout/order/orderAdd";
import CustomerPage from "./admin/layout/customer";
import CustomerAddPage from "./admin/layout/customer/customerAdd";
import CustomerEditPage from "./admin/layout/customer/customerEdit";
import OrderEditPage from "./admin/layout/order/orderEdit";
import OrderViewPage from "./admin/layout/order/orderView";
import UserPage from "./admin/layout/user";
import UserAddPage from "./admin/layout/user/userAdd";


function App() {
  return (
    <BrowserRouter>
      {window.location.pathname.startsWith("/admin") ? null : <NavBar/>}
      <Routes>

          {/* Front Side */}
          <Route path="/" element={<Homepage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />

          {/* Admin Side */}

          {/* Category */}
          <Route path="/admin" element={<DashboardPage /> } />
          <Route path="/admin/category" element={<CategoryPage /> } />
          <Route path="/admin/category/edit/:category_id" element={<CategoryEditPage/>} />
          <Route path="/admin/category/new" element={<CategoryAddPage/>} />

          {/* Product */}
          <Route path="/admin/product" element={<ProductPage />} />
          <Route path="/admin/product/new" element={<ProductAddPage />} />
          <Route path="/admin/product/edit/:product_id" element={<ProductEditPage />} />
          
          {/* Order */}
          <Route path="/admin/order" element={<OrderPage />} />
          <Route path="/admin/order/new" element={<OrderAddPage />} />
          <Route path="/admin/order/edit/:order_id" element={<OrderEditPage />} />
          <Route path="/admin/order/view/:order_id" element={<OrderViewPage />} />

          {/* Customer */}
          <Route path="/admin/customer" element={<CustomerPage />} />
          <Route path="/admin/customer/new" element={<CustomerAddPage />} />
          <Route path="/admin/customer/edit/:customer_id" element={<CustomerEditPage />} />

          <Route path="/admin/user" element={<UserPage />} />
          <Route path="/admin/user/new" element={<UserAddPage />} />
      </Routes>
      {window.location.pathname.startsWith("/admin") ? null : <Footer/>}
    </BrowserRouter>
  );
}

export default App;
