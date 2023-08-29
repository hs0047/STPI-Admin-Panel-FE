import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ALTER_CUSTOMER_DATA,
  CONNECT_CUSTOMER_PRODUCT,
  DELETE_CUSTOMER_DATA,
  GET_CUSTOMER_DATA,
} from "./api";

export const getCustomers = createAsyncThunk(
  "customer/getCustomers",
  async () => {
    const response = await axios.get(GET_CUSTOMER_DATA);
    return response.data;
  }
);

export const deleteCustomer = createAsyncThunk(
  "customer/deleteCustomer",
  async (id) => {
    const response = await axios.delete(
      DELETE_CUSTOMER_DATA.replace("_id_", id)
    );
    return response.data; // Assuming backend returns the deleted customer
  }
);

export const alterCustomer = createAsyncThunk(
  "customer/alterCustomer",
  async (customer) => {
    const response = await axios.post(ALTER_CUSTOMER_DATA, customer);
    return response.data;
  }
);

export const connectProduct = createAsyncThunk(
  "customer/connectProduct",
  async (customer) => {
    const response = await axios.post(
      CONNECT_CUSTOMER_PRODUCT.replace("_id_", customer.id),
      customer
    );
    return response.data;
  }
);
const customerSlice = createSlice({
  name: "customer",
  initialState: {
    items: [],
    selectedCustomer: null,
    deletedCustomer: null,
    status: "idle",
    deleteStatus: "idle",
    alterStatus: "idle",
    error: null,
    deleteError: null,
    alterError: null,
  },
  reducers: {
    addCustomer: (state, action) => {
      state.items.push(action.payload);
    },
    removeCustomer: (state, action) => {
      const index = state.items.findIndex(
        (customer) => customer.id === action.payload
      );
      if (index !== -1) state.items.splice(index, 1);
    },
    updateCustomer: (state, action) => {
      const index = state.items.findIndex(
        (customer) => customer.id === action.payload.id
      );
      if (index !== -1) state.items[index] = action.payload;
    },
    selectCustomer: (state, action) => {
      state.selectedCustomer = action.payload;
    },
    clearSelectedCustomer: (state) => {
      state.selectedCustomer = null;
    },
    resetCustomer: (state) => {
      state.items = [];
      state.selectedCustomer = null;
      state.deletedCustomer = null;
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
      .addCase(getCustomers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteCustomer.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.deletedCustomer = action.payload; // Storing the exact deleted customer data
        const index = state.items.findIndex(
          (customer) => customer.id === action.payload.id
        );
        if (index !== -1) state.items.splice(index, 1);
        state.selectedCustomer = null;
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.error.message;
      })
      .addCase(alterCustomer.pending, (state) => {
        state.alterStatus = "loading";
      })
      .addCase(alterCustomer.fulfilled, (state, action) => {
        state.alterStatus = "succeeded";
        const index = state.items.findIndex(
          (customer) => customer.id === action.payload.id
        );
        if (index !== -1) state.items[index] = action.payload;
        state.selectedCustomer = null;
      })
      .addCase(alterCustomer.rejected, (state, action) => {
        state.alterStatus = "failed";
        state.alterError = action.error.message;
      });
  },
});

export const {
  addCustomer,
  removeCustomer,
  updateCustomer,
  selectCustomer,
  clearSelectedCustomer,
  resetCustomer,
} = customerSlice.actions;

export default customerSlice.reducer;
