import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Article } from "../models/article";
import { AppState } from ".";

export type ArticlesState = Article[];
const initiateState: ArticlesState = [];

export const articlesSlice = createSlice({
  name: "articles",
  initialState: initiateState,
  reducers: {
    loadArticles: (
      state: ArticlesState,
      action: PayloadAction<ArticlesState>
    ) => {
      return [...action.payload];
    },
    deleteArticle: (state, action: PayloadAction<string>) => {
      const index = state.findIndex(
        (article) => article._id === action.payload
      );
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { loadArticles, deleteArticle } = articlesSlice.actions;

export const getAllArticles = (): ((state: AppState) => ArticlesState) => {
  return (state: AppState) => state.articles;
};

export default articlesSlice.reducer;
