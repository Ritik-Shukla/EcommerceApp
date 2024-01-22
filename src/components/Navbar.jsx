import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {  homeSelector } from '../redux/reducers/homeReducer';
import {  NavLink, Outlet } from 'react-router-dom';
import { cartSelector } from '../redux/reducers/cartReducer';
const Navbar = () => {
  const products = useSelector(homeSelector);
  const cartProduct = useSelector(cartSelector);
  return (
    <>
<nav className='bg-slate-900 text-slate-100 '>
  <ul className='flex justify-between '>
    <div className="first flex">
  <NavLink activeClassName="active-link" to="/"> <li className=' cursor-pointer'><img className='h-14' src="https://static.vecteezy.com/system/resources/previews/002/638/477/large_2x/royal-r-alphabet-letter-icon-logo-for-business-company-design-with-king-crown-and-shield-in-gradient-color-for-corporate-identity-vector.jpg" alt="" /></li></NavLink> 
  <NavLink activeClassName="active-link" to="/home"> <li className='ml-5 flex justify-center cursor-pointer boredr-b-2 h-full w-16 hover:border-b-2 hover:border-blue-500 hover:text-blue-500'><p className='my-auto font-serif font-bold text-lg '>Home</p></li></NavLink>
  <NavLink activeClassName="active-link" to="/addproduct"> <li className='ml-6 flex justify-center cursor-pointer boredr-b-2 h-full w-28 hover:border-b-2 hover:border-blue-500 hover:text-blue-500'><p className='my-auto font-serif font-bold text-lg'>AddProduct</p></li></NavLink>
  </div>
  <div className="second">
   <NavLink activeClassName="active-link" to="/cart"><li className='mx-2 cursor-pointer flex mr-6 '><img className='h-12 mt-1' src="https://cdn-icons-png.flaticon.com/128/10429/10429369.png" alt="" /><p className={cartProduct.cartCount!=0?'text-white rounded-full bg-blue-500 h-6 w-6 -ml-5 flex justify-center mt-3':""}>{cartProduct.cartCount!=0?cartProduct.cartCount:null}</p></li></NavLink> 
   </div>
  </ul>
</nav>
<Outlet/>
    </>
  )
}

export default Navbar