const mongoose = require("mongoose");

const ListSchema = mongoose.Schema({
  // Name of this List.
  name: {
    type: String,
    required: [true, "List must have a name"],
  },
  userId: {
    type: String,
    required: [true, "Provide User when creating lists"],
  },
  // Parent of this list and whether its a folder or space.
  parent: {
    type: { parentId: String, parentType: String },
    required: [true, "Lists must have parents"],
  },
  // Id's of all tasks under this list.
  children: {
    type: [String],
    default: []
  },
})

const List = mongoose.model("List", ListSchema);

module.exports = List;
