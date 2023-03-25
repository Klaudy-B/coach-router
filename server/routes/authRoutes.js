const router = require('express').Router();
const {
    loginController,
    signupController,
    logoutController,
    checkLoginStateController,
    subjectController,
    profilePictureController
} = require('../controllers/authControllers');
const { verifyUser } = require('../middlewares');
const fileUpload = require('express-fileupload');

router.get('/check-login-state', checkLoginStateController);
router.get('/logout', logoutController);

router.post('/login', loginController);
router.post('/signup', signupController);
router.post('/subject', verifyUser, subjectController);
router.post('/profile-picture', verifyUser, fileUpload(), profilePictureController);

module.exports = router;