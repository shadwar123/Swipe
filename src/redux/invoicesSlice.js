import { createSlice } from "@reduxjs/toolkit";

const invoicesSlice = createSlice({
  name: "invoices",
  initialState: [],
  reducers: {
    addInvoice: (state, action) => {
      state.push(action.payload);
    },
    deleteInvoice: (state, action) => {
      return state.filter((invoice) => invoice.id !== action.payload);
    },
    updateInvoice: (state, action) => {
      const index = state.findIndex(
        (invoice) => invoice.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload.updatedInvoice;
      }
    },
    updateInvoiceItem: (state, action) => {
      const { itemName, updatedProduct } = action.payload;
      state.forEach((invoice) => {
        invoice.items.forEach((item, index) => {
          if (item.itemName === itemName) {
            invoice.items[index] = updatedProduct;
          }
        });
      });
    },
  },
});

export const {
  addInvoice,
  deleteInvoice,
  updateInvoice,
  updateInvoiceItem,
} = invoicesSlice.actions;

export const selectInvoiceList = (state) => state.invoices;

export default invoicesSlice.reducer;
