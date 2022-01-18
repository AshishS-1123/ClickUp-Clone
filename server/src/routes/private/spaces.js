const express = require("express");
const router = express.Router();

const { getAllSpaces, createNewSpace, getSpaceData, deleteSpace, modifySpace } = require("../../controllers/private/spaces");
const { paramValidator } = require("../../middleware/paramValidator");

router.param("spaceId", paramValidator);

router.route("/")
  .get(paramValidator, getAllSpaces)
  .post(paramValidator, createNewSpace);

router.route("/:spaceId")
  .get(paramValidator, getSpaceData)
  .delete(paramValidator, deleteSpace)
  .patch(paramValidator, modifySpace);

module.exports = router;
