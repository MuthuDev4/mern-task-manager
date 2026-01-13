import Task from "../models/Task.js";

/* Create Task */
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = new Task({
      title,
      description,
      status: "Pending",
      userId: req.userId
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to create task" });
  }
};

/* Get Tasks (user specific) */
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

/* Toggle Task Status */
export const toggleTaskStatus = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.status =
      task.status === "Pending" ? "Completed" : "Pending";

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to update status" });
  }
};

/* Delete Task */
export const deleteTask = async (req, res) => {
  try {
    await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
};
