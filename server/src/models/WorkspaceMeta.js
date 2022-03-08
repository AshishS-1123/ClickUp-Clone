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
    type: [{ status: String, color: String }],
    default: [
      { status: 'complete', color: '#2ea52c' },
      { status: 'review', color: '#ffa12f' },
      { status: 'ready', color: '#7b69ee' },
      { status: 'unassigned', color: '#f42c2c' },
      { status: 'archive', color: '#757380' },
    ]
  },

  // Represents priorites of tasks.
  // For now, priorites and statuses will be static.
  priorities: {
    type: [{ level: String, color: String }],
    default: [
      { level: 'urgent', color: '#f42c2c' },
      { level: 'high', color: '#ff5722' },
      { level: 'medium', color: '#1db954' },
      { level: 'low', color: '#5f81ff' },
    ],
  },

  views: {
    type: [String],
    default: [LIST_VIEW],
  }
})

const WorkspaceMeta = mongoose.model("WorkspaceMeta", WorkspaceMetaSchema);

module.exports = WorkspaceMeta;
