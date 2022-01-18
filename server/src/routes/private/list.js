const express = require("express");
const router = express.Router();

const { getAllLists, createNewList, getListData, deleteList, modifyList } = require("../../controllers/private/list");
const { paramValidator } = require("../../middleware/paramValidator");

router.param("folderId", paramValidator);

router.route("/")
  .get(getAllLists)
  .post(createNewList);

router.route("/:folderId")
  .get(getListData)
  .delete(deleteList)
  .patch(modifyList);

module.exports = router;
