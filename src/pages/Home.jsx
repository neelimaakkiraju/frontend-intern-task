import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts, loadCategories } from '../store/productSlice';
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
      <div className="flex flex-col sm:flex-row gap-3 mb-6 items-center">
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search by title"
          className="w-full sm:w-64 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200 shadow-sm"
        />
        <select
          value={cat}
          onChange={e => setCat(e.target.value)}
          className="w-full sm:w-48 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200 shadow-sm bg-white"
        >
          <option value="all">All categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in-up">
        {filtered.map(p => <ProductCard key={p.id} p={p} />)}
      </div>
    </div>
  );
}
