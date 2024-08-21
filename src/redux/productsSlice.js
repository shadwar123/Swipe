import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    deleteProduct: (state, action) => {
      return state.map(productGroup =>
        productGroup.filter(product => product.itemId !== action.payload)
      );
    },
    updateProduct: (state, action) => {
      const { itemName } = action.payload;
      // console.log("prod payload", action.payload);
      
      state.forEach(productGroup => {

        const index = productGroup.findIndex(product => product.itemName === itemName);

        // console.log("index",index)
        if (index !== -1) {
          productGroup[index] = action.payload;
        }
      });
    },
  },
});

export const {
  addProduct,
  deleteProduct,
  updateProduct,
} = productsSlice.actions;

export const selectProductList = (state) => state.products;

export default productsSlice.reducer;
