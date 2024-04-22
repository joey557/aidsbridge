// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { User } from "../models/user";
// import { Dispatch } from "@reduxjs/toolkit";
// // import { AppState } from "./index";

// const initialState: User = {
//   _id: "",
//   userName: "",
//   accountId: "",
//   password: "",
// };
// const userSlice = createSlice({
//   name: "user",
//   initialState: initialState,
//   reducers: {
//     setUser: (state: User, action: PayloadAction<User>) => {
//       return action.payload;
//     },
//     changeUserName: (state: User, action: PayloadAction<string>) => {
//       state.userName = action.payload;
//     },
//     changeUserPassword: (state: User, action: PayloadAction<string>) => {
//       state.password = action.payload;
//     },
//   },
// });

// const { setUser, changeUserName, changeUserPassword } = userSlice.actions;
// const fetchUser = () => {
//   return async (dispatch : Dispatch) => {
//     const response = await fetch("http://localhost:3000/aidsbridge/login");
//     const data = await response.json();
//     dispatch(setUser(data));
//   };
// };

// // function fetchUser() {
// //     return function(dispatch, getState) {
// //       dispatch({ type: 'FETCH_USER_START' });

// //       return fetch('http://localhost:3000/aidsbridge/login')
// //         .then(response => response.json())
// //         .then(user => dispatch({ type: 'FETCH_USER_SUCCESS', user }))
// //         .catch(error => dispatch({ type: 'FETCH_USER_ERROR', error }));
// //     };
// //   }

// export { userSlice, fetchUser, changeUserName, changeUserPassword };
// const userReducer = userSlice.reducer;
// export default userReducer;

// user-slice.ts
import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { User } from "../models/user";

const initialState: User = {
  _id: "",
  userName: "",
  accountId: "",
  password: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => action.payload,
    changeUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    changeUserPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
});

export const { setUser, changeUserName, changeUserPassword } =
  userSlice.actions;

export const fetchUser = () => async (dispatch: Dispatch) => {
  try {
    const response = await fetch("http://localhost:3000/aidsbridge/user");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: User = await response.json();
    dispatch(setUser(data));
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }
};

export default userSlice.reducer;
