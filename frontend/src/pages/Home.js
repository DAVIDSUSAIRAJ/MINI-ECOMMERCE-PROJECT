import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { useSearchParams } from "react-router-dom";


const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchParam] = useSearchParams();

  useEffect( () => {

    const fetchProducts = async () => {
        try {
            let productsCard = await axios.get(
                process.env.REACT_APP_API_URLP + "/products/?"+searchParam
            );
            setProducts(productsCard.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    fetchProducts();
  }, [searchParam]);

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
