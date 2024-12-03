import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import React, { Suspense, lazy, useState } from "react";
import { ToastContainer} from "react-toastify"; // Import Toast
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for notifications

const Header = lazy(() => import("./components/Header"));
const Home = lazy(() => import("./pages/Home"));
const Footer = lazy(() => import("./components/Footer"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));



function App() {
  const [cartItems, setCartItems] = useState([]);


  return (
    <>
    
    <div className="App">
      
        <Router>
        <ToastContainer /> 
        <Header cartItems = {cartItems} />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home  />} />
            <Route path="/products/:id" element={<ProductDetails  cartItems = {cartItems} setCartItems = {setCartItems} />} />
          </Routes>
        </Suspense>
        <Footer />
      </Router>

    </div>
    </>
  );
}

export default App;
