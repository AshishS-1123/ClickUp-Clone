const express = require("express");
const router = express.Router();

const { getAllFolders, createNewFolder, getFolderData, deleteFolder, modifyFolder } = require("../../controllers/private/folder");
const { paramValidator } = require("../../middleware/paramValidator");

router.param("folderId", paramValidator);

router.route("/")
  .get(getAllFolders)
  .post(createNewFolder);

router.route("/:folderId")
  .get(getFolderData)
  .delete(deleteFolder)
  .patch(modifyFolder);

module.exports = router;
