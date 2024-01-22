import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { homeReducer,homeSelector,actions } from "./reducers/homeReducer";
const Itemss = async () => {
    const dispatch = useDispatch();
try{

    dispatch(getInitialStateAsync());
}catch(err){

}

}
export default Itemss;