import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null,
    loading: false,
    error: null
};

export const InvestmentSlice = createSlice({
    name: "dashboard-investment",
    initialState,
    reducers: {
        fetchDataStart: (state) => {
            state.data = null;
            state.loading = true;
            state.error = null
        },
        fetchDataSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null
        },
        fetchDataFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.data = null
        }
    }
});

export const { fetchDataFailure, fetchDataStart, fetchDataSuccess } = InvestmentSlice.actions;

export default InvestmentSlice.reducer;