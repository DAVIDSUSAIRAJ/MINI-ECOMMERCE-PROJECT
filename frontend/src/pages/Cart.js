import { Link } from "react-router-dom";

const Cart = ({cartItems,setCartItems}) => {
    console.log(cartItems,"cartItems");


    const increaseQty = (item)=>{
        if(Number(item.product.stock) === item.qty)return;
        setCartItems((preState)=>preState.map((cartItem)=>cartItem.product._id === item.product._id ? {...cartItem,qty:cartItem.qty+1}:cartItem))
      }
      const decreaseQty = (item)=>{
        if(item.qty === 1)return;
        setCartItems((preState)=>preState.map((cartItem)=>cartItem.product._id === item.product._id ? {...cartItem,qty:cartItem.qty-1}:cartItem))

      }
      const deleteQty = (item)=>{
        setCartItems((preState)=>preState.filter((cartItem)=>cartItem.product._id !== item.product._id))
      }


  return (
     cartItems.length >0 ? <>
      <div class="container container-fluid">
        <h2 class="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>
        
        <div class="row d-flex justify-content-between">
            <div class="col-12 col-lg-8">
                { cartItems.map((cartItem)=>  <>
                <hr />
                <div class="cart-item">
                    <div class="row">
                        <div class="col-4 col-lg-3">
                            <img src={cartItem.product.images[0].image} alt={cartItem.product.name} height="90" width="115" />
                        </div>

                        <div class="col-5 col-lg-3">
                        <Link to= { `/products/${cartItem.product._id}`}>{cartItem.product.name}</Link>
                        </div>


                        <div class="col-4 col-lg-2 mt-4 mt-lg-0">
                            <p id="card_item_price">$ {cartItem.product.price}</p>
                        </div>

                        <div class="col-4 col-lg-3 mt-4 mt-lg-0">
                            <div class="stockCounter d-inline">
                                <span class="btn btn-danger minus" onClick={()=>decreaseQty(cartItem)}>-</span>
                                <input type="number" class="form-control count d-inline" value={Number(cartItem.qty)} readOnly />

								<span class="btn btn-primary plus" onClick={()=>increaseQty(cartItem)}>+</span>
                            </div>
                        </div>

                        <div class="col-4 col-lg-1 mt-4 mt-lg-0">
                            <i id="delete_cart_item" class="fa fa-trash btn btn-danger" onClick={()=>deleteQty(cartItem)}></i>
                        </div>

                    </div>
                </div>
                </>)
}
             
            </div>

            <div class="col-12 col-lg-3 my-4">
                <div id="order_summary">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Subtotal:  <span class="order-summary-values">1 (Units)</span></p>
                    <p>Est. total: <span class="order-summary-values">$245.67</span></p>
    
                    <hr />
                    <button id="checkout_btn" class="btn btn-primary btn-block">Place Order</button>
                </div>
            </div>
        </div>
    </div>
    </>:<h2>Cart items is empty!</h2>
  );
};

export default Cart;