const express = require('express');
const router = express.Router();

const {
  getAllPriorities,
  addNewPriority,
  getAllStatuses,
  addNewStatus,
  getAllViews,
  addNewView
} = require('../../controllers/private/workspaceMeta');
const { paramValidator } = require('../../middleware/paramValidator');

router.route('/priorities')
  .get(paramValidator, getAllPriorities)
  .put(paramValidator, addNewPriority);

router.route('/statuses')
  .get(paramValidator, getAllStatuses)
  .put(paramValidator, addNewStatus);

router.route('/views')
  .get(paramValidator, getAllViews)
  .put(paramValidator, addNewView);

module.exports = router;
