const mongoose = require("mongoose");

const WorkspaceSchema = new mongoose.Schema({
  // Name of the workspace.
  name: {
    type: String,
    required: [true, "Workspace must have a name"],
    trim: true,
    index: {
      unique: true,
    },
  },
  // Id of user the workspace belongs to.
  userId: {
    type: String,
    required: [true, "Some error occured. User not found for creating workspace."]
  },
  // Array of id's of all spaces contained in this workspace.
  spaces: {
    type: [String],
    default: [],
  }
});

const Workspace = mongoose.model("Workspace", WorkspaceSchema);

module.exports = Workspace;
