import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Home = () => {
  const { email } = useLocation().state;
  const navigate = useNavigate();
  
  return (
    <Box
      sx={{
        maxWidth: "800px",
        margin: "1rem auto",
        border: "3px solid var(--primary-color)",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Button variant="outlined">
        Welcome{"  "} {email}
      </Button>
      <Button variant="contained" color="error" onClick={() => navigate("/")}>
        logout
      </Button>
    </Box>
  );
};
