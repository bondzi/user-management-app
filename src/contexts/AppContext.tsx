import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, Theme } from '@mui/material/styles';

interface AppContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  // TODO: Add user-related properties
  // currentUser: User | null;
  // users: User[];
  // setCurrentUser: (user: User | null) => void;
  // setUsers: (users: User[]) => void;
}

// TODO: Define a User type
// interface User {
//   id: string;
//   name: string;
//   // Add other user properties as needed
// }

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

/**
 * AppProvider component that manages the global application state.
 * It currently provides:
 * - Dark mode toggle functionality
 * 
 * TODO: This context can be further extended to include:
 * - Current user management
 * - List of users management
 * 
 * These additions would allow for centralized user state management
 * across the application.
 */
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  
  // TODO: Add state for current user and list of users
  // const [currentUser, setCurrentUser] = useState<User | null>(null);
  // const [users, setUsers] = useState<User[]>([]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const theme: Theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <AppContext.Provider value={{
      darkMode,
      toggleDarkMode,
      // TODO: Include user-related properties and functions in the context value
      // currentUser,
      // users,
      // setCurrentUser,
      // setUsers
    }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </AppContext.Provider>
  );
};
