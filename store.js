import { configureStore } from "@reduxjs/toolkit";
import BasketReducer from "./feature/BasketSlice";
import RestaurantReducer from "./feature/RestaurantSlice";

export const store = configureStore({
  reducer: {
    basket: BasketReducer,
    restaurant: RestaurantReducer,
  },
});
