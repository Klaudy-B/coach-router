const router = require('express').Router();
const {
    loginController,
    signupController,
    logoutController,
    checkLoginStateController,
} = require('../controllers/authControllers');

router.get('/check-login-state', checkLoginStateController);
router.get('/logout', logoutController);

router.post('/login', loginController);
router.post('/signup', signupController);

module.exports = router;