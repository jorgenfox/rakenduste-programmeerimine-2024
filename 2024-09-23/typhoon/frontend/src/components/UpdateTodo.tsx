import React, { useState } from "react";
import { Box, Button, TextField, Stack, useTheme } from "@mui/material";

type UpdateTodoProps = {
  todo: { id: number; title: string; priority: number };
  fetchTodos: () => void;
  onUpdateSuccess: () => void;
};

const UpdateTodo: React.FC<UpdateTodoProps> = ({
  todo,
  fetchTodos,
  onUpdateSuccess,
}) => {
  const [title, setTitle] = useState(todo.title);
  const [priority, setPriority] = useState(todo.priority);
  const theme = useTheme();

  const updateTodo = async () => {
    try {
      const response = await fetch(`http://localhost:8080/todos/${todo.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, priority }),
      });

      if (response.ok) {
        console.log("TODO updated successfully!");
        fetchTodos();
        onUpdateSuccess();
      } else {
        console.warn("Failed to update TODO");
      }
    } catch (error) {
      console.warn("Error updating TODO:", error);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updateTodo();
  };

  return (
    <Box
      sx={{
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.default,
      }}
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Update Todo Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
          <TextField
            label="Update Priority"
            type="number"
            value={priority}
            onChange={(event) => setPriority(Number(event.target.value))}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Update
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default UpdateTodo;
