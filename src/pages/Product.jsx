import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadProduct, clearSelected } from '../store/productSlice';
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto bg-white rounded-lg shadow p-6 animate-fade-in-up">
      <div className="flex items-center justify-center">
        <img src={p.image} alt={p.title} className="w-full max-h-[400px] object-contain rounded bg-gray-50 p-4" />
      </div>
      <div className="flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">{p.title}</h2>
        <p className="mb-4 text-gray-600">{p.description}</p>
        <p className="mb-4 text-lg font-semibold text-pink-700">{p.price} <span className="text-sm text-gray-500 font-normal">— Rating: {p.rating?.rate ?? 'N/A'}</span></p>

        <div className="mb-4 flex items-center gap-2">
          <label className="font-medium text-gray-700">Qty:</label>
          <select
            value={qty}
            onChange={e => setQty(Number(e.target.value))}
            className="px-3 py-1 rounded border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
          >
            {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>

        <button
          onClick={() => {
            dispatch(addToCart({ product: p, qty }));
            navigate('/cart');
          }}
          className="px-6 py-2 rounded-lg bg-pink-600 text-white font-semibold shadow hover:bg-pink-700 transition-colors text-lg w-full md:w-auto"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
