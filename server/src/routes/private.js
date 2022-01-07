const express = require ('express')
const router = express.Router ()

const { getPrivateData } = require ('../controllers/private')
const { protect } = require ('../middleware/auth')

router.route ('/').get (protect, getPrivateData)

module.exports = router
