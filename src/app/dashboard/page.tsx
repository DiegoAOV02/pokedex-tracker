'use client';

import { useState, useEffect, useMemo } from 'react';
import { usePokemonTracker } from '@/hooks/usePokemonTracker';
import { PokeCard } from '@/components/pokemon/PokeCard';

interface PokemonData {
  id: number;
  name: string;
  image: string;
}

interface PokeAPIResultItem {
  name: string;
  url: string;
}

interface PokeAPIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokeAPIResultItem[];
}

const GAMES = [
  { id: 'fire-red', name: 'Fire Red / Leaf Green' },
  { id: 'ruby-sapphire', name: 'Ruby / Sapphire / Emerald' },
  { id: 'gold-silver', name: 'Gold / Silver / Crystal' },
];

const GEN_CONFIG = {
  1: { limit: 151, offset: 0 },
  2: { limit: 100, offset: 151 },
  3: { limit: 135, offset: 251 },
};

export default function DashboardPage() {
  const [activeGame, setActiveGame] = useState('fire-red');
  const [activeGen, setActiveGen] = useState<1 | 2 | 3>(1);
  const [pokemonList, setPokemonList] = useState<PokemonData[]>([]);
  const [loading, setLoading] = useState(true);

  const { caughtIds, togglePokemon } = usePokemonTracker(activeGame);

  useEffect(() => {
    const fetchPokemonData = async () => {
      setLoading(true);
      try {
        const { limit, offset } = GEN_CONFIG[activeGen];
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );

        // Force correct typing from JSON response
        const data: PokeAPIResponse = await response.json();

        const formattedData: PokemonData[] = data.results.map((pokemon: PokeAPIResultItem) => {
          const urlParts = pokemon.url.split('/').filter(Boolean);
          const id = parseInt(urlParts[urlParts.length - 1], 10);

          return {
            id,
            name: pokemon.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          };
        });

        setPokemonList(formattedData);
      } catch (error) {
        console.error('Error loading the Pokémon from PokeAPI:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [activeGen]);

  const totalInGen = pokemonList.length;
  const caughtInGen = useMemo(() => {
    return pokemonList.filter((p) => caughtIds.includes(p.id)).length;
  }, [pokemonList, caughtIds]);

  const progressPercentage = totalInGen > 0 ? Math.round((caughtInGen / totalInGen) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Game Selector */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              My PokéDex
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Manage your captures by sync in real time.
            </p>
          </div>

          <select
            value={activeGame}
            onChange={(e) => setActiveGame(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            {GAMES.map((game) => (
              <option key={game.id} value={game.id}>
                {game.name}
              </option>
            ))}
          </select>
        </div>

        {/* Control panel and Progress Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800/80 shadow-sm mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Generation Tabs */}
            <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl self-start">
              {([1, 2, 3] as const).map((gen) => (
                <button
                  key={gen}
                  onClick={() => setActiveGen(gen)}
                  className={`px-5 py-2.5 rounded-lg font-extrabold text-sm transition-all cursor-pointer ${
                    activeGen === gen
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Gen {gen}
                </button>
              ))}
            </div>

            {/* Dynamic Progress */}
            <div className="flex-1 lg:max-w-md w-full">
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-slate-600 dark:text-slate-400">Region Progess</span>
                <span className="text-blue-600 dark:text-blue-400">
                  {loading ? '...' : `${caughtInGen} / ${totalInGen} (${progressPercentage}%)`}
                </span>
              </div>
              <div className="w-full h-3 bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${loading ? 0 : progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main View: Skeletons vs Grid Real */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 h-44 flex flex-col justify-between items-center"
              >
                <div className="w-6 h-3 bg-slate-200 dark:bg-slate-800 rounded self-end" />
                <div className="w-20 h-20 bg-slate-200 dark:bg-slate-800 rounded-full" />
                <div className="w-16 h-4 bg-slate-200 dark:bg-slate-800 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {pokemonList.map((pokemon) => (
              <PokeCard
                key={pokemon.id}
                pokemon={pokemon}
                isCaught={caughtIds.includes(pokemon.id)}
                onToggle={togglePokemon}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
