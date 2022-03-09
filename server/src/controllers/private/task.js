const Task = require("../../models/Task");
const ErrorResponse = require("../../utils/errorResponse.js");
const { validateTask } = require("../../middleware/paramValidator");

exports.getAllTasks = async (req, res, next) => {
  try {

    const taskData = []
    const userId = req.user._id;

    for (let i = 0; i < req.parent.children.length; ++i) {
      const childItemId = req.parent.children[i].id;
      const childItemType = req.parent.children[i].childType;

      if (childItemType !== "TASK")
        continue;

      const task = await validateTask(String(childItemId), String(userId));
      taskData.push({ name: task.name, id: childItemId });
    }

    res.status(200).json({
      success: true,
      tasks: taskData,
    });

  } catch (error) {
    console.log(error.message);
    return next(new ErrorResponse(error.message, 500));
  }
}

exports.createNewTask = async (req, res, next) => {
  const {
    taskName,
    tag,
    priority,
    dueDate,
    status
  } = req.body;

  const parent = req.parent;
  const parentType = req.parentType;

  let task;

  if (!taskName || taskName == "") {
    return next(new ErrorResponse("Please provide name for task", 400));
  }

  try {
    task = await Task.create({
      name: taskName,
      userId: req.user._id,
      parent: { parent, parentType },
      tag,
      priority,
      dueDate,
      status,
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 500));
  }

  try {
    parent.children.push({ childType: "TASK", id: String(task._id) });
    await parent.save();

    res.status(201).json({
      success: true,
      task: task,
    })
  } catch (error) {
    try {
      await Task.findByIdAndDelete(task._id);
    } catch (error) {
      return next(new ErrorResponse("Task created but unassociated. Failed to delete task.", 500));
    }

    console.log(error.message);
    return next(new ErrorResponse("Failed to associate task with parent. Deleted successfully", 500));
  }
}

exports.getTaskData = async (req, res, next) => {
  const taskId = req.params.taskId;
  const userId = req.user._id;

  try {
    const task = await validateTask(taskId, userId);

    if (!task) {
      return next(new ErrorResponse("Task not found", 404));
    }

    res.status(200).json({
      success: true,
      task: task,
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 404));
  }
}

exports.deleteTask = async (req, res, next) => {
  res.end("Delete Task");
}

exports.modifyTask = async (req, res, next) => {
  res.end("Modify Task");
}
