const mongoose = require("mongoose");
const { LIST_VIEW } = require("../utils/viewTypes");

const SpaceSchema = mongoose.Schema({
  // Name of this workspace.
  name: {
    type: String,
    required: [true, "Spaces must have a name"],
  },
  // Id of the workspace that this space is child of.
  workspaceId: {
    type: String,
    required: [true, "Provide workspace when creating spaces"],
  },
  // All spaces must keep the id of the user who created it.
  // Used for validating requests.
  userId: {
    type: String,
    required: [true, "Provide user when creatiing spaces"],
  },
  // Id's of all children under this space.
  children: {
    type: [{ childType: String, id: String }],
    default: []
  },

  // Configuration Details
  // Color. Used in UI to organise things.
  spaceColor: {
    type: String,
    required: [true, "Spaces must have a color"],
  },
  // Icon used for representing the space.
  spaceAvatar: {
    type: String,
    required: [true, "Spaces must have an avatar."],
  },
  // Statuses that represent a task is active.
  // Each status will have a label and a color.
  activeStatuses: {
    type: [{ label: String, color: String }],
    default: [{ label: "TODO", color: "#aeaeae" }],
  },
  // Statuses that represent a task has been completed.
  doneStatuses: {
    type: [{ label: String, color: String }],
    default: [],
  },
  // Statuses that represent tasks completed and hidden from view by default.
  closedStatuese: {
    type: [{ label: String, color: String }],
    default: [{ label: "DONE", color: "#00ee00" }],
  },
  // Array containing the views that have been enabled for this space.
  enabledViews: {
    type: [String],
    default: [LIST_VIEW],
  },
})

const Space = mongoose.model("Space", SpaceSchema);

module.exports = Space;
