import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { cartActions,cartSelector} from '../redux/reducers/cartReducer';
import { Link } from "react-router-dom";
const Cart = () => {
  const cartProduct = useSelector(cartSelector);
  const dispatch = useDispatch();
  return (
    <div className="container w-full  mx-auto mt-5 flex h-full">
      <div className="w-64 border-black border-2 h-96 absolute left-2 top-16">
        <h1>total Item : {cartProduct.cartCount}</h1>
        <h1>total Price : $.{cartProduct.cartPrice}</h1>
        <button className="bg-blue-600 py-2 text-white mx-2 px-2 rounded-sm" onClick={()=>{
          dispatch(cartActions.clear());
        }}> Clear Cart</button>
        <Link to='/' className=" bg-blue-600 py-2 text-white mx-2 px-2 rounded-sm">Go Back</Link>
        
      </div>
      <div className="bg-slate-200 w-8/12  border-black absolute left-80 top-16">
        <div className="">
          <ul className="flex items-center justify-evenly border-black border-b-2 ">
            <li>Image</li>
            <li>Name</li>
            <li>Control</li>
            <li>price</li>
            <li>Remove</li>
            
          </ul>
        </div>

{cartProduct.cartProducts.map((product,index)=>(
  <div className=" border-b-2 h-44 flex items-center justify-around border-black" key={product.id || index}>
          <img 
            className=" h-40 w-44"
            src={product.images[0]}
            alt=""
          />
          <div className="name flex my-auto">
            <h2>{product.title}</h2>
          </div>
          <div className="controls flex my-auto cursor-pointer">
            <img  onClick={()=>{
            dispatch(cartActions.decrementCnt(product.id));
          }}
              className="bg-slate-100 h-4 w-4 mt-1 mr-1"
              src="https://cdn-icons-png.flaticon.com/128/43/43625.png"
              alt=""
            />
            <p>{product.cnt}</p>
            <img onClick={()=>{
              dispatch(cartActions.incrementCnt(product.id));
            }}
              className="bg-slate-100 h-4 w-4 mt-1 ml-1 cursor-pointer"
              src="https://cdn-icons-png.flaticon.com/128/748/748113.png"
              alt=""
            />
          </div>
          <div className="price flex my-auto"><h2>$.{product.itemPrice}</h2></div>
          <div className="buttons my-auto">
            <button onClick={()=>{
              dispatch(cartActions.removeFromCart(product.id));
            }} className="bg-blue-600 py-2 text-white mx-2 px-2 rounded-sm">Remove</button>
          </div>
          {/* <hr/> */}
        </div>
))}



        
      </div>
    </div>
  );
};
export default Cart;
