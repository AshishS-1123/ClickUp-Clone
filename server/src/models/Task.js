const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  // Name of this Task.
  name: {
    type: String,
    required: [true, "Task must have a name"],
  },
  userId: {
    type: String,
    required: [true, "Provide User when creating tasks"],
  },
  // Parent of this task and whether its a folder or space.
  parent: {
    type: { parentId: String, parentType: String },
    required: [true, "Tasks must have parents"],
  },
})

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
