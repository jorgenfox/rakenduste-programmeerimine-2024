import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Snackbar,
  Alert,
  useTheme,
} from "@mui/material";

type SubmitTodoProps = {
  fetchTodos: () => void;
};

const SubmitTodo: React.FC<SubmitTodoProps> = ({ fetchTodos }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const theme = useTheme();

  const submitTodo = async () => {
    try {
      const response = await fetch("http://localhost:8080/todos", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, priority }),
      });

      if (response.ok) {
        console.log("Success", response);
        setSnackbarMessage("Todo added successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } else {
        console.warn("No success");
        setSnackbarMessage("Failed to add todo.");
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
    submitTodo();
    setTimeout(fetchTodos, 100);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: theme.spacing(2),
      }}
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Todo title"
            onChange={(event) => setTitle(event.target.value)}
          />
          <TextField
            label="Priority"
            type="number"
            onChange={(event) => setPriority(Number(event.target.value))}
          />
          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
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

export default SubmitTodo;
