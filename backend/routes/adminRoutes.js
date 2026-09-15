const express = require('express');
const router = express.Router();
const { adminLogin, createAdmin, getStats } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/login', adminLogin);
router.post('/create', protect, adminOnly, createAdmin);
router.get('/stats', protect, adminOnly, getStats);

module.exports = router;