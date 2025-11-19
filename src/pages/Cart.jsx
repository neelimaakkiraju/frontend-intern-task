import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQty, removeItem } from '../store/cartSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const items = useSelector(s => s.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const grandTotal = items.reduce((acc,i) => acc + i.price * i.qty, 0).toFixed(2);

  if (!items.length) return <div>Your cart is empty — <Link to="/">go shopping</Link></div>;

  return (
    <div>
      <h3>Shopping Cart</h3>
      <div style={{display:'grid',gap:12}}>
        {items.map(it => (
          <div key={it.id} style={{display:'flex',gap:12,alignItems:'center',border:'1px solid #eee',padding:8}}>
            <img src={it.image} alt={it.title} style={{width:80,height:80,objectFit:'contain'}}/>
            <div style={{flex:1}}>
              <div>{it.title}</div>
              <div>₹{it.price} x 
                <select value={it.qty} onChange={e=>dispatch(updateQty({ id: it.id, qty: Number(e.target.value)}))}>
                  {Array.from({length:10},(_,i)=><option key={i+1} value={i+1}>{i+1}</option>)}
                </select>
              </div>
            </div>
            <div>Subtotal: ₹{(it.price * it.qty).toFixed(2)}</div>
            <button onClick={() => dispatch(removeItem(it.id))}>Remove</button>
          </div>
        ))}
      </div>

      <div style={{marginTop:20}}>
        <h4>Grand Total: ₹{grandTotal}</h4>
        <button onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
      </div>
    </div>
  );
}
