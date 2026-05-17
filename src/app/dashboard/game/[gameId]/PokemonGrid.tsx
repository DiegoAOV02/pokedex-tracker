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

  return (
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
  );
}
