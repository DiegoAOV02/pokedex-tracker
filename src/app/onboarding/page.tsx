import { pokeapi } from '@/services/pokeapi';

export default async function OnboardingPage() {
  const games = await pokeapi.getGames();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">¿Qué juegos quieres trackear?</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {games.map((game) => (
          <div
            key={game.id}
            className="border rounded-lg p-6 hover:shadow-lg transition cursor-pointer"
          >
            <h2 className="text-xl font-semibold">{game.name}</h2>
            <p className="text-gray-500">{game.region}</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
              Empezar aventura
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
