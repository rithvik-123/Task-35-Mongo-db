const Task = require('../models/Task');

const getAllMyTasks = async (req, res) => {
    try {
        const { search, status } = req.query;
        let queryObj = {};

        if (search) {
            queryObj.title = { $regex: search, $options: 'i' };
        }

        if (status === 'completed') queryObj.isCompleted = true;
        if (status === 'pending') queryObj.isCompleted = false;

        const myTasks = await Task.find(queryObj).sort({ createdAt: -1 });
        res.status(200).json(myTasks);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

const addNewTask = async (req, res) => {
    try {
        const incomingTask = new Task(req.body);
        const savedItem = await incomingTask.save();
        res.status(201).json(savedItem);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: err.message });
        }
        res.status(500).json({ error: 'Could not save' });
    }
};

const updateMyTask = async (req, res) => {
    try {
        const modifiedTask = await Task.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        
        if (!modifiedTask) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.status(200).json(modifiedTask);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: err.message });
        }
        res.status(500).json({ error: 'Could not update' });
    }
};

const removeMyTask = async (req, res) => {
    try {
        const itemToRemove = await Task.findByIdAndDelete(req.params.id);
        if (!itemToRemove) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.status(200).json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Could not delete' });
    }
};

module.exports = { getAllMyTasks, addNewTask, updateMyTask, removeMyTask };