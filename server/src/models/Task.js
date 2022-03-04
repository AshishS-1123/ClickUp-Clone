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

  // Represents the stage at which the task is.
  // Possible values: issues found, ready, review
  status: {
    type: String,
    required: [true, "Provide status for task"],
  },

  // Represents level of urgency of task.
  // Possible values: urgent, high, normal, low
  priority: {
    type: String,
    required: [true, "Provide priority for task"],
  },

  // Date by which task must be completed.
  dueData: {
    type: Date,
    required: [true, "Provide due data for task"],
  }

})

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
