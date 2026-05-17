// src/app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(false); // Empezamos en Signup como pidió el usuario
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* LADO IZQUIERDO: Visual & Branding (Oculto en móvil) */}
      <section className="hidden lg:flex relative flex-col items-center justify-center overflow-hidden bg-[#0d1117]">
        {/* Efecto de fondo tipo partículas/estrellas */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #30363d 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        ></div>

        <div className="relative z-10 text-center px-12">
          <div className="mb-8 flex justify-center">
            {/* Aquí es donde colocarás tu imagen personalizada */}
            <div className="relative w-64 h-64 animate-float">
              <img
                src="/images/auth/hero-pokemon.png"
                alt="Pokemon Hero"
                className="w-full h-full object-contain drop-shadow-[0_0_35px_rgba(59,130,246,0.5)]"
                onError={(e) =>
                  (e.currentTarget.src =
                    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/150.png')
                }
              />
            </div>
          </div>
          <h1 className="text-4xl font-black text-white mb-4 tracking-tight">
            Explora el mundo <br /> <span className="text-blue-500">Pokémon</span> como nunca.
          </h1>
          <p className="text-slate-400 text-lg max-w-sm mx-auto">
            Únete a la comunidad de maestros entrenadores y lleva el control total de tu aventura.
          </p>
        </div>

        {/* Gradiente inferior para suavizar el diseño */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
      </section>

      {/* LADO DERECHO: Formulario Dinámico */}
      <section className="flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md transition-all duration-500 ease-in-out">
          {/* Header del Formulario */}
          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {isLogin ? 'Inicia sesión' : 'Crea tu cuenta gratuita'}
            </h2>
            <p className="text-slate-500 mt-2">
              {isLogin
                ? 'Ingresa tus credenciales para continuar.'
                : 'Regístrate para empezar a trackear tu Pokédex.'}
            </p>
          </div>

          {/* Formulario con transición de opacidad */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5 animate-in fade-in duration-700"
            key={isLogin ? 'login' : 'signup'}
          >
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Nombre de usuario
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="AshKetchum123"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Correo electrónico
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="entrenador@pueblopaleta.com"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-semibold text-slate-700">Contraseña</label>
                {isLogin && (
                  <a href="#" className="text-xs font-medium text-blue-600 hover:underline">
                    ¿Olvidaste tu contraseña?
                  </a>
                )}
              </div>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <Button type="submit" className="w-full mt-2" size="lg">
              {isLogin ? 'Entrar ahora' : 'Crear cuenta'}
            </Button>
          </form>

          {/* Selector de modo Smooth */}
          <div className="mt-10 pt-8 border-t border-slate-100">
            <p className="text-center text-slate-600 text-sm font-medium">
              {isLogin ? '¿Eres nuevo aquí?' : '¿Ya tienes una cuenta?'}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-blue-600 font-bold hover:text-blue-700 transition-colors focus:outline-none cursor-pointer"
              >
                {isLogin ? 'Regístrate gratis' : 'Inicia sesión'}
              </button>
            </p>
          </div>
        </div>
      </section>

      {/* Estilo para la animación de flotado (puedes moverlo a globals.css) */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
