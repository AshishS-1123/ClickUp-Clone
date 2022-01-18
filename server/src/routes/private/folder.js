const express = require("express");
const router = express.Router();

const { getAllFolders, createNewFolder, getFolderData, deleteFolder, modifyFolder } = require("../../controllers/private/folder");
const { paramValidator } = require("../../middleware/paramValidator");

router.param("folderId", paramValidator);

router.route("/")
  .get(paramValidator, getAllFolders)
  .post(paramValidator, createNewFolder);

router.route("/:folderId")
  .get(paramValidator, getFolderData)
  .delete(paramValidator, deleteFolder)
  .patch(paramValidator, modifyFolder);

module.exports = router;
