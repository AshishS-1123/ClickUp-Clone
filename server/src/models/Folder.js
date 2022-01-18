const mongoose = require("mongoose");

const FolderSchema = mongoose.Schema({
  // Name of this Folder.
  name: {
    type: String,
    required: [true, "Folders must have a name"],
  },
  userId: {
    type: String,
    required: [true, "Provide user when creating folders"]
  },
  // Parent of this folder and whether its another folder or space.
  parent: {
    type: { parentId: String, parentType: String },
    required: [true, "Folders must have a parent."]
  },
  // Id's of all children under this folder
  children: {
    type: [{ type: String, id: String }],
    default: []
  },
})

const Folder = mongoose.model("Folder", FolderSchema);

module.exports = Folder;
