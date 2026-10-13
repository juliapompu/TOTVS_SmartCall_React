import { createContext, useContext } from 'react';

export type SnackbarSeverity = 'success' | 'error';

export interface SnackbarContextValue {
  showSuccess: (message: string) => void;
}

export const SnackbarContext = createContext<SnackbarContextValue | null>(null);

export const useGlobalSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useGlobalSnackbar deve ser usado dentro de SnackbarProvider.');
  }
  return context;
};
