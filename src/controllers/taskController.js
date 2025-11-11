import Task from "../models/Task.js";

export const createTask = async (req, res, next) => {
  try {
    const task = await Task.create({ ...req.body, user: req.user._id });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

export const getTasks = async (req, res, next) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
};

export const updateTask = async (req, res, next) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  );
  res.json(task);
};

export const deleteTask = async (req, res, next) => {
  await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  res.json({ msg: "Task deleted" });
};
