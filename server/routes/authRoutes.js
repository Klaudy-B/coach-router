const router = require('express').Router();
const {
    loginController,
    signupController,
    logoutController,
    checkLoginStateController,
    subjectController,
    profilePictureController,
    changeUsernameController
} = require('../controllers/authControllers');
const { verifyUser } = require('../middlewares');
const fileUpload = require('express-fileupload');

router.get('/check-login-state', checkLoginStateController);
router.get('/logout', logoutController);

router.post('/login', loginController);
router.post('/signup', signupController);
router.post('/subject', verifyUser, subjectController);
router.post('/profile-picture', verifyUser, fileUpload(), profilePictureController);

router.patch('/change-username', verifyUser, changeUsernameController);

module.exports = router;