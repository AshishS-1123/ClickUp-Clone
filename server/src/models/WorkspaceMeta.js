const mongoose = require("mongoose");
const { LIST_VIEW } = require('../utils/viewTypes');

// This collection will store all meta data related to a workspace.
// For example- statuses, priorities, statuses, views.
const WorkspaceMetaSchema = mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'Provide user for which this meta is being created'],
  },
  workspaceId: {
    type: String,
    required: [true, 'Provide workspace for which the meta is being created.']
  },

  // Represents the list of possible statuses you can assign to a task.
  statuses: {
    type: [String],
    default: ['done', 'review', 'pending', 'todo', 'archive']
  },

  // Represents priorites of tasks.
  // For now, priorites and statuses will be static.
  priorities: {
    type: [{ level: String, color: String }],
    default: [
      { level: 'urgent', color: 'darkred' },
      { level: 'high', color: 'orange' },
      { level: 'medium', color: 'green' },
      { level: 'low', color: 'blue' },
    ],
  },

  views: {
    type: [String],
    default: [LIST_VIEW],
  }
})

const WorkspaceMeta = mongoose.model("WorkspaceMeta", WorkspaceMetaSchema);

module.exports = WorkspaceMeta;
