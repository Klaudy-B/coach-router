const router = require('express').Router();
const { coachController } = require('../controllers/coachControllers');

router.get('/', coachController);
router.get('/:username', coachController)

module.exports = router;