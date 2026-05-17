'use client';

import { PokemonBase } from '@/types/pokemon';
import { PokeCard } from '@/components/pokemon/PokeCard';
import { usePokemonTracker } from '@/hooks/usePokemonTracker';

interface Props {
  pokemonList: PokemonBase[];
  gameId: string;
}

export function PokemonGrid({ pokemonList, gameId }: Props) {
  const { caughtIds, togglePokemon } = usePokemonTracker(gameId);

  // Calculate stats
  const total = pokemonList.length;
  const caughtCount = caughtIds.length;
  const percentage = Math.round((caughtCount / total) * 100);

  return (
    <div className="space-y-8">
      {/* Progress bar sticky */}
      <div className="sticky top-4 z-20 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-sm mb-8">
        <div className="flex justify-between items-end mb-2">
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
              Tu Progreso
            </p>
            <h4 className="text-2xl font-black text-slate-800">
              {caughtCount} <span className="text-slate-400 text-lg">/ {total} Capturados</span>
            </h4>
          </div>
          <span className="text-blue-600 font-bold text-lg">{percentage}%</span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {pokemonList.map((pokemon) => (
          <PokeCard
            key={pokemon.id}
            pokemon={pokemon}
            isCaught={caughtIds.includes(pokemon.id)}
            onToggle={togglePokemon}
          />
        ))}
      </div>
    </div>
  );
}
