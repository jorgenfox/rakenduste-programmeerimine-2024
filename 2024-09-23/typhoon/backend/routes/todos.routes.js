const express = require("express");
const router = express.Router();
const todosController = require("../controllers/todosController");
const {
  todoRouteMiddleware,
  todoGetRouteMiddleware,
} = require("../middlewares/todosMiddleware");

router.use(todoRouteMiddleware);
router.get("/", todoGetRouteMiddleware, todosController.read);
router.post("/", todosController.create);
router.put("/:id", todosController.update);
router.delete("/:id", todosController.delete);

module.exports = router;
