const express = require("express");
const router = express.Router();

const { getAllTasks, createNewTask, getTaskData, deleteTask, modifyTask } = require("../../controllers/private/task");
const { paramValidator } = require("../../middleware/paramValidator");

router.param("taskId", paramValidator);

router.route("/")
  .get(paramValidator, getAllTasks)
  .post(paramValidator, createNewTask);

router.route("/:taskId")
  .get(paramValidator, getTaskData)
  .delete(paramValidator, deleteTask)
  .patch(paramValidator, modifyTask);

module.exports = router;
