import express from "express";
import {
  createTask,
  getTasks,
  toggleTaskStatus,
  deleteTask
} from "../controllers/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.patch("/:id/status", authMiddleware, toggleTaskStatus);
router.delete("/:id", authMiddleware, deleteTask);

export default router;
