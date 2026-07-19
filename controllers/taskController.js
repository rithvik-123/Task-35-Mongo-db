const taskService = require('../services/taskService');

const getTasks = async (req, res) => {
    try {
        // Extract search and status from the URL query
        const { search, status } = req.query;
        const tasks = await taskService.fetchAllTasks(search, status);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load tasks from database' });
    }
};

const addTask = async (req, res) => {
    try {
        const savedTask = await taskService.createNewTask(req.body);
        res.status(201).json(savedTask);
    } catch (error) {
        // Check if the error is from our Mongoose validation rules
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Failed to create task' });
    }
};

const editTask = async (req, res) => {
    try {
        const updatedTask = await taskService.updateExistingTask(req.params.id, req.body);
        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Failed to update task' });
    }
};

const deleteTask = async (req, res) => {
    try {
        const deletedTask = await taskService.removeTask(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
};

module.exports = { getTasks, addTask, editTask, deleteTask };