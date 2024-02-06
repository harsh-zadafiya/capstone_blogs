import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: {},
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        updateUser: (state, { payload }) => {
            state.userInfo = payload;
        },
    },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
