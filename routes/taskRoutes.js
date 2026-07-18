const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Map the HTTP methods and endpoints to the specific controller functions
router.get('/', taskController.getTasks);
router.post('/', taskController.addTask);
router.put('/:id', taskController.editTask);
router.delete('/:id', taskController.removeTask);

module.exports = router;