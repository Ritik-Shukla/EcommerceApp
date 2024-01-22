import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getInitialStateAsync,
  homeSelector,
} from "../redux/reducers/homeReducer";
import { cartActions, cartSelector } from "../redux/reducers/cartReducer";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
const Product = () => {
  const products = useSelector(homeSelector);
  // const cartProduct = useSelector(cartSelector);
  const[newTitle,setNewTitle] = useState("");
  const[newDesc,setNewDesc] = useState("");
  const[newprice,setNewPrice] = useState("");
  const handleSave = (index) => {
    // Dispatch the editItem action with updated product details
    dispatch(
      actions.editItem({
        index,
        updatedProduct: {
          title: newTitle,
          description: newDesc,
          price: newprice,
        },
      })
    );

    // Toggle off the edit mode
    // dispatch(actions.toggleEdit(index));
  };

  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getInitialStateAsync());
  // }, []);
  const notify = () =>{
    toast.success('Product is now updated', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
  return (
    <div className="container w-full mx-auto mt-3">
      <div
        onClick={() => {
          dispatch(actions.filter());
        }}
        className={
          products.isSort
            ? "filter text-slate-800 border-2 border-slate-800 flex justify-center w-24 rounded-xl cursor-pointer"
            : "filter text-slate-500 border-2 border-slate-500 flex justify-center w-24 rounded-xl cursor-pointer"
        }
      >
        <p>{products.isSort ? "Filter  X" : "Filter"}</p>
      </div>
      {products.products.map((product, index) => (
        <div
          className="w-2/3 shadow-lg shadow-slate-800 h-60 mx-auto my-6 bg-slate-50 font-sans"
          key={product.id || index}
        >
          <ul className="flex">
            <li className="w-4/12">
              <img src={product.thumbnail} className=" h-60" alt="" />
            </li>
            {product.isEdit ? (
              <li className="w-8/12 ml-2">
                <div className="title flex flex-col">
                  <label className="text-lg font-bold font-sans" htmlFor="title">Title:</label>
                  <input
                    className="border text-slate-500"
                    type="text"
                    id="title"
                    onChange={(e)=>setNewTitle(e.target.value)}
                    value={newTitle}
                  />
                </div>
                <div className="description flex flex-col mt-2">
                  <label htmlFor="desc " className="text-lg font-bold font-sans">Description: </label>
                  <textarea
                    className="border w-4/5 text-slate-500"
                    name=""
                    id="desc"
                    cols=""
                    rows="3"
                    value={newDesc}
                    onChange={(e)=>setNewDesc(e.target.value)}
                  ></textarea>
                </div>
                <div className="price mt-2 ">
                  <label className=" text-lg font-bold font-sans" htmlFor="price">Price:</label>
                  <input
                    className="border text-slate-500"
                    type="Number"
                    id="price"
                    value={newprice}
                    onChange={(e)=>setNewPrice(e.target.value)}
                  />
                </div>
                <div className="control flex mt-2 justify-end mr-4">
                  <button className=" bg-yellow-400 text-white font-serif w-16 h-7 rounded-sm hover:bg-yellow-500"
                  onClick={()=>{handleSave(index);
                    dispatch(actions.toggleEdit(index))
                    toast.success('Product is now updated', {
                      position: "top-center",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                      });
                  }}
                  >
                    Save
                  </button>
                  <button onClick={()=>{
                      dispatch(actions.toggleEdit(index));
                  }
                  }  className=" text-white bg-red-600 font-serif h-7 w-16 hover:bg-red-900 ml-6">
                    Cancel
                  </button>
                </div>
              </li>
            ) : (
              <li className="w-8/12 ml-2">
                <h1 className=" font-bold text-2xl">{product.title}</h1>
                <p className=" text-md mt-2 ">{product.description}</p>
                <h4 className="mt-3 font-bold">Price: ${product.price}</h4>
                <div className="buttons flex mt-8 -ml-2">
                  <Link
                    to={`/:${product.id}`}
                    className="bg-blue-500 py-2  shadow-md shadow-slate-600  text-white mx-2 px-2 rounded-sm hover:bg-blue-700 transition-colors"
                  >
                    More
                  </Link>
                  <button
                    className="ml-3 shadow-md shadow-slate-600 bg-blue-500 py-2 text-white mx-2 px-2 rounded-sm hover:bg-blue-700 transition-colors"
                    onClick={() => {
                    
                      dispatch(actions.toogleItem(index));
                      dispatch(cartActions.addToCart(product));
                    }}
                  >
                    {product.isInCart == true
                      ? "Remove From Cart"
                      : "Add To Cart"}
                  </button>
                  <img
                    className=" h-7 mt-2 ml-4 cursor-pointer shadow-md shadow-slate-600 rounded-full hover:shadow-md hover:shadow-slate-800 hover:h-8"
                    onClick={() => {
                     
                      toast.success('Product deleted !', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                        dispatch(actions.deleteFromState(product.id));
                        dispatch(cartActions.removeFromCart(product.id));
                    }}
                    src="https://cdn-icons-png.flaticon.com/128/10336/10336279.png"
                    alt=""
                  />
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png"
                    className=" h-7 mt-2 rounded-full cursor-pointer ml-4 shadow-md shadow-slate-600 hover:shadow-md hover:shadow-slate-800 hover:h-8"
                    onClick={() => {
                      dispatch(actions.toggleEdit(index));
                    }}
                    alt=""
                  />
                </div>
              </li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Product;
// One of your dependencies, babel-preset-react-app, is importing the
// "@babel/plugin-proposal-private-property-in-object" package without
// declaring it in its dependencies. This is currently working because
// "@babel/plugin-proposal-private-property-in-object" is already in your
// node_modules folder for unrelated reasons, but it may break at any time.

// babel-preset-react-app is part of the create-react-app project, which
// is not maintianed anymore. It is thus unlikely that this bug will
// ever be fixed. Add "@babel/plugin-proposal-private-property-in-object" to
// your devDependencies to work around this error. This will make this message
// go away.