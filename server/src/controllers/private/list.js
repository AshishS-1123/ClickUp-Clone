const { validateList } = require("../../middleware/paramValidator");
const List = require("../../models/List");
const ErrorResponse = require("../../utils/errorResponse");

exports.getAllLists = async (req, res, next) => {

  try {
    const listData = [];
    const userId = req.user._id;

    for (let i = 0; i < req.parent.children.length; ++i) {
      const childItemId = req.parent.children[i].id;
      const childItemType = req.parent.children[i].childType;

      if (childItemType != "LIST")
        continue;

      const list = await validateList(childItemId, userId);
      listData.push({ name: list.name, id: childItemId });
    }

    res.status(200).json({
      success: true,
      lists: listData,
    });

  } catch (error) {
    console.log(error.message);
    return next(new ErrorResponse(error.message, 500));
  }

}

exports.createNewList = async (req, res, next) => {
  const { listName } = req.body;
  const parent = req.parent;
  const parentType = req.parentType;
  let list;

  if (!listName || listName === "") {
    return next(new ErrorResponse("Please provide name for list", 400));
  }

  try {
    list = await List.create({
      name: listName,
      userId: req.user._id,
      parent: { parentId: parent._id, parentType: parentType },
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 500));
  }

  try {
    parent.children.push({ childType: "LIST", id: String(list._id) });
    await parent.save();

    res.status(201).json({
      success: true,
      list: list,
    });
  } catch (error) {
    try {
      await List.findByIdAndDelete(list._id);
    } catch (error) {
      return next(new ErrorResponse("List created, but unassociated. Failed to delete list", 500));
    }

    console.log(error.message);
    return next(new ErrorResponse("Failed to associate new list with parent. Deleted list", 500));
  }
}

exports.getListData = async (req, res, next) => {
  const listId = req.params.listId;
  const userId = req.user._id;

  try {
    const list = await validateList(listId, userId);

    if (!list) {
      return next(new ErrorResponse("List not found", 404));
    }

    res.status(200).json({
      success: true,
      list: list,
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 404));
  }
}


exports.deleteList = async (req, res, next) => {
  res.end("Delete List");
}

exports.modifyList = async (req, res, next) => {
  res.end("Modify List");
}
