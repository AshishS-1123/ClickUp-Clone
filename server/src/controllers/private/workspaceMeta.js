const WorkspaceMeta = require('../../models/WorkspaceMeta');
const ErrorResponse = require('../../utils/errorResponse');

exports.getAllPriorities = async (req, res, next) => {
  const workspaceId = req.workspace._id;
  const userId = req.user._id;

  try {
    const wMeta = await WorkspaceMeta.findOne({
      workspaceId,
      userId,
    });

    res.json({
      success: true,
      priorities: wMeta.priorities
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 500));
  }
}

exports.addNewPriority = async (req, res, next) => {
  const workspaceId = req.workspace._id;
  const userId = req.user._id;

  const { level, color } = req.body;

  try {
    const wMeta = await WorkspaceMeta.findOne({
      workspaceId,
      userId,
    });

    if (!wMeta) {
      return next(new ErrorResponse("Could not find meta for this workspace. Internal Error", 500));
    }

    const existing = wMeta.priorities.filter(item => item.level === level && item.color === color);

    if (existing && existing.length > 0) {
      return next(new ErrorResponse(`Found priority ${existing[0]} with same data`, 404));
    }

    wMeta.priorities.push({ level, color });
    await wMeta.save();

    res.json({
      success: true,
      priorities: wMeta.priorities,
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 404))
  }
}

exports.getAllStatuses = async (req, res, next) => {
  const workspaceId = req.workspace._id;
  const userId = req.user._id;

  try {
    const wMeta = await WorkspaceMeta.findOne({
      workspaceId,
      userId,
    });

    res.json({
      success: true,
      statuses: wMeta.statuses
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 500));
  }
}

exports.addNewStatus = async (req, res, next) => {
  const workspaceId = req.workspace._id;
  const userId = req.user._id;

  const { status } = req.body;

  try {
    const wMeta = await WorkspaceMeta.findOne({
      workspaceId,
      userId,
    });

    if (!wMeta) {
      return next(new ErrorResponse("Could not find meta for this workspace. Internal Error", 500));
    }

    const existing = wMeta.statuses.filter(item => item == status);

    if (existing && existing.length > 0) {
      return next(new ErrorResponse(`Found status ${existing[0]} with same data`, 404));
    }

    wMeta.statuses.push(status);
    await wMeta.save();

    res.json({
      success: true,
      statuses: wMeta.statuses,
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 404))
  }
}

exports.getAllViews = async (req, res, next) => {
  const workspaceId = req.workspace._id;
  const userId = req.user._id;

  try {
    const wMeta = await WorkspaceMeta.findOne({
      workspaceId,
      userId,
    });

    res.json({
      success: true,
      priorities: wMeta.views
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 500));
  }
}

exports.addNewView = async (req, res, next) => {
  console.log("Add P");
  res.end("done")
}
