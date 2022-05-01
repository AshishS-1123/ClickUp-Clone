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

    const sanitizedTask = {
      _id: task._id,
      name: task.name,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
      parent: { parentId: task.parent._id, parentName: req.parent.name },
    }

    res.status(201).json({
      success: true,
      task: sanitizedTask,
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

    const sanitizedTask = {
      _id: task._id,
      name: task.name,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
      parent: { parentId: req.parent._id, parentName: req.parent.name },
    }

    res.status(200).json({
      success: true,
      task: sanitizedTask,
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 404));
  }
}

exports.deleteTask = async (req, res, next) => {
  res.end("Delete Task");
}

exports.modifyTask = async (req, res, next) => {
  const NON_MODIFIABLE_KEYS = ['userId', 'parent', '_id'];

  const newData = req.body;
  let isAllowed = true;

  Object.keys(newData).forEach(item => {
    if (NON_MODIFIABLE_KEYS.includes(item)) {
      isAllowed = false;
      return next(new ErrorResponse(`Modifying ${item} of task is not allowed`, 403));
    }
  })

  try {
    if (isAllowed) {
      Task.findByIdAndUpdate(req.params.taskId, newData, { new: true }, (error, doc) => {
        if (error) {
          return next(new ErrorResponse(error, 500));
        }

        res.status(200).json({ success: true, task: doc });
      })
    }
  } catch (error) {
    return next(new ErrorResponse(error.message, 500));
  }
}
