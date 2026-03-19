import { useEffect, useState } from "react";
import "./App.css";
import Admin from "./pages/Admin";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import About from "./pages/About";
import ProductDetails from "./pages/ProductDeatails";
import Contact from "./pages/Contact";
import Navbar from "./pages/Navbar"
import Product from "./pages/Product"
import Universal from "./pages/Universal";
import { ToastContainer } from "react-toastify"

function App() {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/About" element={<About />} />
        <Route path="/ProductDetails/:Id/:Type" element={<ProductDetails />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="*" element={<Universal />} />
      </Routes>
      <Footer />
    </div>

  );
}
export default App;



// git add
// git commit-m "message"
// git push origin branch-name