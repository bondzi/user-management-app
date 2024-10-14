import { Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const navigateToUsers = () => {
    navigate("/users");
  };

  return (
    <div>
      <Typography variant="h5">Welcome to User Management App</Typography>
      <Button variant="contained" onClick={navigateToUsers}>
        See users
      </Button>
    </div>
  );
};

export default Home;
