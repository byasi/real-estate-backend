const express = require('express');

const router = express.Router();

const UserControllers = require('../controllers/UserControllers');

// all apis
router.post('/addUser', UserControllers.registerUser);
router.get('/', UserControllers.getAllUsers);
router.get('/:id',UserControllers.findSingleUser);
router.delete('/delete/:id',UserControllers.deleteUser);
router.post('/login',UserControllers.login);
router.get('/login/:token',UserControllers.getUserProfile);
router.patch('/update/:id', UserControllers.updateUser);

module.exports = router;