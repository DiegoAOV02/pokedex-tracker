import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-slate-50">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-widest text-blue-600 uppercase bg-blue-50 rounded-full">
              Tu aventura, organizada
            </span>
            <h1 className="text-6xl md:text-7xl font-black text-slate-900 mb-8 leading-tight">
              Completa tu Pokédex de forma <span className="text-blue-600">profesional</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              La herramienta definitiva para entrenadores que buscan el 100%. Gestiona múltiples
              juegos, visualiza tu progreso en tiempo real y no dejes ni un Pokémon atrás.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="lg">Comenzar Ahora</Button>
              </Link>
              <Button variant="outline" size="lg">
                Ver Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Características (How it works) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard
              icon="🎮"
              title="Soporte Multi-Generación"
              description="Desde Kanto hasta Paldea. Elige tu versión y comienza a marcar tus capturas de inmediato."
            />
            <FeatureCard
              icon="📊"
              title="Estadísticas Vivas"
              description="Visualiza tu avance con barras de progreso dinámicas por región y tipo de Pokémon."
            />
            <FeatureCard
              icon="☁️"
              title="Sincronización Local"
              description="Tus datos se guardan automáticamente en tu navegador. Tu progreso siempre está seguro."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all duration-300">
      <div className="text-4xl mb-6">{icon}</div>
      <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}
