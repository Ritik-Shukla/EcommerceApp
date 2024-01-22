import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getInitialStateAsync } from "../redux/reducers/homeReducer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Dispatch the async action to fetch initial data
    dispatch(getInitialStateAsync());

    // Set a timeout to navigate to the product page after 1 second
    const timeoutId = setTimeout(() => {
      // Replace "/product" with the actual path of your product page
      navigate("/home");
    }, 1000);

    // Cleanup function to clear the timeout if the component unmounts before the timeout
    return () => clearTimeout(timeoutId);
  }, [dispatch, navigate]);

  return (
    <>
      Loading...
      {/* You can add additional content for the loading state if needed */}
    </>
  );
};

export default Home;