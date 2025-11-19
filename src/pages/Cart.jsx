import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQty, removeItem } from '../store/cartSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const items = useSelector(s => s.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const grandTotal = items.reduce((acc,i) => acc + i.price * i.qty, 0).toFixed(2);

  if (!items.length)
    return (
      <div className="text-center py-16 text-lg text-gray-500 animate-fade-in">
        Your cart is empty — <Link to="/" className="text-pink-600 hover:underline">go shopping</Link>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto animate-fade-in-up">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Shopping Cart</h3>
      <div className="grid gap-4">
        {items.map(it => (
          <div key={it.id} className="flex flex-col sm:flex-row gap-4 items-center border border-gray-200 rounded-lg p-4 bg-white shadow-sm transition-transform hover:scale-[1.01]">
            <img src={it.image} alt={it.title} className="w-20 h-20 object-contain rounded-md bg-gray-50" />
            <div className="flex-1 w-full">
              <div className="font-medium text-gray-700 mb-1">{it.title}</div>
              <div className="text-gray-500">₹{it.price} x
                <select
                  value={it.qty}
                  onChange={e => dispatch(updateQty({ id: it.id, qty: Number(e.target.value) }))}
                  className="ml-2 px-2 py-1 rounded border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
                >
                  {Array.from({ length: 10 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
                </select>
              </div>
            </div>
            <div className="text-gray-700 font-semibold">Subtotal: ₹{(it.price * it.qty).toFixed(2)}</div>
            <button
              onClick={() => dispatch(removeItem(it.id))}
              className="ml-2 px-3 py-1 rounded bg-red-100 text-red-600 hover:bg-red-200 transition-colors font-medium"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <h4 className="text-xl font-bold text-gray-800">Grand Total: ₹{grandTotal}</h4>
        <button
          onClick={() => navigate('/checkout')}
          className="px-6 py-2 rounded-lg bg-pink-600 text-white font-semibold shadow hover:bg-pink-700 transition-colors text-lg"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
