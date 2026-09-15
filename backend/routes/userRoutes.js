const express = require('express');
const router = express.Router();
const { getUsers, createUser, deleteUser } = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', protect, adminOnly, getUsers);
router.post('/', protect, adminOnly, createUser);
router.delete('/:id', protect, adminOnly, deleteUser);

module.exports = router;