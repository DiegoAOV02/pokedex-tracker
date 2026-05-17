'use client';

import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';

export function DemoButton() {
  const { setDemoMode } = useApp();
  const router = useRouter();

  const handleStartDemo = () => {
    setDemoMode(true);
    router.push('/dashboard');
  };

  return (
    <Button variant="outline" size="lg" onClick={handleStartDemo}>
      View a Demo
    </Button>
  );
}
