import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect( () => {
    const fetchProducts = async () => {
        try {
            console.log(process.env);
            let productsCard = await axios.get(
                process.env.REACT_APP_API_URLP + "/products/"
            );
            setProducts(productsCard.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1 id="products_heading">Latest Products</h1>

      <section id="products" className="container mt-5">
        <div className="row">
            {
                products.map((product)=>   <ProductCard product = {product} />)
            }
       
        </div>
      </section>
    </>
  );
};
export default Home;
