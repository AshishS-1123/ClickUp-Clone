const User = require("../../models/User");
const Workspace = require("../../models/Workspace");
const ErrorResponse = require("../../utils/errorResponse");

exports.getAllWorkspaces = async (req, res, next) => {
  // Get which user made this request.
  // Here we are getting this value from the JWT
  // middleware as that is more secure.
  const user = req.user;

  res.status(201).json({
    success: true,
    workspaces: user.workspaces,
  });
}

exports.createNewWorkspace = async (req, res, next) => {
  const { workspaceName } = req.body;
  const userId = req.user._id;
  let workspace;
  console.log("User id ", userId);

  if (!workspaceName || workspaceName === "") {
    return next(new ErrorResponse("Please provide name for workspace", 400));
  }

  // Create the workspace.
  try {
    workspace = await Workspace.create({
      name: workspaceName,
      userId: userId,
    });
  } catch (error) {
    console.log(error.message);
    return next(new ErrorResponse("Failed to create workspace", 500));
  }

  // Associate this workspace with the correct user.
  try {
    // Find the user who made this request.
    const user = await User.findById(userId);

    // Add the new workspace's id to this user.
    user.workspaces.push(workspace._id);
    // Write to database.
    await user.save();

    res.status(200).json({
      success: true,
      workspace: workspace,
    });
  } catch (error) {
    // In case the workspace was created but
    // could not be associated with correct user,
    // Delete the new workspace.
    try {
      await Workspace.findByIdAndDelete(workspace._id);
    } catch (error) {
      return next(new ErrorResponse("Workspace created, but unassociated. Failed to delete workspace", 500));
    }

    console.log(error.message);
    return next(new ErrorResponse("Failed to associate new workspace with user. Deleted workspace", 500));
  }
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
