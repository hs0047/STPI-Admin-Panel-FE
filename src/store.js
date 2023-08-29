// store.js
import { configureStore } from "@reduxjs/toolkit";
import CustomerSlice from "./slice/customerSlice";
import ProductSlice from "./slice/productSlice";

const store = configureStore({
  reducer: {
    customer: CustomerSlice,
    product: ProductSlice,
  },
});
export default store;
