// This middleware is responsible for getting all the params from the request.
// Then it will check if the params are all valid.
// For example, if the request has a userId and a workspaceId, we need to check if the workspace belongs to the correct user.

const Workspace = require("../models/Workspace");
const Space = require("../models/Space");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const Folder = require("../models/Folder");
const List = require("../models/List");

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
  const workspace = await Workspace.findById(workspaceId);

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

const validateFolder = async (folderId, userId) => {
  const folder = await Folder.findById(folderId);

  if (!folder) {
    throw new ErrorResponse("Folder not found", 404);
  }

  if (folder.userId == userId) {
    return folder;
  }

  throw new ErrorResponse("User not authorised to access this folder", 403);
}

const validateList = async (listId, userId) => {
  const list = await List.findById(listId);

  if (!list) {
    throw new ErrorResponse("List not found", 404);
  }

  if (list.userId == userId) {
    return list;
  }

  throw new ErrorResponse("User not authorised to access this list", 403);
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

      // A folder can have another folder or space as child.
      // Similarly, a list can have a space or folder as child.
      // When querying, we don't know what the user might give.
      // Therefore if a folder or list is encountered in the query,
      // treat it as if its going to be the parent.
      req.parent = space;
      req.parentType = "SPACE";
    }

    if (queryParams.hasOwnProperty("folder")) {
      // Check if this user is allowed to access this folder
      const folder = await validateFolder(queryParams.folder, userId);

      req.folder = folder;

      // A folder can have another folder or space as child.
      // Similarly, a list can have a space or folder as child.
      // When querying, we don't know what the user might give.
      // Therefore if a folder or list is encountered in the query,
      // treat it as if its going to be the parent.
      req.parent = folder;
      req.parentType = "FOLDER";
    }

    if (queryParams.hasOwnProperty("list")) {
      // Check if this user is allowed to access this list.
      const list = await validateList(queryParams.list, userId);

      req.list = list;
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
  validateFolder,
  validateList,
};
