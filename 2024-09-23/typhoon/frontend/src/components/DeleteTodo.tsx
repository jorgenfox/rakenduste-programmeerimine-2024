import React from "react";
import { Button } from "@mui/material";

type DeleteTodoProps = {
  todoId: number;
  fetchTodos: () => void;
};

const DeleteTodo = ({ todoId, fetchTodos }: DeleteTodoProps) => {
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

  return <Button onClick={deleteTodo}>Delete</Button>;
};

export default DeleteTodo;
