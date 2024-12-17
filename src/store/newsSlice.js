import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArticles } from '../api/newsAPI';

export const fetchNews = createAsyncThunk('news/fetchNews', async (query) => {
  const articles = await fetchArticles(query);
  return articles;
});

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    newsList: [], 
    savedNews: [], 
    status: 'idle', 
  },
  reducers: {
    saveNews: (state, action) => {
      const isAlreadySaved = state.savedNews.some(
        (news) => news._id === action.payload._id
      );
      if (!isAlreadySaved) {
        state.savedNews.push(action.payload);
      }
    },
    removeSavedNews: (state, action) => {
      state.savedNews = state.savedNews.filter(
        (news) => news._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.newsList = action.payload;
      })
      .addCase(fetchNews.rejected, (state) => {
        state.status = 'failed';
      });
  },
});
export const { saveNews, removeSavedNews } = newsSlice.actions;
export default newsSlice.reducer;
