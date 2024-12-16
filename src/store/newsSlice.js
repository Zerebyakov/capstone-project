import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArticles } from '../api/newsAPI';

// Async thunk untuk mengambil data artikel
export const fetchNews = createAsyncThunk('news/fetchNews', async (query) => {
  const articles = await fetchArticles(query);
  return articles;
});

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    newsList: [], // Semua berita yang diambil dari API
    savedNews: [], // Daftar berita yang disimpan pengguna
    status: 'idle', // Status pemuatan data berita
  },
  reducers: {
    // Action untuk menyimpan berita ke savedNews
    saveNews: (state, action) => {
      // Cek apakah berita sudah ada di savedNews
      const isAlreadySaved = state.savedNews.some(
        (news) => news._id === action.payload._id
      );
      if (!isAlreadySaved) {
        state.savedNews.push(action.payload);
      }
    },
    // Action untuk menghapus berita dari savedNews
    removeSavedNews: (state, action) => {
      // Hapus berita berdasarkan _id
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

// Ekspor actions dan reducer
export const { saveNews, removeSavedNews } = newsSlice.actions;
export default newsSlice.reducer;
