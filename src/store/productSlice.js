import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts, fetchCategories, fetchProductById } from '../api/productsApis';
import { useLocalCache } from '../hooks/useLocalCache'; // not used directly in slice (use in components) but kept for reference

export const loadProducts = createAsyncThunk('products/loadAll', async (_, thunkAPI) => {
  const data = await fetchProducts();
  return data;
});

export const loadCategories = createAsyncThunk('products/loadCategories', async () => {
  const data = await fetchCategories();
  return data;
});

export const loadProduct = createAsyncThunk('products/loadOne', async (id) => {
  const data = await fetchProductById(id);
  return data;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    categories: [],
    selectedProduct: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelected(state) {
      state.selectedProduct = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(loadProducts.fulfilled, (s, a) => { s.loading = false; s.list = a.payload; })
      .addCase(loadProducts.rejected, (s, a) => { s.loading = false; s.error = a.error.message; })

      .addCase(loadCategories.fulfilled, (s, a) => { s.categories = a.payload; })

      .addCase(loadProduct.pending, (s) => { s.loading = true; })
      .addCase(loadProduct.fulfilled, (s, a) => { s.loading = false; s.selectedProduct = a.payload; })
      .addCase(loadProduct.rejected, (s, a) => { s.loading = false; s.error = a.error.message; });
  }
});

export const { clearSelected } = productsSlice.actions;
export default productsSlice.reducer;
