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

// Routes for Workspace.
// GET /workspace -> Get all workspaces of user. Just names
// POST /workspace -> Create new workspace using name
// DELETE /workspace/:id -> Delete workspace
// GET /workspace/:id -> Get all data of workspace (name, recusively)
// PATCH /workspace/:id -> Change property of workspace.

// router.all(paramValidator);

router.route("/")
  .get(paramValidator, getAllWorkspaces)
  .post(paramValidator, createNewWorkspace);

router.route("/:workspaceId")
  .get(paramValidator, getWorkspaceData)
  .delete(paramValidator, deleteWorkspace)
  .patch(paramValidator, modifyWorkspace);

module.exports = router;
