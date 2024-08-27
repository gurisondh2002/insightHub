const router = require("express").Router();
const insightController = require("../controllers/insightController");


router.post('/insert', insightController.addInsights);
router.get('/all', insightController.getAllInsights);

module.exports = router;
