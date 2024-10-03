import React, { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  Button,
  Typography,
  Card,
  CardContent,
  useTheme,
  Stack,
} from "@mui/material";
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

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const theme = useTheme();

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: theme.spacing(4),
      }}
    >
      <Typography variant="h3" color={theme.palette.primary.main}>
        TODOs
      </Typography>
      <SubmitTodo fetchTodos={fetchTodos} />
      {selectedTodo && (
        <UpdateTodo
          todo={selectedTodo}
          fetchTodos={fetchTodos}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
      <List sx={{ width: "100%", maxWidth: 400 }}>
        {" "}
        {todos.map((todo) => (
          <ListItem key={todo.id} sx={{ width: "100%" }}>
            {" "}
            <Card sx={{ width: "100%", marginBottom: theme.spacing(2) }}>
              {" "}
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
                <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
                  <Button
                    variant="contained"
                    onClick={() => handleSelectTodo(todo)}
                    sx={{ marginTop: theme.spacing(1) }}
                  >
                    Update
                  </Button>
                  <DeleteTodo todoId={todo.id} fetchTodos={fetchTodos} />
                </Stack>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Todos;
