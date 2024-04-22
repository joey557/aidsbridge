import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../models/user";
import { AppState } from ".";

export type UsersState = User[];
const initiateState: UsersState = [];
export const usersSlice = createSlice({
  name: 'users',
  initialState: initiateState,
  reducers: {
    loadEvents: (state: UsersState, action: PayloadAction<UsersState>) => {
      return [...action.payload];
    }
  }
});

export const { loadEvents } = usersSlice.actions;

export const getAllUsers = (): ((state: AppState) => UsersState) => {
  return (state: AppState) => state.users;
}

export default usersSlice.reducer;