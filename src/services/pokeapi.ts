// This service works using the native `fetch` of NextJS to avoid overload the API and accelerate the navigation

import { Game, PokemonBase } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

// Defining interfaces for the response of pokeapi
interface PokeAPIPokemonListItem {
  name: string;
  url: string;
}

interface PokeAPIListResponse {
  results: PokeAPIPokemonListItem[];
}

export const pokeapi = {
  // Get list of the games (versions)
  async getGames(): Promise<Game[]> {
    return [
      { id: 'red-blue', name: 'Pokémon Red/Blue', generation: 'Gen I', region: 'Kanto' },
      { id: 'gold-silver', name: 'Pokémon Gold/Silver', generation: 'Gen II', region: 'Johto' },
      {
        id: 'ruby-sapphire',
        name: 'Pokémon Ruby/Sapphire',
        generation: 'Gen III',
        region: 'Hoenn',
      },
    ];
  },

  // Get the pokemon from a specific Pokedex per game
  async getPokedex(gameId: string): Promise<PokemonBase[]> {
    const generationMapping: Record<string, { limit: number; offset: number }> = {
      'red-blue': { limit: 151, offset: 0 },
      'gold-silver': { limit: 100, offset: 0 },
      'ruby-sapphire': { limit: 135, offset: 0 },
    };

    const { limit, offset } = generationMapping[gameId] || generationMapping['red-blue'];

    const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`, {
      next: { revalidate: 3600 },
    });

    // Applying the interface to JSON response
    const data: PokeAPIListResponse = await response.json();

    return data.results.map((pokemon, index) => {
      // Calculate the real ID using offset
      const realId = offset + index + 1;

      return {
        id: realId,
        name: pokemon.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${realId}.png`,
        types: [],
      };
    });
  },
};
