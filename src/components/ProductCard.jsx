import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ p }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col h-full animate-fade-in-up">
      <Link to={`/product/${p.id}`} className="block mb-2 group">
        <img src={p.image} alt={p.title} className="w-full h-44 object-contain rounded bg-gray-50 mb-2 transition-transform group-hover:scale-105" />
        <h4 className="text-sm font-medium min-h-[40px] text-gray-800 group-hover:text-pink-700 transition-colors">{p.title}</h4>
      </Link>
      <div className="flex justify-between items-center mt-auto pt-2">
        <b className="text-pink-700 text-lg">₹{p.price}</b>
        <Link
          to={`/product/${p.id}`}
          className="px-4 py-1 rounded bg-pink-600 text-white font-semibold shadow hover:bg-pink-700 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
        >
          View
        </Link>
      </div>
    </div>
  );
}
