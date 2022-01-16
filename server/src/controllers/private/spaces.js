const Space = require("../../models/Space");
const Workspace = require("../../models/Workspace");
const ErrorResponse = require("../../utils/errorResponse");

const fetchSpaceData = async (spaceId) => {
  const spaceItem = {
    name: "",
    id: spaceId,
  };

  const space = await Space.findById(spaceId);
  spaceItem.name = space.name;

  return spaceItem
}

exports.getAllSpaces = async (req, res, next) => {

  try {
    const spaceData = [];

    for (let i = 0; i < req.workspace.spaces.length; ++i) {
      const currItem = await fetchSpaceData(req.workspace.spaces[i]);
      spaceData.push(currItem);
    }

    res.status(200).json({
      success: true,
      spaces: spaceData,
    });
    ;
  } catch (error) {
    console.log(error.message);
    return next(new ErrorResponse(error.message, 500));
  }
}

exports.createNewSpace = async (req, res, next) => {
  const { spaceName, spaceColor, spaceAvatar } = req.body;

  const workspaceId = req.workspace._id;
  let space;

  console.log(workspaceId, spaceName, spaceColor, spaceAvatar);

  if (!spaceName || spaceName === "") {
    return next(new ErrorResponse("Please provide name for space", 400));
  }

  // Create the space.
  try {
    space = await Space.create({
      name: spaceName,
      workspaceId: workspaceId,
      spaceColor: spaceColor,
      spaceAvatar: spaceAvatar,
    });
  } catch (error) {
    let message = "";

    if (error.message.search("E11000") !== -1) {
      message = "Space with this name already exists";
    } else {
      message = "Server Error";
    }

    return next(new ErrorResponse(message, 500));
  }
  console.log("created space");

  // Associate this space with the correct workspace.
  try {
    // Find the workspace under which to make the space
    const workspace = await Workspace.findById(workspaceId);

    // Add the new workspace's id to this user.
    workspace.spaces.push(space._id);
    // Write to database.
    await workspace.save();

    res.status(201).json({
      success: true,
      space: space,
    });
  } catch (error) {
    try {
      await Space.findByIdAndDelete(space._id);
    } catch (error) {
      return next(new ErrorResponse("Space created, but unassociated. Failed to delete Space", 500));
    }

    console.log(error.message);
    return next(new ErrorResponse("Failed to associate new space with workspace. Deleted space", 500));
  }
}

exports.getSpaceData = (req, res, next) => {
  res.end("Get Space Data");
}

exports.deleteSpace = (req, res, next) => {
  res.end("Delete Space");
}

exports.modifySpace = (req, res, next) => {
  res.end("Modify Space");
}

