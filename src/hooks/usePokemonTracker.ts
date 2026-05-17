'use client';

import { useState, useEffect } from 'react';

export function usePokemonTracker(gameId: string) {
  const [caughtIds, setCaughtIds] = useState<number[]>([]);

  // Sync with localStorage at the moment of change game or mount
  useEffect(() => {
    const saved = localStorage.getItem(`tracker-${gameId}`);
    const initialData = saved ? JSON.parse(saved) : [];

    // queueMicrotask mueve el setState fuera del cuerpo síncrono del efecto.
    queueMicrotask(() => {
      setCaughtIds(initialData);
    });
  }, [gameId]);

  const togglePokemon = (id: number) => {
    // Usamos la forma funcional (prev) para garantizar que siempre
    // trabajamos con la lista más actualizada de IDs.
    setCaughtIds((prev) => {
      const isAlreadyCaught = prev.includes(id);
      const nextIds = isAlreadyCaught ? prev.filter((pId) => pId !== id) : [...prev, id];

      // Save the new state on localStorage
      localStorage.setItem(`tracker-${gameId}`, JSON.stringify(nextIds));
      return nextIds;
    });
  };

  return { caughtIds, togglePokemon };
}
