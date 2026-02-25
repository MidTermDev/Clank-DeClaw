"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    // Fallback if not wrapped in provider
    return { showToast: (message: string) => console.log(message) };
  }
  return context;
}

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
          <div className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white shadow-lg">
            {toast}
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}
