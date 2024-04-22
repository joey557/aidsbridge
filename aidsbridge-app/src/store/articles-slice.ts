import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Article } from "../models/article";
import { AppState } from ".";

export type ArticlesState = Article[];
const initiateState: ArticlesState = [];
export const articlesSlice = createSlice({
    name: 'articles',
    initialState: initiateState,
    reducers: {
        loadArticles: (state: ArticlesState, action: PayloadAction<ArticlesState>) => {
            return [...action.payload];
        }
    }
});

export const { loadArticles } = articlesSlice.actions;

export const getAllArticles = (): ((state: AppState) => ArticlesState) => {
    return (state: AppState) => state.articles;
}

// export const getArticleImageId = (articleId: string | undefined): ((state: AppState) => Article | undefined) => {
//     return (state: AppState) => state.articles.find((article) => article.imageId === articleId);
// }

export default articlesSlice.reducer;