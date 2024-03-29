import React from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { baseUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openModal } from "../../redux/feature";

export const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const makeSignUp = async (data) => {
    try {
      const response = await fetch(`${baseUrl}user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      console.log(responseData);
      dispatch(openModal(responseData.message));
      if (responseData.success)
        navigate("/login", { state: { email: data.email } });
    } catch (error) {
      console.log("Error while signing up\n", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(openModal("Signing Up"));
    let form = e.target;
    let data = new FormData(form);
    data = Object.fromEntries(data);

    console.log(data);
    makeSignUp(data);
    form.reset();
  };
  return (
    <Box>
      <h1 style={{ textAlign: "center" }}>Sign UP</h1>
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
          signup
        </Button>
        <Button
          variant="outlined"
          type="button"
          sx={{ marginTop: "10px" }}
          onClick={() => navigate("/login")}
        >
          login
        </Button>
      </form>
    </Box>
  );
};
