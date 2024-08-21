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
      // console.log("state of invoice",state)
      // console.log("action of invoi", action.payload.id)
      const index = state.findIndex(
        (invoice) => invoice.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload.updatedInvoice;
      }
    },
    updateInvoiceItem: (state, action) => {
      const { itemName, updatedProduct } = action.payload;

      // Loop through each invoice in the state
      state.forEach((invoice) => {
        // Loop through each item in the invoice's items array
        invoice.items.forEach((item, index) => {
          // If the item's itemName matches, update the item
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
