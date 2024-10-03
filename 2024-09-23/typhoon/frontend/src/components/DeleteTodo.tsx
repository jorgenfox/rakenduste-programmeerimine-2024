import React from "react";
import { Button, useTheme } from "@mui/material";

type DeleteTodoProps = {
  todoId: number;
  fetchTodos: () => void;
};

const DeleteTodo = ({ todoId, fetchTodos }: DeleteTodoProps) => {
  const theme = useTheme();

  const deleteTodo = async () => {
    try {
      const response = await fetch(`http://localhost:8080/todos/${todoId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("TODO deleted successfully!");
        fetchTodos();
      } else {
        console.warn("Failed to delete TODO");
      }
    } catch (error) {
      console.warn("Error deleting TODO:", error);
    }
  };

  return (
    <Button
      variant="contained"
      color="error"
      onClick={deleteTodo}
      sx={{ marginLeft: theme.spacing(2) }}
    >
      Delete
    </Button>
  );
};

export default DeleteTodo;
