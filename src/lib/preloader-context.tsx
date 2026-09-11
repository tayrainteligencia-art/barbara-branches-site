"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type PreloaderState = {
  ready: boolean;
  markReady: () => void;
};

const PreloaderContext = createContext<PreloaderState>({
  ready: true,
  markReady: () => {},
});

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  const [animationDone, setAnimationDone] = useState(false);
  const markReady = useCallback(() => setAnimationDone(true), []);
  const ready = reducedMotion || animationDone;

  return (
    <PreloaderContext.Provider value={{ ready, markReady }}>
      {children}
    </PreloaderContext.Provider>
  );
}

/** true assim que o preloader termina (ou de imediato, com prefers-reduced-motion) */
export function usePreloaderReady() {
  return useContext(PreloaderContext).ready;
}

export function useMarkPreloaderReady() {
  return useContext(PreloaderContext).markReady;
}
