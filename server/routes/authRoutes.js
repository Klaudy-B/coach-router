const router = require('express').Router();
const {
    loginController,
    signupController,
    logoutController,
    checkLoginStateController,
    subjectController,
    profilePictureController,
    changeUsernameController,
    changePasswordController,
    changeEmailController,
    deleteAccountController,
    forgotUsernameController,
    recoverPasswordController,
    forgotPasswordController,
    verifyEmailController,
    changeSubjectController,
    bioController,
    forgotPasswordLoaderController,
    fetchTokenController
} = require('../controllers/authControllers');
const { verifyUser, forgotPasswordMiddleware, verifyToken } = require('../middlewares');
const fileUpload = require('express-fileupload');

router.get('/check-login-state', checkLoginStateController);
router.get('/fetch-token', verifyUser, fetchTokenController);
router.get('/logout', logoutController);
router.get('/verify-email', forgotPasswordMiddleware, verifyEmailController);
router.get('/forgot-password', forgotPasswordMiddleware, forgotPasswordController);
router.get('/forgot-password-loader', forgotPasswordLoaderController);

router.post('/login', loginController);
router.post('/signup', signupController);
router.post('/subject', verifyUser, verifyToken, subjectController);
router.post('/verify-email', verifyToken, forgotPasswordMiddleware, verifyEmailController);
router.post('/bio', verifyUser, verifyToken, bioController);
router.post('/profile-picture', verifyUser, verifyToken, fileUpload(), profilePictureController);
router.post('/forgot-password', forgotPasswordMiddleware, forgotPasswordController);
router.post('/recover-password', forgotPasswordMiddleware, recoverPasswordController);
router.post('/forgot-username', forgotUsernameController);

router.patch('/change-username', verifyUser, verifyToken, changeUsernameController);
router.patch('/change-subject', verifyUser, verifyToken, changeSubjectController);
router.patch('/change-password', verifyUser, verifyToken, changePasswordController);
router.patch('/change-email', verifyUser, verifyToken, changeEmailController);

router.delete('/delete-account', verifyUser, verifyToken, deleteAccountController);

module.exports = router;