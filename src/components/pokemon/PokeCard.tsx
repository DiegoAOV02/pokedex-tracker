'use client';

interface PokeCardProps {
  pokemon: {
    id: number;
    name: string;
    image: string;
  };
  isCaught: boolean;
  onToggle: (id: number) => void;
}

export function PokeCard({ pokemon, isCaught, onToggle }: PokeCardProps) {
  return (
    <div
      onClick={() => onToggle(pokemon.id)}
      className={`
        relative p-5 border rounded-2xl cursor-pointer transition-all duration-300 select-none
        hover:scale-105 hover:shadow-lg active:scale-95
        ${
          isCaught
            ? 'bg-blue-50/70 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800/50 ring-2 ring-blue-500/50'
            : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800/80 grayscale opacity-60 hover:grayscale-0 hover:opacity-100'
        }
      `}
    >
      {/* Pokémon ID */}
      <div className="absolute top-3 right-3 text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500">
        #{pokemon.id.toString().padStart(3, '0')}
      </div>

      {/* Pokémon Image */}
      <div className="w-24 h-24 mx-auto flex items-center justify-center">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-20 h-20 object-contain drop-shadow-md transform transition-transform duration-300 hover:rotate-6"
          loading="lazy"
        />
      </div>

      {/* Name */}
      <p className="mt-3 text-center capitalize font-black text-sm text-slate-700 dark:text-slate-300 tracking-wide">
        {pokemon.name}
      </p>

      {/* Indicator of caputure complete */}
      <div className="mt-2 flex justify-center">
        <span
          className={`
          text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider transition-all
          ${
            isCaught
              ? 'bg-blue-500 text-white shadow-sm shadow-blue-500/20'
              : 'bg-slate-100 dark:bg-slate-950 text-slate-400 dark:text-slate-500'
          }
        `}
        >
          {isCaught ? 'Captured' : 'Pending'}
        </span>
      </div>
    </div>
  );
}
