// src/app/page.tsx
import { pokeapi } from '@/services/pokeapi';
import { GameSelector } from '@/components/home/GameSelector';

export default async function HomePage() {
  const games = await pokeapi.getGames();

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100 via-slate-50 to-white p-8">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-4">
            Poke<span className="text-blue-600">Tracker</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Gestiona tu progreso en cada generación. Selecciona un juego para comenzar tu aventura o
            marca tus favoritos para acceso rápido.
          </p>
        </header>

        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Generaciones Disponibles</h2>
            <div className="h-px flex-1 bg-slate-200 ml-6"></div>
          </div>

          <GameSelector initialGames={games} />
        </section>
      </div>
    </main>
  );
}
