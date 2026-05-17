'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Game } from '@/types/pokemon';

export function GameSelector({ initialGames }: { initialGames: Game[] }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('fav-games');
    if (saved) {
      const parsedFavs = JSON.parse(saved);

      // Use queuieMicrotask to avoid cascading render on React 19
      queueMicrotask(() => {
        setFavorites(parsedFavs);
      });
    }
  }, []);

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.preventDefault();

    setFavorites((prev) => {
      const isFav = prev.includes(id);
      const nextFavs = isFav ? prev.filter((fav) => fav !== id) : [...prev, id];

      localStorage.setItem('fav-games', JSON.stringify(nextFavs));
      return nextFavs;
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {initialGames.map((game) => (
        <Link
          key={game.id}
          href={`/dashboard/game/${game.id}`}
          className="group relative bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300"
        >
          <button
            onClick={(e) => toggleFavorite(e, game.id)}
            className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-slate-100 transition-colors"
          >
            {favorites.includes(game.id) ? '⭐' : '☆'}
          </button>

          <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-2 block">
            {game.generation} • {game.region}
          </span>
          <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
            {game.name}
          </h3>
          <div className="mt-4 flex items-center text-sm text-slate-400 font-medium">
            Ver Pokedex
            <svg
              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      ))}
    </div>
  );
}
