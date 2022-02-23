const Task = require("../../models/Task");
const ErrorResponse = require("../../utils/errorResponse.js");

exports.getAllTasks = async (req, res, next) => {
  try {

    const taskData = []
    const userId = req.user._id;

    for (let i = 0; i < req.parent.children.length; ++i) {
      const childItemId = req.parent.children[i].id;
      const childItemType = req.parent.children[i].childType;

      if (childItemType != "TASK")
        continue;

      const task = await validateTask(childItemId, userId);
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
  res.end("Create New Task");
}

exports.getTaskData = async (req, res, next) => {
  res.end("Get Task Data");
}

exports.deleteTask = async (req, res, next) => {
  res.end("Delete Task");
}

exports.modifyTask = async (req, res, next) => {
  res.end("Modify Task");
}
