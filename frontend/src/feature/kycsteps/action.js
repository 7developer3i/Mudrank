import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    first_step: false,
    second_step: true,
    third_step: false
};


export const createKYCSlice = createSlice({
    initialState,
    name: "kyc",
    reducers: {
        currenctSteps: (state, action) => {
            switch (action.payload) {
                case "first":
                    return {
                        first_step: true,
                        second_step: false,
                        third_step: false
                    }
                case "second":
                    return {
                        first_step: false,
                        second_step: true,
                        third_step: false
                    }
                case "third":
                    return {
                        first_step: false,
                        second_step: false,
                        third_step: true
                    }
                default:
                   return state
            }
        }
    }
});

export const { currenctSteps } = createKYCSlice.actions;
export default createKYCSlice.reducer;