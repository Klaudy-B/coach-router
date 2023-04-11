const router = require('express').Router();
const { coachController, coachSearchController } = require('../controllers/coachControllers');

router.get('/', coachController);
router.get('/:username', coachController);
router.get('/:pattern/pattern', coachSearchController);

module.exports = router;