import React, { createContext, useContext, useState } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

/**
 * Snackbar Service
 * 
 * This service provides a centralized way to display snackbar notifications
 * throughout the application. It uses React Context to make the snackbar
 * functionality available to all components without prop drilling.
 * 
 * Key features:
 * - Customizable message and severity (info, success, warning, error)
 * - Auto-hide after 6 seconds
 * - Closable by user interaction
 * 
 * Usage:
 * 1. Wrap your app or a part of it with <SnackbarProvider>
 * 2. Use the useSnackbar hook in your components to access the showSnackbar function
 * 3. Call showSnackbar(message, severity) to display a notification
 * 
 * Example:
 *   const { showSnackbar } = useSnackbar();
 *   showSnackbar('User updated successfully', 'success');
 */

interface SnackbarContextType {
  showSnackbar: (message: string, severity: AlertColor) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor>('info');

  const showSnackbar = (message: string, severity: AlertColor) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

/**
 * Custom hook to use the Snackbar service
 * 
 * This hook provides access to the showSnackbar function, allowing
 * components to trigger snackbar notifications easily.
 * 
 * @throws Error if used outside of a SnackbarProvider
 * @returns An object containing the showSnackbar function
 */
export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
