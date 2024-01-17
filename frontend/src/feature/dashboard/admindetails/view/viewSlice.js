import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    view_available_data:false,
    view_closed_data:false,
    view_index:null,
    close_data_view_index:null
}

export const viewSlce = createSlice({
    name:"view-details",
    initialState,
    reducers:{
        open_view_details : (state, action) => {
            state.view_available_data = true
            state.view_index = action.payload
            window.scrollTo(0, 0);
        },

        close_view_details : (state) => {
            state.view_available_data = false
            state.view_index = null
        },
        
        open_Data_View_Index : (state, action) => {
            state.view_closed_data = true
            state.close_data_view_index = action.payload
            window.scrollTo(0, 0);
        },

        close_Data_view_Index : (state) => {
            state.view_closed_data = false
            state.close_data_view_index = null
        },
    }
});

export const { open_view_details, close_Data_view_Index, open_Data_View_Index, close_view_details } = viewSlce.actions;

export default viewSlce.reducer;