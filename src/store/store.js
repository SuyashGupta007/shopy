import {configureStore} from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
import categoryReducer from "./categorySlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import searchReducer from "./searchSlice";
import authReducer from './authSlice';
import { login, signup } from './authThunk';

const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        category: categoryReducer,
        product: productReducer,
        cart: cartReducer,
        search: searchReducer,
        auth: authReducer,
    }
});
 export { login};

export default store;