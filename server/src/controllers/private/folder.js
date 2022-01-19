const { validateFolder } = require("../../middleware/paramValidator");
const Folder = require("../../models/Folder");
const ErrorResponse = require("../../utils/errorResponse");

exports.getAllFolders = async (req, res, next) => {

  try {
    const folderData = [];
    const userId = req.user._id;

    for (let i = 0; i < req.parent.children.length; ++i) {
      const childItemId = req.parent.children[i].id;
      const childItemType = req.parent.children[i].childType;

      if (childItemType != "FOLDER")
        continue;

      const folder = await validateFolder(childItemId, userId);
      folderData.push({ name: folder.name, id: childItemId });
    }

    res.status(200).json({
      success: true,
      folders: folderData,
    });

  } catch (error) {
    console.log(error.message);
    return next(new ErrorResponse(error.message, 500));
  }

}

exports.createNewFolder = async (req, res, next) => {
  const { folderName } = req.body;
  const parent = req.parent;
  const parentType = req.parentType;
  let folder;

  if (!folderName || folderName === "") {
    return next(new ErrorResponse("Please provide name for folder", 400));
  }

  try {
    folder = await Folder.create({
      name: folderName,
      userId: req.user._id,
      parent: { parentId: parent._id, parentType: parentType },
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 500));
  }

  try {
    parent.children.push({ childType: "FOLDER", id: String(folder._id) });
    await parent.save();

    res.status(201).json({
      success: true,
      folder: folder,
    });
  } catch (error) {
    try {
      await Folder.findByIdAndDelete(folder._id);
    } catch (error) {
      return next(new ErrorResponse("Folder created, but unassociated. Failed to delete Folder", 500));
    }

    console.log(error.message);
    return next(new ErrorResponse("Failed to associate new folder with parent. Deleted folder", 500));
  }
}

exports.getFolderData = async (req, res, next) => {
  const folderId = req.params.folderId;
  const userId = req.user._id;

  try {
    const folder = await validateFolder(folderId, userId);

    if (!folder) {
      return next(new ErrorResponse("Folder not found", 404));
    }

    res.status(200).json({
      success: true,
      folder: folder,
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 404));
  }
}


exports.deleteFolder = async (req, res, next) => {
  res.end("Delete Folder");
}

exports.modifyFolder = async (req, res, next) => {
  res.end("Modify Folder");
}
