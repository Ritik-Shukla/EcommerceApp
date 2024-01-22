import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, homeSelector } from "../redux/reducers/homeReducer";
import { cartActions, cartSelector } from "../redux/reducers/cartReducer";
import { Link, useParams } from "react-router-dom";
const Detail = () => {
  const products = useSelector(homeSelector);
  const cartProducts = useSelector(cartSelector);
  //   const dispatch = useDispatch();
  const dispatch = useDispatch();
  const item = products.products;
  const { id } = useParams();
  const itemId = Number(id.substring(1));
  const p = item.find((a) => a.id === itemId);
  return (
    <div>
      <div className="contailner flex mt-4 w-10/12 m-auto h-11/12 font-serif shadow-2xl">
        <div className="image h-96 flex justify-center">
        <img className="w-96" src={p.thumbnail} alt="" />
        </div>
        <div className="container ml-2 h-full">
          <h1 className=" font-extrabold text-4xl">{p.title}</h1>
          <h4 className="text-2xl text-slate-600 font-serif">{p.category}</h4>
          <p className=" text-lg mt-4">{p.description}</p>
          <h2 className="text-xl  mt-2">Price:$ {p.price}</h2>
          <h3 className=" text-pink-500 border-2 w-fit p-1 mt-4 rounded-sm border-pink-500 cursor-pointer hover:border-pink-300 hover:text-red-400">
            {p.brand}
          </h3>
          <div className="controls flex mt-10">
            <button
              onClick={()=>{
                dispatch(cartActions.addToCart(p))
            }}
              className="flex border-2 p-2 bg text-white bg-blue-500 rounded-sm justify-evenly content-evenly hover:text-blue-500 hover:border-2 hover:border-blue-500 hover:bg-white"
            >
              Add to cart
            </button>
            <button className="flex border-2 p-2 bg text-white ml-6 bg-blue-500 rounded-sm justify-evenly content-evenly hover:text-blue-500 hover:border-2 hover:border-blue-500 hover:bg-white">
              Buy Now
            </button>
            <Link
              className="flex border-2 p-2  rounded-sm justify-evenly content-evenly ml-8 hover:shadow-2xl hover:border-none"
              to="/home"
            >
              <img
                className="h-6 mr-1"
                src="https://cdn-icons-png.flaticon.com/128/10238/10238019.png"
                alt=""
              />
              Go back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
