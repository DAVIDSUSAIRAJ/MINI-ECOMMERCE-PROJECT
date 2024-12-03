import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import React, { Suspense, lazy } from "react";
const Header = lazy(() => import("./components/Header"));
const Home = lazy(() => import("./pages/Home"));
const Footer = lazy(() => import("./components/Footer"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));



function App() {


  return (
    <div className="App">
      
        <Router>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<ProductDetails />} />
          </Routes>
        </Suspense>
        <Footer />
      </Router>

    </div>
  );
}

export default App;
