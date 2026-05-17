'use client';

import { useSyncExternalStore } from 'react';
import { useApp } from '@/context/AppContext';

// Función para suscribirse a cambios (necesaria para useSyncExternalStore)
const subscribe = () => () => {};

export function ThemeToggle() {
  const { theme, toggleTheme } = useApp();

  // useSyncExternalStore garantiza que el valor sea consistente.
  // El tercer parámetro () => null es lo que se renderiza en el servidor.
  const isServer = useSyncExternalStore(
    subscribe,
    () => false,
    () => true
  );

  // Si estamos en el servidor, no renderizamos nada para evitar el mismatch
  if (isServer) return <div className="fixed top-6 right-6 p-3 w-12 h-12" />;

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 text-2xl hover:scale-110 transition-all cursor-pointer"
      aria-label="Cambiar modo de color"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
