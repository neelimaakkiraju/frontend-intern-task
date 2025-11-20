import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadCategories } from '../store/productSlice';


export default function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  const count = useSelector(s => s.cart.items.reduce((acc, i) => acc + i.qty, 0));
  const categories = useSelector(s => s.products.categories);

  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(loadCategories());
    }
  }, [dispatch, categories]);

  // Helper to build category link
  const getCategoryLink = (cat) => {
    // Home page uses ?cat=category for filtering
    return cat === 'all' ? '/' : `/?cat=${encodeURIComponent(cat)}`;
  };

  // Highlight active category
  const getActiveCategory = () => {
    const params = new URLSearchParams(location.search);
    return params.get('cat') || 'all';
  };
  const activeCat = getActiveCategory();

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white shadow-sm sticky top-0 z-20 transition-all duration-300">
      <Link to="/" className="flex items-center gap-2 group">
        <h2 className="text-2xl font-bold text-pink-600 tracking-tight group-hover:scale-105 group-hover:text-pink-700 transition-transform duration-300">SimpleStore</h2>
      </Link>
      <nav className="flex items-center gap-6">
        {/* Categories */}
        <div className="flex gap-2">
          <Link
            to={getCategoryLink('all')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${activeCat === 'all' ? 'bg-pink-100 text-pink-700' : 'text-gray-700 hover:bg-pink-50 hover:text-pink-700'}`}
          >
            All
          </Link>
          {categories && categories.map(cat => (
            <Link
              key={cat}
              to={getCategoryLink(cat)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${activeCat === cat ? 'bg-pink-100 text-pink-700' : 'text-gray-700 hover:bg-pink-50 hover:text-pink-700'}`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Link>
          ))}
        </div>
        {/* Cart */}
        <Link to="/cart" className="relative inline-flex items-center px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-pink-50 hover:text-pink-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-400">
          <span>Cart</span>
          <span className="ml-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-pink-600 text-white text-xs font-semibold animate-bounce-slow">{count}</span>
        </Link>
      </nav>
    </header>
  );
}
