import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurant: [],
};

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setRestaurant: (state, action) => {
      state.restaurant = action.payload;
      // console.log(state.restaurant);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRestaurant } = restaurantSlice.actions;

export const selectRestaurantInfo = (state) => state.restaurant.restaurant;

export default restaurantSlice.reducer;
