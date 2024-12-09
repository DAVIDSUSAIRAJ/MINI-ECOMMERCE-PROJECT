import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast} from "react-toastify"; // Import Toast

const Cart = ({cartItems,setCartItems}) => {
    console.log(cartItems,"cartItems");
    const [completed,setCompleted] = useState(false);

    useEffect(()=>{
    if (cartItems.length  > 0) {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        
    }else if(cartItems.length  === 0){
       const localStorageCartItem= localStorage.getItem("cartItems")
       setCartItems(JSON.parse(localStorageCartItem))
    }
    },[])


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

      const handlePlaceOrder = async()=>{
        try {
            await axios.post(process.env.REACT_APP_API_URLP + "/orders", cartItems) 
            setCartItems([]) 
            setCompleted(true);
            toast.success("Order Success!")
            localStorage.setItem("cartItems", JSON.stringify([]));
        } catch (error) {
            console.log(error)
        }
        
        
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
                    <p>Subtotal:  <span class="order-summary-values">{cartItems.reduce((pre,curr)=> pre+curr.qty,0)} (Units)</span></p>
                    <p>Est. total: <span class="order-summary-values">${cartItems.reduce((pev,cur)=> (pev +(cur.qty * cur.product.price)),0).toFixed(2)}</span></p>
    
                    <hr />
                    <button id="checkout_btn" class="btn btn-primary btn-block" onClick={handlePlaceOrder}>Place Order</button>
                </div>
            </div>
        </div>
    </div>
    </>: completed?<> <h2 className='mt-5'>Your Order has Completed!</h2>
    <p>Your order has placed succesfully.</p></>:<h2>Cart items is empty!</h2>
  );
};

export default Cart;