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

  if (!items.length) return <div>Your cart is empty</div>;

  return (
    <div>
      <h3>Checkout</h3>
      <div>
        <h4>Order Summary</h4>
        {items.map(it => <div key={it.id}>{it.title} x {it.qty} — ₹{(it.price*it.qty).toFixed(2)}</div>)}
        <div><b>Total: ₹{total}</b></div>
      </div>

      <div style={{marginTop:12}}>
        <h4>Shipping</h4>
        {error && <div style={{color:'red'}}>{error}</div>}
        <div>
          <input placeholder="Name" value={form.name} onChange={e=>setForm(prev=>({...prev,name:e.target.value}))} />
        </div>
        <div>
          <input placeholder="Email" value={form.email} onChange={e=>setForm(prev=>({...prev,email:e.target.value}))} />
        </div>
        <div>
          <textarea placeholder="Address" value={form.address} onChange={e=>setForm(prev=>({...prev,address:e.target.value}))} />
        </div>
        <div style={{marginTop:8}}>
          <button onClick={handlePlace}>Place Order</button>
        </div>
      </div>
    </div>
  );
}
