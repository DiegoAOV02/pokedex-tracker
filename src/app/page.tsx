import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { DemoButton } from '@/components/home/DemoButton';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export default function LandingPage() {
  return (
    // bg-white para luz, bg-slate-950 para oscuro
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500">
      <ThemeToggle />

      {/* Hero Section: Gradiente de arriba hacia abajo */}
      <section className="relative pt-32 pb-40 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-100/50 dark:bg-blue-900/30 rounded-full">
            Your adventure, structured
          </span>
          <h1 className="text-6xl md:text-7xl font-black text-slate-900 dark:text-white mb-8">
            Complete your Pokédex{' '}
            <span className="text-blue-600 dark:text-blue-400">organized</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto">
            The tool for poke-trainers. Manage your Pokémon games and visualize your progress with a
            friendly design
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg">Begin your tracking</Button>
            </Link>
            <DemoButton />
          </div>
        </div>
      </section>

      {/* Características: Gradiente inverso para suavizar la transición */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50 dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="🎮"
              title="Multi-Generation"
              description="In future updates, we will implement multi-generations. Currently working with the first Generation of Pokémon."
            />
            <FeatureCard
              icon="📊"
              title="Stats"
              description="Visualize your regional progress in real time."
            />
            <FeatureCard
              icon="🌙"
              title="Dark Mode"
              description="Design to reduce eye strain during night time use."
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
    <div className="p-8 rounded-3xl border border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm shadow-sm hover:shadow-xl transition-all">
      <div className="text-4xl mb-6">{icon}</div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  );
}
