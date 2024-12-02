import { Link } from "react-router-dom";
const ProductCard = ({product})=>{
  console.log(product,"product")
  const productFirstimg = product.images[0].image;
  const productName = product.name;
  const productPrice = `$ ${product.price}`

    return(<>
    
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card p-3 rounded">
              <img
                className="card-img-top mx-auto"
                src={productFirstimg}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  <Link to= { `/products/${product._id}`}>
                   {productName}
                  </Link>
                </h5>
                <div className="ratings mt-auto">
                  <div className="rating-outer">
                    <div className="rating-inner" style={{width: `${product.ratings/5 * 100}%`}}></div>
                  </div>
                </div>
                <p className="card-text">{productPrice}</p>
                <Link to= { `/products/${product._id}`} id="view_btn" className="btn btn-block">
                  View Details
                </Link>
              </div>
            </div>
          </div>
    
    </>)
}

export default ProductCard;