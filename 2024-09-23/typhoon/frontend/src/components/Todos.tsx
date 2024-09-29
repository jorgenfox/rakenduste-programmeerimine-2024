import {
  Box,
  List,
  ListItem,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SubmitTodo from "./SubmitTodo";
import UpdateTodo from "./UpdateTodo";
import DeleteTodo from "./DeleteTodo";

type Todo = {
  id: number;
  title: string;
  priority: number;
  createdAt: number;
  updatedAt: number | null;
  deleted: boolean;
};

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const fetchTodos = async () => {
    const response = await fetch("http://localhost:8080/todos");
    const data = await response.json();
    setTodos(data);
  };

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleUpdateSuccess = () => {
    setSelectedTodo(null);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Box>
      <Typography variant="h3">TODOs</Typography>
      <List>
        {todos.map((todo) => (
          <ListItem key={todo.id}>
            <Card sx={{ width: "300px", marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h5">{todo.title}</Typography>
                <Typography color="text.secondary">
                  Priority: {todo.priority}
                </Typography>
                <Typography color="text.secondary">
                  Created At: {new Date(todo.createdAt).toLocaleString()}
                </Typography>
                <Typography color="text.secondary">
                  Updated At:{" "}
                  {todo.updatedAt
                    ? new Date(todo.updatedAt).toLocaleString()
                    : "Not updated"}
                </Typography>
                <Typography color="text.secondary">
                  Deleted: {todo.deleted ? "Yes" : "No"}
                </Typography>
                <Button onClick={() => handleSelectTodo(todo)}>Update</Button>
                <DeleteTodo todoId={todo.id} fetchTodos={fetchTodos} />
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
      <SubmitTodo fetchTodos={fetchTodos} />
      {selectedTodo && (
        <UpdateTodo
          todo={selectedTodo}
          fetchTodos={fetchTodos}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </Box>
  );
};

export default Todos;
