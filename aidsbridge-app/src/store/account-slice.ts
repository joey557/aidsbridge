// Import necessary functionalities from Redux Toolkit and the User model.
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../models/user';

// Define the shape of the account state.
type AccountState = {
  user: User | null;
};

// Define the initial state of the account.
const initialState: AccountState = {
  user: null,
};

// Create a slice for account-related functionalities.
export const accountSlice = createSlice({
  name: 'account', // A name used in action types
  initialState, // The initial state of this slice
  reducers: {
    // Define a reducer to set the user account
    setAccount: (state, action: PayloadAction<User>) => {
      state.user = action.payload; // Set the user in the state to the payload
    },
    // Define a reducer to clear the user account
    clearAccount: (state) => {
      state.user = null; // Reset the user in the state to null
    }
  }
});

// Export the action creators generated by the slice
export const { setAccount, clearAccount } = accountSlice.actions;

// Export a selector to get the current user from the state
export const selectCurrentUser = (state: { account: AccountState }) => state.account.user;

// Export the reducer to be combined with other slice reducers
export default accountSlice.reducer; 
