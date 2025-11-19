import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('cart_items') || '[]')
};

const saveCart = (items) => localStorage.setItem('cart_items', JSON.stringify(items));

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const { product, qty } = action.payload;
      const existing = state.items.find(i => i.id === product.id);
      if (existing) {
        existing.qty = Math.min(10, existing.qty + qty);
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          qty
        });
      }
      saveCart(state.items);
    },
    updateQty(state, action) {
      const { id, qty } = action.payload;
      const it = state.items.find(i => i.id === id);
      if (it) it.qty = qty;
      saveCart(state.items);
    },
    removeItem(state, action) {
      state.items = state.items.filter(i => i.id !== action.payload);
      saveCart(state.items);
    },
    clearCart(state) {
      state.items = [];
      saveCart(state.items);
    }
  }
});

export const { addToCart, updateQty, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
