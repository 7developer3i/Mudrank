import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    edit_field:false
};

export const formSlice = createSlice({
    name:"investor_form",
    initialState,
    reducers:{
        open_Edit_Field : (state) => {
            state.edit_field = true
        },

        close_Edit_Field : (state) => {
            state.edit_field = false
        }
    }
});

export const { open_Edit_Field, close_Edit_Field } = formSlice.actions;

export default formSlice.reducer;