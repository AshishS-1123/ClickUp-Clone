const { validateSpace } = require("../../middleware/paramValidator");
const Space = require("../../models/Space");
const Workspace = require("../../models/Workspace");
const ErrorResponse = require("../../utils/errorResponse");

// const fetchSpaceData = async (spaceId) => {
//   const spaceItem = {
//     name: "",
//     id: spaceId,
//   };

//   const space = await Space.findById(spaceId);
//   spaceItem.name = space.name;

//   return spaceItem
// }

exports.getAllSpaces = async (req, res, next) => {

  try {
    const spaceData = [];
    const userId = req.user._id;

    for (let i = 0; i < req.workspace.spaces.length; ++i) {
      const spaceId = req.workspace.spaces[i];
      const space = await validateSpace(spaceId, userId);
      // const currItem = await fetchSpaceData(req.workspace.spaces[i]);
      spaceData.push({ name: space.name, id: spaceId });
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
  console.log("In create Space::::::");
  console.log(req.body);
  const { spaceName, spaceColor, spaceAvatar } = req.body;

  const workspaceId = req.workspace._id;
  let space;

  if (!spaceName || spaceName === "") {
    return next(new ErrorResponse("Please provide name for space", 400));
  }

  // Create the space.
  try {
    space = await Space.create({
      name: spaceName,
      userId: req.user._id,
      workspaceId: workspaceId,
      spaceColor: spaceColor,
      spaceAvatar: spaceAvatar,
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 500));
  }

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

exports.getSpaceData = async (req, res, next) => {
  const spaceId = req.params.spaceId;
  const userId = req.user._id;

  try {
    const space = await validateSpace(spaceId, userId);

    if (!space) {
      return next(new ErrorResponse("Space not found", 404));
    }

    res.status(200).json({
      success: true,
      space: space,
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 404));
  }

}

exports.deleteSpace = async (req, res, next) => {
  res.end("Delete Space :: TODO");
  // const spaceId = req.space._id;
  // const workspace = req.workspace;

  // // First disassociate the space from the workspace.
  // try {
  //   const idx = workspace.spaces.indexOf(spaceId);

  //   if (idx > -1) {
  //     workspace.spaces.splice(idx);
  //     await workspace.save();
  //   } else {
  //     return next(new ErrorResponse("Space Not Found", 404));
  //   }

  // } catch (error) {
  //   return next(new ErrorResponse(error.message, 500));
  // }

  // // TODO: Delete All Children recursively here.

  // try {
  //   await Workspace.findByIdAndDelete(spaceId);

  //   res.status(200).json({
  //     success: true,
  //     spaceId: spaceId,
  //   });
  // } catch (error) {
  //   console.log("Delete Workspace", error.message);
  //   return next(new ErrorResponse(error.message, 500));
  // }
}

exports.modifySpace = (req, res, next) => {
  res.end("Modify Space");
}

