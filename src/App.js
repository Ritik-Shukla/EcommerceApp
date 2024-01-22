import './App.css';
import Cart from './components/Cart';
import Detail from './components/Detail';
import Form from './components/Form';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Product from './components/Product';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import {RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Fragment } from 'react';

function App() {
  const router = createBrowserRouter([
    {path:'/',element:<Navbar/>,children:[
      {path:'/',element:<Home/>},
      {path: '/home', element:<Product/>},
      {path:'/cart',element:<Cart/>},
      {path:'/addproduct',element:<Form/>},
      {path:'/:id',element:<Detail/>}
    ]}
    
  ])
  return (
    <Provider store={store}>
    
        <div className=''>
   {/* <Navbar/>
    <Product/> */}
    <RouterProvider router={router}/>
    </div>
    <ToastContainer/>
    </Provider>
  );
}

export default App;
