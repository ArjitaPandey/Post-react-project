import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData; // data from paramters passed
        },
        logout: (state) => {
            state.status = false;
        },
    },
});

export const { login, logout } = authSlice.actions; //actions are the functions inside reducers.
export default authSlice.reducer;