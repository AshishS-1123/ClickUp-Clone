// This middleware is responsible for getting all the params from the request.
// Then it will check if the params are all valid.
// For example, if the request has a userId and a workspaceId, we need to check if the workspace belongs to the correct user.

const Workspace = require("../models/Workspace");
const ErrorResponse = require("../utils/errorResponse");

exports.paramValidator = async (req, res, next) => {
  // Get all the possible params from the request.
  const { userId, workspaceId, spaceId } = req.params;

  // Check if the JWT and the the request refer to the same user.
  if (userId && req.user._id != userId) {
    return next(new ErrorResponse("Not authorised. Token and request do not match", 403));
  }

  // Check that the workspaceId in the request belongs to the current user.
  if (!req.user.workspaces.includes(workspaceId)) {
    console.log(workspaceId);
    console.log(req.user.workspaces);
    return next(new ErrorResponse("User not authorised to access this worksace", 403));
  }

  // At this point, the user is allowed to access the workspace.
  // Fetch the workspace in order to verify the space.
  const workspace = await Workspace.findById(workspaceId);

  // Check if the given space belongs to the given workspace.
  if (spaceId && !workspace.spaces.includes(spaceId)) {
    return next(new ErrorResponse("Requested space does not belong this workspaece", 400));
  }


  next();
}
