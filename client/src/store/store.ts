import {combineReducers, createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import authReducer from "./reducers/auth";
import adminReducer from "./reducers/admin";
import headerReducer from "./reducers/header";
import catalogReducer from "./reducers/catalog";
import productsReducer from "./reducers/products";
import cartReducer from "./reducers/cart";
import footerReducer from "./reducers/footer";
import profileReducer from "./reducers/profile";


const reducers = combineReducers({
    auth: authReducer,
    admin: adminReducer,
    header: headerReducer,
    catalog: catalogReducer,
    products: productsReducer,
    cart: cartReducer,
    footer: footerReducer,
    profile: profileReducer
})

const store = createStore(reducers, applyMiddleware(thunk))

// @ts-ignore
window.store = store
export default store