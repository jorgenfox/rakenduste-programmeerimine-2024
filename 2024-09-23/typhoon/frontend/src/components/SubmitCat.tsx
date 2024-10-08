import { Box, Button, Stack, TextField, Snackbar, Alert } from "@mui/material";
import React, { useState } from "react";

type SubmitCatProps = {
  fetchCats: () => void;
};

const SubmitCat = ({ fetchCats }: SubmitCatProps) => {
  const [name, setName] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const submitCat = async () => {
    try {
      const response = await fetch("http://localhost:8080/cats", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name }),
      });

      if (response.ok) {
        console.log("Success", response);
        setSnackbarMessage("Cat added successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } else {
        console.warn("No success");
        setSnackbarMessage("Failed to add cat.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.warn(error);
      setSnackbarMessage("An error occurred.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    submitCat();
    setTimeout(fetchCats, 100);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Cat name"
            onChange={(event) => setName(event.target.value)}
          />
          <Button type="submit">Add</Button>
        </Stack>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SubmitCat;
