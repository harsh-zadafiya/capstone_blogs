import { createSlice } from "@reduxjs/toolkit";

export const userDataSlice = createSlice({
  name: "userInfo",
  initialState: {
    userdata: [
      {
        fname: "admin",
        lname: "admin",
        email: "admin@canada4you.ca",
        pass: "Admin@123",
      },
    ],
  },
  reducers: {
    newUser: (state, action) => {
      state.userdata.push(action.payload);
    },
    updatePassword: (state, action) => {
      state.userdata.forEach((user) => {
        if (user.email === action.payload.email) {
          user.pass = action.payload.pass;
        }
      });
    },
  },
});

export const { newUser, updatePassword } = userDataSlice.actions;
export default userDataSlice.reducer;
