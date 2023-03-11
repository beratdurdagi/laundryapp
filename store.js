import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./Redux/CartReducer";
import ProductReducer from "./Redux/ProductReducer";

export default configureStore({
    reducer:{
        cart:CartReducer,
       product:ProductReducer,
    }
})