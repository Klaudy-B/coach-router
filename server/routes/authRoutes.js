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
    bioController
} = require('../controllers/authControllers');
const { verifyUser, forgotPasswordMiddleware } = require('../middlewares');
const fileUpload = require('express-fileupload');

router.get('/check-login-state', checkLoginStateController);
router.get('/logout', logoutController);
router.get('/verify-email', verifyUser, verifyEmailController);
router.get('/forgot-password', forgotPasswordMiddleware, forgotPasswordController);

router.post('/login', loginController);
router.post('/signup', signupController);
router.post('/subject', verifyUser, subjectController);
router.post('/verify-email', verifyUser, verifyEmailController);
router.post('/bio', verifyUser, bioController);
router.post('/profile-picture', verifyUser, fileUpload(), profilePictureController);
router.post('/forgot-password', forgotPasswordMiddleware, forgotPasswordController);
router.post('/recover-password', forgotPasswordMiddleware, recoverPasswordController);
router.post('/forgot-username', forgotUsernameController);

router.patch('/change-username', verifyUser, changeUsernameController);
router.patch('/change-subject', verifyUser, changeSubjectController);
router.patch('/change-password', verifyUser, changePasswordController);
router.patch('/change-email', verifyUser, changeEmailController);

router.delete('/delete-account', verifyUser, deleteAccountController);

module.exports = router;