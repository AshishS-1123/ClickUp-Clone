const { validateWorkspace } = require("../../middleware/paramValidator");
const User = require("../../models/User");
const Workspace = require("../../models/Workspace");
const WorkspaceMeta = require("../../models/WorkspaceMeta");
const ErrorResponse = require("../../utils/errorResponse");
const { fetchWorkspaceRecur } = require("../../utils/recursiveWorkspaceFetcher");

exports.getAllWorkspaces = async (req, res, next) => {
  // Get which user made this request.
  // Here we are getting this value from the JWT
  // middleware as that is more secure.
  const user = req.user;

  try {
    const workspaceData = [];
    const userId = user._id;

    for (let i = 0; i < user.workspaces.length; ++i) {
      const workspaceId = req.user.workspaces[i];
      const workspace = await validateWorkspace(workspaceId, userId);
      // const currItem = await fetchWorkspaceData(user.workspaces[i]);
      workspaceData.push({ name: workspace.name, id: workspaceId, spaces: workspace.spaces });
    }

    res.status(200).json({
      success: true,
      workspaces: workspaceData,
    });
    ;
  } catch (error) {
    console.log("Get All Workspaces", error.message);
    return next(new ErrorResponse(error.message, 500));
  }
}

exports.createNewWorkspace = async (req, res, next) => {
  const { workspaceName } = req.body;

  const userId = req.user._id;
  let workspace;

  if (!workspaceName || workspaceName === "") {
    return next(new ErrorResponse("Please provide name for workspace", 400));
  }

  // Create the workspace.
  try {
    workspace = await Workspace.create({
      name: workspaceName,
      userId: userId,
    });

    await WorkspaceMeta.create({ userId: req.user._id, workspaceId: workspace._id });
  } catch (error) {
    let message = "";

    if (error.message.search("E11000") !== -1) {
      message = "Workspace with this name already exists";
    } else {
      message = "Server Error";
    }

    return next(new ErrorResponse(message, 500));
  }

  // Associate this workspace with the correct user.
  try {
    // Find the user who made this request.
    const user = await User.findById(userId);

    // Add the new workspace's id to this user.
    user.workspaces.push(workspace._id);
    // Write to database.
    await user.save();

    res.status(201).json({
      success: true,
      workspace: {
        name: workspace.name,
        id: workspace._id,
      },
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

    console.log("Create New Workspace", error.message);
    return next(new ErrorResponse("Failed to associate new workspace with user. Deleted workspace", 500));
  }
}

exports.getWorkspaceData = async (req, res, next) => {
  const workspaceId = req.params.workspaceId;
  const userId = req.user._id;

  try {
    const workspace = await validateWorkspace(workspaceId, userId);
    const {spaces, folders, lists, tasks} = await fetchWorkspaceRecur(workspace.spaces, userId);

    if (!workspace) {
      return next(new ErrorResponse("Workspace not found", 404));
    }

    res.status(200).json({
      workspace: workspace,
      spaces,
      folders,
      lists,
      tasks
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 404));
  }
}

exports.deleteWorkspace = async (req, res, next) => {
  res.end("Delete Workspace :: TODO");
  // const workspaceId = req.workspace._id;
  // const user = req.user;

  // // First disassociate the workspace from the user.
  // try {
  //   const idx = user.workspaces.indexOf(workspaceId);

  //   if (idx > -1) {
  //     user.workspaces.splice(idx);
  //     await user.save();
  //   } else {
  //     return next(new ErrorResponse("Wrkspace Not Found", 404));
  //   }

  // } catch (error) {
  //   return next(new ErrorResponse(error.message, 500));
  // }

  // // TODO: Delete All Spaces recursively here.

  // try {
  //   await Workspace.findByIdAndDelete(workspaceId);

  //   res.status(200).json({
  //     success: true,
  //     workspaceId: workspaceId,
  //   });
  // } catch (error) {
  //   console.log("Delete Workspace", error.message);
  //   return next(new ErrorResponse(error.message, 500));
  // }
}

exports.modifyWorkspace = async (req, res, next) => {
  res.end("Modify Workspace");
}
