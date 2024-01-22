import React from "react";
import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { homeSelector,actions } from "../redux/reducers/homeReducer";
import Itemss from "../redux/data";
import { ToastContainer, toast } from 'react-toastify';
const Form = () => {
  const notify = () => toast.success('Product added successfully', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
  const dispatch = useDispatch();
  const products = useSelector(homeSelector);
  const[title,setTitle] = useState("");
  const[description,setDescription] = useState("");
  const[price,setPrice] = useState("");
  const[thumbnail,setThumbnail] = useState("");
  const[category,setCategory] = useState("");
  const[brand,setBrand] = useState("");
  const clearForm = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setThumbnail("");
    setCategory("");
    setBrand("");
  };
const handleAddProduct=()=>{
  // Itemss();
  const newProduct = {
    title,
    price:Number(price),
    description,
    brand,
    category,
    thumbnail,
    id:Date.now()
  };
  // dispatch(actions.addItem(newProduct));
  dispatch(actions.addItem([newProduct,...products.products]))
  clearForm();
  notify();
}
  
  return (
    <div>
      
        <div className="w-2/5 border- border-black absolute left-96 mt-4 shadow-sm ">
          <h1 className="w-full text-xl lg:text-3xl 2xl:text-3xl font-bold text-center">
            Add Product
          </h1>
          <div className="flex flex-col gap-1 justify-items-center content-center">
            <label htmlFor="title text-sm">Title</label>
            <input
              id="title"
              className="w-full border p-2 px-4 "
              type="text"
              placeholder="Enter Title..."
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              required={true}
            />
          </div>
          <div className="price flex flex-col gap-1">
            <label htmlFor="price text-sm">Price</label>
            <input
              type="number"
              className="w-full border p-2 px-4"
              id="price"
              placeholder="Enter price..."
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
            />
          </div>
          <div className="url flex flex-col gap-1">
            <label htmlFor="imgUrl text-sm">Image Url</label>
            <input
              type="url"
              className="w-full border p-2 px-4"
              id="imgUrl"
              placeholder="Enter image Url..."
              value={thumbnail}
              onChange={(e)=>setThumbnail(e.target.value)}
            />
          </div>
          <div className="desc flex flex-col gap-1">
            <label htmlFor="desc text-sm">Description</label>
            <input
              type="text"
              className="w-full border p-2 px-4"
              id="desc"
              placeholder="Enter Description..."
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
            />
          </div>
          <div className="catg flex flex-col gap-1">
            <label htmlFor="catg text-sm">Category</label>
            <input
              type="text"
              className="w-full border p-2 px-4"
              id="catg"
              placeholder="Enter Category..."
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
            />
          </div>
          <div className="brand flex flex-col gap-1">
            <label htmlFor="brand text-sm">Brand</label>
            <input
              type="text"
              className="w-full border p-2 px-4"
              id="brand"
              placeholder="Enter Brand..."
              value={brand}
              onChange={(e)=>setBrand(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 p-2 mt-2 text-white gap-1 w-full rounded-sm hover:bg-blue-700 transition-colors"
            onClick={handleAddProduct}
            >
            Add Product
          </button>
        </div>
    </div>
  );
};

export default Form;
