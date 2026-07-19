const express = require('express');
const router = express.Router();
const { getAllMyTasks, addNewTask, updateMyTask, removeMyTask } = require('../controllers/taskController');

router.get('/', getAllMyTasks);
router.post('/', addNewTask);
router.put('/:id', updateMyTask);
router.delete('/:id', removeMyTask);

module.exports = router;