'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';

export function usePokemonTracker(gameId: string) {
  const { isDemo } = useApp(); // Get demo status
  // With this const, avoid that the component initialize empty and then 'full'
  const [caughtIds, setCaughtIds] = useState<number[]>(() => {
    if (typeof window === 'undefined' || isDemo) return [];
    const saved = localStorage.getItem(`tracker-${gameId}`);
    return saved ? JSON.parse(saved) : [];
  });

  // Sync with localStorage at the moment of change game or mount
  useEffect(() => {
    queueMicrotask(() => {
      if (isDemo) {
        // If user enter on demo mode, clean the memory state
        setCaughtIds([]);
        return;
      }

      const saved = localStorage.getItem(`tracker-${gameId}`);
      const initialData = saved ? JSON.parse(saved) : [];
      setCaughtIds(initialData);
    });
  }, [gameId, isDemo]);

  const togglePokemon = (id: number) => {
    setCaughtIds((prev) => {
      const isAlreadyCaught = prev.includes(id);
      const nextIds = isAlreadyCaught ? prev.filter((pId) => pId !== id) : [...prev, id];

      // Persistencia condicional
      if (!isDemo) {
        localStorage.setItem(`tracker-${gameId}`, JSON.stringify(nextIds));
      }
      return nextIds;
    });
  };

  return { caughtIds, togglePokemon };
}
