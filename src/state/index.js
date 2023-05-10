import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  userId: "64536d9c7ac346cbd49335fd",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
