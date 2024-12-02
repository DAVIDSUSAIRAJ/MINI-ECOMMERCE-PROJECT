import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(async () => {
    console.log(process.env);

    let productsCard = await axios.get(
      process.env.REACT_APP_API_URLP + "/products/"
    );
    setProducts(productsCard);
  }, []);

  return (
    <>
      <h1 id="products_heading">Latest Products</h1>

      <section id="products" className="container mt-5">
        <div className="row">
          <ProductCard />
        </div>
      </section>
    </>
  );
};
export default Home;
