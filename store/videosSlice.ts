import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Video {
  id: number;
  title: string;
  url: string;
}

interface VideosState {
  videos: Video[];
  loading: boolean;
  error: string | null;
}

const initialState: VideosState = {
  videos: [],
  loading: false,
  error: null,
};

export const fetchVideos = createAsyncThunk(
  'videos/fetchVideos',
  async (courseId?: number) => {
    const response = await axios.get(`/api/videos${courseId ? `?courseId=${courseId}` : ''}`);
    return response.data;
  }
);

const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.videos = action.payload;
        state.loading = false;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch videos';
        state.loading = false;
      });
  },
});

export default videosSlice.reducer;