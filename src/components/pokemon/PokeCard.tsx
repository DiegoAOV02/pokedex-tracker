'use client';

import { PokemonBase } from '@/types/pokemon';
import Image from 'next/image';

interface PokeCardProps {
  pokemon: PokemonBase;
  isCaught: boolean;
  onToggle: (id: number) => void;
}

export function PokeCard({ pokemon, isCaught, onToggle }: PokeCardProps) {
  return (
    <div
      onClick={() => onToggle(pokemon.id)}
      className={`
        relative p-4 border rounded-xl cursor-pointer transition-all duration-300
        hover:scale-105 hover:shadow-md
        ${
          isCaught
            ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-500'
            : 'bg-white border-gray-100 grayscale opacity-60 hover:grayscale-0 hover:opacity-100'
        }
      `}
    >
      <div className="absolute top-2 right-2 text-[10px] font-mono text-gray-400">
        #{pokemon.id.toString().padStart(3, '0')}
      </div>

      <img src={pokemon.image} alt={pokemon.name} className="w-20 h-20 mx-auto drop-shadow-sm" />

      <p className="mt-2 text-center capitalize font-bold text-sm text-gray-700">{pokemon.name}</p>

      {isCaught && (
        <div className="mt-1 flex justify-center">
          <span className="bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-tighter">
            Capturado
          </span>
        </div>
      )}
    </div>
  );
}
