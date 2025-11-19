import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const items = useSelector(s => s.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name:'', email:'', address:'' });
  const [error, setError] = useState('');

  const total = items.reduce((a,i)=>a+i.price*i.qty,0).toFixed(2);

  const handlePlace = () => {
    if (!form.name || !form.email || !form.address) {
      setError('Please fill all fields');
      return;
    }
    // simple validation for email
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError('Invalid email');
      return;
    }
    // Place order (no backend) — clear cart, show confirmation
    dispatch(clearCart());
    navigate('/', { state: { orderPlaced: true, name: form.name } });
    alert(`Order placed! Thank you, ${form.name}. Total ₹${total}`);
  };

  if (!items.length)
    return <div className="text-center py-16 text-lg text-gray-500 animate-fade-in">Your cart is empty</div>;

  return (
    <div className="max-w-2xl mx-auto animate-fade-in-up">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Checkout</h3>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h4 className="text-lg font-semibold mb-3 text-gray-700">Order Summary</h4>
        <div className="divide-y divide-gray-100 mb-3">
          {items.map(it => (
            <div key={it.id} className="flex justify-between py-2 text-gray-600">
              <span>{it.title} <span className="text-xs text-gray-400">x {it.qty}</span></span>
              <span>₹{(it.price * it.qty).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="text-right text-lg font-bold text-gray-800">Total: ₹{total}</div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="text-lg font-semibold mb-3 text-gray-700">Shipping</h4>
        {error && <div className="mb-3 text-red-600 font-medium animate-fade-in">{error}</div>}
        <div className="space-y-4">
          <input
            placeholder="Name"
            value={form.name}
            onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
          />
          <input
            placeholder="Email"
            value={form.email}
            onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
          />
          <textarea
            placeholder="Address"
            value={form.address}
            onChange={e => setForm(prev => ({ ...prev, address: e.target.value }))}
            className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all min-h-[80px]"
          />
        </div>
        <div className="mt-6 text-right">
          <button
            onClick={handlePlace}
            className="px-6 py-2 rounded-lg bg-pink-600 text-white font-semibold shadow hover:bg-pink-700 transition-colors text-lg"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
