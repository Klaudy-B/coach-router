const router = require('express').Router();
const { coachController } = require('../controllers/coachControllers');

router.get('/', coachController);

module.exports = router;