import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function Header() {
  const count = useSelector(s => s.cart.items.reduce((acc, i) => acc + i.qty, 0));
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white shadow-sm sticky top-0 z-20 transition-all duration-300">
      <Link to="/" className="flex items-center gap-2 group">
        <h2 className="text-2xl font-bold text-pink-600 tracking-tight group-hover:scale-105 group-hover:text-pink-700 transition-transform duration-300">My E-Com</h2>
      </Link>
      <nav>
        <Link to="/cart" className="relative inline-flex items-center px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-pink-50 hover:text-pink-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-400">
          <span>Cart</span>
          <span className="ml-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-pink-600 text-white text-xs font-semibold animate-bounce-slow">{count}</span>
        </Link>
      </nav>
    </header>
  );
}
