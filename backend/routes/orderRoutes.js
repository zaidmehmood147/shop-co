const express = require('express');
const router = express.Router();
const { getOrders, createOrder, updateStatus, deleteOrder } = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', protect, adminOnly, getOrders);
router.post('/', createOrder);
router.put('/:id/status', protect, adminOnly, updateStatus);
router.delete('/:id', protect, adminOnly, deleteOrder);

module.exports = router;