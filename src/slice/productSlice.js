// customerSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ALTER_PRODUCT_DATA,
  DELETE_PRODUCT_DATA,
  GET_PROPERTY_DATA,
} from "./api";

export const getProducts = createAsyncThunk("product/getProducts", async () => {
  const response = await axios.get(GET_PROPERTY_DATA);
  return response.data;
});

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id) => {
    const response = await axios.delete(
      DELETE_PRODUCT_DATA.replace("_id_", id)
    );
    return response.data; // Assuming backend returns the deleted customer
  }
);

export const alterProduct = createAsyncThunk(
  "product/alterProduct",
  async (customer) => {
    const response = await axios.post(ALTER_PRODUCT_DATA, customer);
    return response.data;
  }
);

const customerSlice = createSlice({
  name: "product",
  initialState: {
    items: [],
    selectedProduct: null,
    deletedProduct: null,
    status: "idle",
    deleteStatus: "idle",
    alterStatus: "idle",
    error: null,
    deleteError: null,
    alterError: null,
  },
  reducers: {
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
    removeProduct: (state, action) => {
      const index = state.items.findIndex(
        (customer) => customer.id === action.payload
      );
      if (index !== -1) state.items.splice(index, 1);
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex(
        (customer) => customer.id === action.payload.id
      );
      if (index !== -1) state.items[index] = action.payload;
    },
    selectProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    resetProduct: (state) => {
      state.items = [];
      state.selectedProduct = null;
      state.deletedProduct = null;
      state.status = "idle";
      state.deleteStatus = "idle";
      state.alterStatus = "idle";
      state.error = null;
      state.deleteError = null;
      state.alterError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.deletedProduct = action.payload; // Storing the exact deleted customer data
        const index = state.items.findIndex(
          (customer) => customer.id === action.payload.id
        );
        if (index !== -1) state.items.splice(index, 1);
        state.selectedProduct = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.error.message;
      })
      .addCase(alterProduct.pending, (state) => {
        state.alterStatus = "loading";
      })
      .addCase(alterProduct.fulfilled, (state, action) => {
        state.alterStatus = "succeeded";
        const index = state.items.findIndex(
          (customer) => customer.id === action.payload.id
        );
        if (index !== -1) state.items[index] = action.payload;
        state.selectedProduct = null;
      })
      .addCase(alterProduct.rejected, (state, action) => {
        state.alterStatus = "failed";
        state.alterError = action.error.message;
      });
  },
});

export const {
  addProduct,
  removeProduct,
  updateProduct,
  selectProduct,
  clearSelectedProduct,
  resetProduct,
} = customerSlice.actions;

export default customerSlice.reducer;
