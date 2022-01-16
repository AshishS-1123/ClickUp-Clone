const express = require("express");
const router = express.Router();

const { getAllSpaces, createNewSpace, getSpaceData, deleteSpace, modifySpace } = require("../../controllers/private/spaces");

// Requests
// GET    /user/:userId/workspace/:workspaceId/space -> get all spaces
// POST   /user/:userId/workspace/:workspaceId/space -> create new space
// GET    /user/:userId/workspace/:workspaceId/space/:id -> get space by id
// PATCH    /user/:userId/workspace/:workspaceId/space/:id -> update space data
// DELETE /user/:userId/workspace/:workspaceId/space/:id -> delete space

router.route("/")
  .get(getAllSpaces)
  .post(createNewSpace);

router.route("/:id")
  .get(getSpaceData)
  .delete(deleteSpace)
  .patch(modifySpace);

module.exports = router;
