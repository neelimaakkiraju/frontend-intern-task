import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchProducts,
  fetchCategories,
  fetchProductById,
} from "../api/productsApis";

// Simple cache helpers (from useLocalCache.js, but for non-hook usage)
const CACHE_TTL = 1000 * 60 * 10; // 10 minutes
function getCache(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.expires && Date.now() > parsed.expires) {
      localStorage.removeItem(key);
      return null;
    }
    return parsed.value;
  } catch {
    return null;
  }
}
function setCache(key, value, ttlMs = CACHE_TTL) {
  const payload = {
    value,
    expires: Date.now() + ttlMs,
  };
  localStorage.setItem(key, JSON.stringify(payload));
}

export const loadProducts = createAsyncThunk(
  "products/loadAll",
  async (_, thunkAPI) => {
    const cacheKey = "products_list";
    const cached = getCache(cacheKey);
    if (cached) {
      return cached;
    }
    const data = await fetchProducts();
    setCache(cacheKey, data);
    return data;
  }
);

export const loadCategories = createAsyncThunk(
  "products/loadCategories",
  async () => {
    const data = await fetchCategories();
    return data;
   
  }
);

export const loadProduct = createAsyncThunk("products/loadOne", async (id) => {
  const cacheKey = `product_${id}`;
  const cached = getCache(cacheKey);
  if (cached) {
    return cached;
  }
  const data = await fetchProductById(id);
  setCache(cacheKey, data);
  return data;
});

const productsSlice = createSlice({
  name: "products",
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(loadProducts.fulfilled, (s, a) => {
        s.loading = false;
        s.list = a.payload;
      })
      .addCase(loadProducts.rejected, (s, a) => {
        s.loading = false;
        s.error = a.error.message;
      })

      .addCase(loadCategories.fulfilled, (s, a) => {
        s.categories = a.payload;
      })

      .addCase(loadProduct.pending, (s) => {
        s.loading = true;
      })
      .addCase(loadProduct.fulfilled, (s, a) => {
        s.loading = false;
        s.selectedProduct = a.payload;
      })
      .addCase(loadProduct.rejected, (s, a) => {
        s.loading = false;
        s.error = a.error.message;
      });
  },
});

export const { clearSelected } = productsSlice.actions;
export default productsSlice.reducer;
