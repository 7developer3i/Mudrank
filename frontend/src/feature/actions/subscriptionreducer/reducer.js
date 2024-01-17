import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subscription:false,
  units:0
};

export const subscriptionSlice = createSlice({
   name:"subscription-slot",
   initialState,
   reducers: {
      open_subscription_section : (state) => {
        state.subscription = true
      },
      close_subscription_section : (state) => {
        state.subscription = false
      },
      inc_units : (state) => {
        state.units += 10000
      },
      dec_units : (state) => {
        if (state.units > 0) {
          state.units -= 10000
        }
      }
   }
}); 

export const { open_subscription_section, close_subscription_section, inc_units, dec_units } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
  