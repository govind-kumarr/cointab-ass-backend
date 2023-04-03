import React from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { baseUrl } from "../App";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const makeLogin = async (data) => {
    try {
      const response = await fetch(`${baseUrl}user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.success)
        navigate("/home", { state: { email: data.email } });
    } catch (error) {
      console.log("Error while signing up\n", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let form = e.target;
    let data = new FormData(form);
    data = Object.fromEntries(data);

    console.log(data);
    makeLogin(data);
    form.reset();
  };
  return (
    <Box>
      <h1 style={{ textAlign: "center" }}>Login</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "500px",
          margin: "1rem auto",
          gap: "10px",
        }}
      >
        <TextField name="email" type="email" label="email" required />
        <TextField name="password" type="password" label="password" required />
        <Button variant="contained" type="submit">
          login
        </Button>
      </form>
    </Box>
  );
};
