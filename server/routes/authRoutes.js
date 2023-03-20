const router = require('express').Router();
const {
    loginController,
    signupController,
    logoutController,
    checkLoginStateController,
    subjectController
} = require('../controllers/authControllers');
const { verifyUser } = require('../middlewares');

router.get('/check-login-state', checkLoginStateController);
router.get('/logout', logoutController);

router.post('/login', loginController);
router.post('/signup', signupController);
router.post('/subject', verifyUser, subjectController);

module.exports = router;