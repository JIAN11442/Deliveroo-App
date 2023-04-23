import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.dish_id === action.payload.dish_id
      );

      let newBasketItems = [...state.items];

      if (index >= 0) {
        newBasketItems.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (dish_id: ${action.payload.dish_id}) as its not in basket`
        );
      }

      state.items = newBasketItems;
    },
    clearAllBasketItems: (state, action) => {
      state.items = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket, clearAllBasketItems } =
  basketSlice.actions;

export const selectBasketItems = (state) => state.basket.items;
export const selectBasketItemsWithId = (state, id) =>
  state.basket.items.filter((item) => item.dish_id === id);

export const selectBasketItemsTotalPrice = (state) =>
  state.basket.items.reduce((total, item) => (total += item.price), 0);

export default basketSlice.reducer;
