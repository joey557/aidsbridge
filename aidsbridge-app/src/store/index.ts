//import userReducer from "./user-slice";
import { configureStore } from "@reduxjs/toolkit";
import { articlesSlice } from "./articles-slice";
import { eventsSlice } from "./events-slice";

export const store = configureStore({
  reducer: {
    [articlesSlice.name]: articlesSlice.reducer,
    [eventsSlice.name]: eventsSlice.reducer,
  },
});

export type AppStore = typeof store;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export type AppDispatch = typeof store.dispatch;
// export default store;