import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const navigateToUsers = () => {
    navigate("/users");
  };

  return (
    <Box textAlign="center">
      <Typography variant="h5">Welcome to User Management App</Typography>
      <Button variant="contained" onClick={navigateToUsers}>
        See users
      </Button>
    </Box>
  );
};

export default Home;
