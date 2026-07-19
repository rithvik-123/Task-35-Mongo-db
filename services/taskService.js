const Task = require('../models/Task');

// Fetch tasks with optional search and filter parameters
const fetchAllTasks = async (searchQuery = '', statusFilter = 'all') => {
    let dbQuery = {};

    // If user searched for a word, find titles that match it (case-insensitive)
    if (searchQuery) {
        dbQuery.title = { $regex: searchQuery, $options: 'i' }; 
    }

    // Filter by completed or pending status
    if (statusFilter === 'completed') dbQuery.isCompleted = true;
    if (statusFilter === 'pending') dbQuery.isCompleted = false;

    // Return the tasks, sorted by newest first
    return await Task.find(dbQuery).sort({ createdAt: -1 });
};

const createNewTask = async (taskData) => {
    const newTask = new Task(taskData);
    return await newTask.save();
};

const updateExistingTask = async (taskId, updatedData) => {
    // runValidators ensures the new title still follows our 3-character min-length rule
    return await Task.findByIdAndUpdate(taskId, updatedData, { new: true, runValidators: true });
};

const removeTask = async (taskId) => {
    return await Task.findByIdAndDelete(taskId);
};

module.exports = { fetchAllTasks, createNewTask, updateExistingTask, removeTask };