import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../models/user';

type AccountState = {
  user: User | null;
};

const initialState: AccountState = {
  user: null,
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearAccount: (state) => {
      state.user = null;
    }
  }
});

export const { setAccount, clearAccount } = accountSlice.actions;
export const selectCurrentUser = (state: { account: AccountState }) => state.account.user;
export default accountSlice.reducer; 
