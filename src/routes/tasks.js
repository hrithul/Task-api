import express from "express";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/taskController.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.use(auth);

router.route("/")
  .post(createTask)
  .get(getTasks);

router.route("/:id")
  .put(updateTask)
  .delete(deleteTask);

export default router;
