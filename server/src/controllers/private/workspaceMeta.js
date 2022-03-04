const WorkspaceMeta = require('../../models/WorkspaceMeta');
const ErrorResponse = require('../../utils/errorResponse');

exports.getAllPriorities = async (req, res, next) => {
  console.log("In get all");
  const workspaceId = req.workspace._id;
  const userId = req.user._id;

  try {
    const wMeta = await WorkspaceMeta.findOne({
      workspaceId,
      userId,
    });

    console.log("Return", wMeta.priorities);

    res.json({
      success: true,
      priorities: wMeta.priorities
    });
  } catch (error) {
    console.log(error.message);
    return next(new ErrorResponse(error.message, 500));
  }
}

exports.addNewPriority = async (req, res, next) => {
  const workspaceId = req.workspace._id;
  const userId = req.user._id;

  const { level, color } = req.body;

  if (!level || !color) {
    return next(new ErrorResponse("Provide level and color for priority", 400));
  }

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

  if (!status) {
    return next(new ErrorResponse("Provide name for status", 400));
  }

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
      views: wMeta.views
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 500));
  }
}

exports.addNewView = async (req, res, next) => {
  const workspaceId = req.workspace._id;
  const userId = req.user._id;

  const { view } = req.body;

  if (!view) {
    return next(new ErrorResponse("Provide name for view when creating", 400));
  }

  try {
    const wMeta = await WorkspaceMeta.findOne({
      workspaceId,
      userId,
    });

    if (!wMeta) {
      return next(new ErrorResponse("Could not find meta for this workspace. Internal Error", 500));
    }

    const existing = wMeta.views.filter(item => item == view);

    if (existing && existing.length > 0) {
      return next(new ErrorResponse(`Found view ${existing[0]} with same data`, 404));
    }

    wMeta.views.push(view);
    await wMeta.save();

    res.json({
      success: true,
      views: wMeta.views,
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 404))
  }
}
