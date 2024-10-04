const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const {
  generateTokenValidation,
  verifyTokenValidation,
} = require("./middlewares/validator");
const { validationResult } = require("express-validator");
const port = 8080;

app.use(cors());
app.use(morgan("dev"));

const catsRoutes = require("./routes/cats.routes");
const exampleRoutes = require("./routes/example.routes");
const todosRoutes = require("./routes/todos.routes");
const SECRET_KEY = "mingi_secret_key";

app.use(express.json());

app.use("/cats", catsRoutes);
app.use("/examples", exampleRoutes);
app.use("/todos", todosRoutes);

// TOKEN
app.get("/token", generateTokenValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const name = req.body.name;
  const token = jwt.sign({ name }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});

app.post("/verify-token", verifyTokenValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const token = req.body.token;

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.json({ message: "Token is valid", decoded });
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
