const crypto = require("crypto");

let todos = [
  {
    id: crypto.randomUUID(),
    title: "Learn Node.js",
    priority: 1,
    createdAt: Date.now(),
    updatedAt: null,
    deleted: false,
  },
  {
    id: crypto.randomUUID(),
    title: "Complete Homework",
    priority: 2,
    createdAt: Date.now(),
    updatedAt: null,
    deleted: false,
  },
];

exports.create = (req, res) => {
  const { title, priority } = req.body;

  if (!title || priority == null) {
    return res
      .status(418)
      .send({ type: "Error", message: "Title and priority are required" });
  }

  const newTodo = {
    id: crypto.randomUUID(),
    title,
    priority,
    createdAt: Date.now(),
    updatedAt: null,
    deleted: false,
  };

  todos.push(newTodo);
  res.send(newTodo);
};

exports.read = (req, res) => {
  const activeTodos = todos.filter((todo) => !todo.deleted);
  res.send(activeTodos);
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { title, priority } = req.body;

  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    return res.status(404).send({ type: "Error", message: "TODO not found" });
  }

  if (!title || priority == null) {
    return res
      .status(418)
      .send({ type: "Error", message: "Title and priority are required" });
  }

  todos[todoIndex].title = title;
  todos[todoIndex].priority = priority;
  todos[todoIndex].updatedAt = Date.now();

  res.send(todos[todoIndex]);
};

exports.delete = (req, res) => {
  const { id } = req.params;

  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    return res.status(404).send({ type: "Error", message: "TODO not found" });
  }

  todos[todoIndex].deleted = true;

  res.send({ message: "TODO deleted successfully" });
};
