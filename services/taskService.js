const Task = require('../models/Task');

// The service layer handles direct communication with MongoDB
async function getAllTasks() {
    return await Task.find({});
}

async function createTask(taskData) {
    const newTask = new Task(taskData);
    return await newTask.save();
}

async function updateTask(taskId, updateData) {
    // The { new: true } option returns the updated document instead of the old one
    return await Task.findByIdAndUpdate(taskId, updateData, { new: true });
}

async function deleteTask(taskId) {
    return await Task.findByIdAndDelete(taskId);
}

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
};