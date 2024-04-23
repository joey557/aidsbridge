import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Article } from "../models/article";
import { AppState } from ".";

export type ArticlesState = Article[];
const initiateState: ArticlesState = [];

// Create a slice for articles-related functionalities.
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
    updateArticle: (state, action: PayloadAction<{ id: string; newData: Partial<Article> }>) => {
      const index = state.findIndex(article => article._id === action.payload.id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload.newData };
      }
    },
    
  },
});

export const { loadArticles, deleteArticle, updateArticle } = articlesSlice.actions;

export const getAllArticles = (): ((state: AppState) => ArticlesState) => {
  return (state: AppState) => state.articles;
};

export default articlesSlice.reducer;
