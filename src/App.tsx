import { BrowserRouter } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  CssBaseline,
  IconButton,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useState } from "react";
import { SnackbarProvider } from "./services/snackbar-service";
import { AppRoutes } from "./routes";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = createTheme({ palette: { mode: darkMode ? "dark" : "light" } });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackbarProvider>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed">
              <Toolbar>
                <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                  User Management
                </Typography>
                <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
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
    </ThemeProvider>
  );
}

export default App;
