const User = require("../../models/User");
const ErrorResponse = require("../../utils/errorResponse");

exports.getAllWorkspaces = async (req, res, next) => {
  // Get which user made this request.
  // Here we are getting this value from the JWT
  // middleware as that is more secure.
  const userId = req.user;

  try {
    const user = await User.findById(userId);
    console.log(user.workspaces);
    res.status(201).json({
      success: true,
      workspaces: user.workspaces,
    })
  } catch (error) {
    return next(new ErrorResponse(error.message))
  }
}

exports.createNewWorkspace = async (req, res, next) => {
  res.end("Create New Workspace");
}

exports.getWorkspaceData = async (req, res, next) => {
  res.end("Get Workspace Data");
}

exports.deleteWorkspace = async (req, res, next) => {
  res.end("Delete Workspace");
}

exports.modifyWorkspace = async (req, res, next) => {
  res.end("Modify Workspace");
}
