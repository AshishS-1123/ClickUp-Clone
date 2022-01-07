const express = require ("express")
const router = express.Router ()

const { registerUser, loginUser, forgotPassword, resetPassword } = require ("../controllers/auth")

//router.post ("/register", () => {})
router.route ("/register").post (registerUser)

router.route ("/login").post (loginUser)

router.route ("/forgotPassword").post (forgotPassword)

router.route ("/resetPassword/:resetToken").put (resetPassword)

module.exports = router
