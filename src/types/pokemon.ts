// Define how the pokémon will look like and the games in the web

// Defining the interface for the Pokemon
export interface PokemonBase {
  id: number;
  name: string;
  image: string;
  types: string[];
}

// Defining the interface for the Pokémon Game
export interface Game {
  id: string;
  name: string;
  generation: string;
  region: string;
  logoUrl?: string;
}

// Defininf the user progress on their pokedex(es)
export interface UserProgress {
  gameId: string;
  caughtPokemonIds: number[]; // List the ids of the caught pokemon
}
