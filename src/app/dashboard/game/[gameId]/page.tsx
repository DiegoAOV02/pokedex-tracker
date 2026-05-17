import { pokeapi } from '@/services/pokeapi';
import { PokemonGrid } from './PokemonGrid';

// Definimos la interfaz para los parámetros de la ruta
interface PageProps {
  params: Promise<{ gameId: string }>;
}

export default async function GamePage({ params }: PageProps) {
  const { gameId } = await params;
  const pokemonList = await pokeapi.getPokedex(gameId);

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12">
      <header className="max-w-6xl mx-auto mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 capitalize italic underline decoration-blue-500">
          Pokedex: {gameId.replace('-', ' ')}
        </h1>
        <p className="text-gray-500 mt-2">Haz clic en un Pokémon para marcarlo como capturado.</p>
      </header>

      <section className="max-w-6xl mx-auto">
        <PokemonGrid pokemonList={pokemonList} gameId={gameId} />
      </section>
    </main>
  );
}
