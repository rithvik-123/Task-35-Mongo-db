const taskService = require('../services/taskService');

async function getTasks(req, res) {
    try {
        const tasks = await taskService.getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Server error while fetching tasks" });
    }
}

async function addTask(req, res) {
    try {
        if (!req.body.title) {
            return res.status(400).json({ message: "Task title is required" });
        }
        const newTask = await taskService.createTask(req.body);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: "Server error while creating task" });
    }
}

async function editTask(req, res) {
    try {
        const updatedTask = await taskService.updateTask(req.params.id, req.body);
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Server error while updating task" });
    }
}

async function removeTask(req, res) {
    try {
        const deletedTask = await taskService.deleteTask(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error while deleting task" });
    }
}

module.exports = {
    getTasks,
    addTask,
    editTask,
    removeTask
};