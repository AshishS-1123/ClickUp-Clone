const express = require("express");
const {
  getAllWorkspaces,
  createNewWorkspace,
  getWorkspaceData,
  deleteWorkspace,
  modifyWorkspace
} = require("../../controllers/private/workspace");
const { paramValidator } = require("../../middleware/paramValidator");

const router = express.Router();

router.route("/")
  .get(paramValidator, getAllWorkspaces)
  .post(paramValidator, createNewWorkspace);

router.route("/:workspaceId")
  .get(paramValidator, getWorkspaceData)
  .delete(paramValidator, deleteWorkspace)
  .patch(paramValidator, modifyWorkspace);

module.exports = router;
