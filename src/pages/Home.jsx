import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts, loadCategories } from '../store/productsSlice';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';

export default function Home() {
  const dispatch = useDispatch();
  const { list, categories, loading, error } = useSelector(s => s.products);
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('all');

  useEffect(() => {
    if (!list || list.length === 0) dispatch(loadProducts());
    if (!categories || categories.length === 0) dispatch(loadCategories());
  }, []);

  const filtered = useMemo(() => {
    let arr = list || [];
    if (cat !== 'all') arr = arr.filter(p => p.category === cat);
    if (q.trim()) arr = arr.filter(p => p.title.toLowerCase().includes(q.toLowerCase()));
    return arr;
  }, [list, q, cat]);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div style={{display:'flex',gap:8, marginBottom:12}}>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by title" />
        <select value={cat} onChange={e=>setCat(e.target.value)}>
          <option value="all">All categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:12}}>
        {filtered.map(p => <ProductCard key={p.id} p={p} />)}
      </div>
    </div>
  );
}
