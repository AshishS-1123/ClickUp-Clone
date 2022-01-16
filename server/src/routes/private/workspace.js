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

router.param("workspaceId", paramValidator);

router.route("/")
  .get(getAllWorkspaces)
  .post(createNewWorkspace);

router.route("/:workspaceId")
  .get(getWorkspaceData)
  .delete(deleteWorkspace)
  .patch(modifyWorkspace);

module.exports = router;
