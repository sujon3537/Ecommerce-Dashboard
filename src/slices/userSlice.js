import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    loggedUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { loggedUser } = userSlice.actions;

export default userSlice.reducer;
