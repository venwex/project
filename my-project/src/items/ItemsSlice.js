import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { itemsService } from '../items/ItemsService';

const initialState = {
  list: [],
  selectedItem: null,
  loadingList: false,
  loadingItem: false,
  errorList: null,
  errorItem: null,
  query: '',
};

export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (query = '') => {
    const data = await itemsService.getAll(query);
    console.log('API Response:', data);
    return data.results;
  }
);

export const fetchItemById = createAsyncThunk(
  'items/fetchItemById',
  async (id) => {
    const data = await itemsService.getById(id);
    return data;
  }
);

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    clearSelectedItem: (state) => {
      state.selectedItem = null;
      state.errorItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loadingList = false;
        state.list = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.error.message;
      })
      
      .addCase(fetchItemById.pending, (state) => {
        state.loadingItem = true;
        state.errorItem = null;
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.loadingItem = false;
        state.selectedItem = action.payload;
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.loadingItem = false;
        state.errorItem = action.error.message;
      });
  },
});

export const { setQuery, clearSelectedItem } = itemsSlice.actions;
export default itemsSlice.reducer;