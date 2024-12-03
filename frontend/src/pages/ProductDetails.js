import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast} from "react-toastify"; // Import Toast

const ProductDetails = ({cartItems, setCartItems}) => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [qty,setQty] = useState("1")

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let productsCard = await axios.get(
          process.env.REACT_APP_API_URLP + "/products/" + id
        );
        console.log(productsCard.data, "kkkk");
        setProduct(productsCard.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProduct();
  }, [id]);
const addToCart =()=>{
  let newItem = {product,qty};

  const itemExist = cartItems.find((cardItem)=>product._id ===cardItem.product._id )
  if(!itemExist){
  setCartItems((preState)=>[...preState,newItem])
  toast.success("Cart item added successfully");
  }

}

  return (
    product.length !== 0 && (
      <>
        <div class="container container-fluid">
          <div class="row f-flex justify-content-around">
            <div class="col-12 col-lg-5 img-fluid" id="product_image">
              <img
                src={product?.images[0].image}
                alt="product_image"
                height="500"
                width="500"
              />
            </div>

            <div class="col-12 col-lg-5 mt-5">
              <h3>{product.name}</h3>
              <p id="product_id">Product # {product._id}</p>

              <hr />

              <div class="rating-outer">
                <div class="rating-inner" style={{ width: `${product.ratings/5 *100}%`}}></div>
              </div>

              <hr />

              <p id="product_price">{product.price}</p>
              <div class="stockCounter d-inline">
                <span class="btn btn-danger minus">-</span>

                <input
                  type="number"
                  class="form-control count d-inline"
                  value={qty}
                  readOnly
                />

                <span class="btn btn-primary plus">+</span>
              </div>
              <button
                type="button"
                id="cart_btn"
                class="btn btn-primary d-inline ml-4"
                onClick={addToCart}
              >
                Add to Cart
              </button>

              <hr />

              <p>
                Status: <span id="stock_status" className={product.stock>0 ? "text-success":"text-danger"}>{product.stock>0 ?"In Stock":"Out of stock"}</span>
              </p>

              <hr />

              <h4 class="mt-2">Description:</h4>
              <p>
               {product.description}
              </p>
              <hr />
              <p id="product_seller mb-3">
                Sold by: <strong>{product.seller}</strong>
              </p>

              <div class="rating w-50"></div>
            </div>
          </div>
        </div>
      </>
    )
  );
};
export default ProductDetails;
