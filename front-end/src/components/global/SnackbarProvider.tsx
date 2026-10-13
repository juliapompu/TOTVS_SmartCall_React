import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { subscribeToApiErrors } from '../../services/apiErrors';
import { SnackbarContext } from './SnackbarContext';
import type { SnackbarSeverity } from './SnackbarContext';

interface SnackbarNotice {
  message: string;
  severity: SnackbarSeverity;
}

interface SnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [notice, setNotice] = useState<SnackbarNotice | null>(null);

  useEffect(
    () => subscribeToApiErrors((error) => {
      setNotice({ message: error.message, severity: 'error' });
    }),
    [],
  );

  const showSuccess = (message: string) => {
    setNotice({ message, severity: 'success' });
  };

  return (
    <SnackbarContext.Provider value={{ showSuccess }}>
      {children}
      <Snackbar
        open={notice !== null}
        autoHideDuration={5000}
        onClose={() => setNotice(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        {notice ? (
          <Alert
            onClose={() => setNotice(null)}
            severity={notice.severity}
            variant="filled"
            elevation={6}
            role={notice.severity === 'error' ? 'alert' : 'status'}
            sx={{ width: '100%' }}
          >
            {notice.message}
          </Alert>
        ) : undefined}
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
