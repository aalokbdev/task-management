const { errorHandler } = require("../middlewares/errorHandler");
const Task = require("../models/Task");

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().populate("assignedTo", "name");
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Task deleted" });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};


exports.getSingleUser = async (req, res, next) => {
  try {
    const user = await Task.find({ assignedTo: req.user.id });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};