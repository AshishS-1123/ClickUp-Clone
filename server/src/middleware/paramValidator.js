// This middleware is responsible for getting all the params from the request.
// Then it will check if the params are all valid.
// For example, if the request has a userId and a workspaceId, we need to check if the workspace belongs to the correct user.

const Workspace = require("../models/Workspace");
const Space = require("../models/Space");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

const validateUser = async (userId, tokenUserId) => {

  if (userId != tokenUserId) {
    throw new ErrorResponse("Token and Request do not match", 403);
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ErrorResponse("User not found", 404);
  }
}

const validateWorkspace = async (workspaceId, userId) => {
  console.log("Workspace id", workspaceId);
  const workspace = await Workspace.findById(workspaceId);
  console.log("Workspace is", workspace);

  if (!workspace) {
    throw new ErrorResponse("Workspace not found", 404);
  }

  if (workspace.userId == userId) {
    return workspace;
  }

  throw new ErrorResponse("User not authorised to access this workspace", 403);
}

const validateSpace = async (spaceId, userId) => {
  const space = await Space.findById(spaceId);

  if (!space) {
    throw new ErrorResponse("Space not found", 404);
  }

  if (space.userId == userId) {
    return space;
  }

  throw new ErrorResponse("User not authorised to access this space", 403);
}

const paramValidator = async function (req, res, next) {
  // Get the query parameters
  const queryParams = req.query;
  console.log("Params", queryParams);

  // The userId will always be present.
  const userId = queryParams.user;

  try {

    await validateUser(userId, req.user._id);

    if (queryParams.hasOwnProperty("workspace")) {
      // Check if this user is allowed to access this workspace.
      const workspace = await validateWorkspace(queryParams.workspace, userId);
      req.workspace = workspace;
    }

    if (queryParams.hasOwnProperty("space")) {
      // Check if this user is allowed to access this space
      const space = await validateSpace(queryParams.space, userId);

      req.space = space;
    }
  } catch (error) {
    return next(new ErrorResponse(error.message, 500));
  }

  next();
}

module.exports = {
  paramValidator,
  validateUser,
  validateWorkspace,
  validateSpace,
};
