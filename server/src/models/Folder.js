const mongoose = require("mongoose");

const FolderSchema = mongoose.Schema({
  // Name of this Folder.
  name: {
    type: String,
    required: [true, "Folders must have a name"],
  },
  // Parent of this folder and whether its another folder or space.
  parent: {
    type: { parentId: String, parentType: String },
    required: [true, "Folders must have a parent."]
  },
  // Id's of all children under this folder
  children: {
    type: [String],
    default: []
  },
})

const Folder = mongoose.model("Folder", FolderSchema);

module.exports = Folder;
