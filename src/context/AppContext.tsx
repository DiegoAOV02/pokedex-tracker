'use client';

import React, { createContext, useContext, useState } from 'react';

interface AppContextType {
  isDemo: boolean;
  setDemoMode: (value: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isDemo, setIsDemo] = useState(false);

  return (
    <AppContext.Provider value={{ isDemo, setDemoMode: setIsDemo }}>{children}</AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp debe usarse dentro de AppProvider');
  return context;
};
