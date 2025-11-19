import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadProduct, clearSelected } from '../store/productsSlice';
import { addToCart } from '../store/cartSlice';
import Loading from '../components/Loading';

export default function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedProduct: p, loading } = useSelector(s => s.products);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(loadProduct(id));
    return () => dispatch(clearSelected());
  }, [id]);

  if (loading || !p) return <Loading />;
  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
      <div>
        <img src={p.image} alt={p.title} style={{width:'100%', maxHeight:500, objectFit:'contain'}} />
      </div>
      <div>
        <h2>{p.title}</h2>
        <p>{p.description}</p>
        <p><b>₹{p.price}</b> — Rating: {p.rating?.rate ?? 'N/A'}</p>

        <div style={{marginTop:12}}>
          <label>Qty: </label>
          <select value={qty} onChange={e=>setQty(Number(e.target.value))}>
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>

        <div style={{marginTop:12}}>
          <button onClick={() => {
            dispatch(addToCart({ product: p, qty }));
            navigate('/cart');
          }}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
