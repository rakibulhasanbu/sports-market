import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {}

// Define the initial state using that type
const initialState: IInitialState = {};

export const userSlice = createSlice({
  name: "user",
  // createSlice will infer the state type from the initialState argument
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {},
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
