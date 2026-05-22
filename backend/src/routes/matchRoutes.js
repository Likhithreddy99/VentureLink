const express = require('express');
const { getMatches } = require('../controllers/matchController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', protect, authorize('technical_founder', 'business_founder'), getMatches);

module.exports = router;
