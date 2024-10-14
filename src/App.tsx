import { BrowserRouter } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  CssBaseline,
  IconButton,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { SnackbarProvider } from "./services/snackbar-service";
import { AppRoutes } from "./routes";
import { AppProvider, useAppContext } from "./contexts/AppContext";

function AppContent() {
  const { darkMode, toggleDarkMode } = useAppContext();

  return (
    <BrowserRouter>
      <SnackbarProvider>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="fixed">
            <Toolbar>
              <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                User Management
              </Typography>
              <IconButton color="inherit" onClick={toggleDarkMode}>
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box component="main" py={10} px={4} flexGrow={1}>
            <AppRoutes />
          </Box>
        </Box>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
