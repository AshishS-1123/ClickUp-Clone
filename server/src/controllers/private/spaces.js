const Space = require("../../models/Space");
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
      const currItem = await fetchSpaceData(workspace.spaces[i]);
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

exports.createNewSpace = (req, res, next) => {
  res.end("Create New Space");
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

