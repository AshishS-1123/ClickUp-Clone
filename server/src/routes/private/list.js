const express = require("express");
const router = express.Router();

const { getAllLists, createNewList, getListData, deleteList, modifyList } = require("../../controllers/private/list");
const { paramValidator } = require("../../middleware/paramValidator");

router.param("listId", paramValidator);

router.route("/")
  .get(paramValidator, getAllLists)
  .post(paramValidator, createNewList);

router.route("/:listId")
  .get(paramValidator, getListData)
  .delete(paramValidator, deleteList)
  .patch(paramValidator, modifyList);

module.exports = router;
