import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Make sure to change this back to your Render URL when deploying!
const API_URL = 'https://task-35-mongo-db.onrender.com/api/tasks'; 

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  
  // States for Search and Filter requirements
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // States for Updating Task Title requirement
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitleText, setEditTitleText] = useState('');

  // Re-fetch tasks whenever the search or filter changes
  useEffect(() => {
    fetchTasks();
  }, [searchQuery, statusFilter]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}?search=${searchQuery}&status=${statusFilter}`);
      setTasks(response.data);
    } catch (error) {
      console.error("Could not fetch tasks");
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, { title: newTaskTitle });
      setNewTaskTitle('');
      fetchTasks();
    } catch (error) {
      alert(error.response?.data?.error || "Error adding task");
    }
  };

  const toggleCompletionStatus = async (task) => {
    try {
      await axios.put(`${API_URL}/${task._id}`, { isCompleted: !task.isCompleted });
      fetchTasks();
    } catch (error) {
      console.error("Error updating status");
    }
  };

  const startEditing = (task) => {
    setEditingTaskId(task._id);
    setEditTitleText(task.title);
  };

  const saveEditedTitle = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}`, { title: editTitleText });
      setEditingTaskId(null);
      fetchTasks();
    } catch (error) {
       alert(error.response?.data?.error || "Error updating title (Must be 3-100 characters)");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task");
    }
  };

  return (
    <div className="app-container">
      <h1>My Full-Stack To-Do List</h1>
      
      {/* Search and Filter Section */}
      <div className="controls-section" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Search tasks..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: 1, padding: '8px' }}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ padding: '8px' }}>
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <form className="add-task-form" onSubmit={handleAddTask}>
        <input 
          type="text" 
          placeholder="What needs to be done?" 
          value={newTaskTitle} 
          onChange={(e) => setNewTaskTitle(e.target.value)} 
          required
        />
        <button type="submit">Add Task</button>
      </form>

      <ul className="task-list">
        {tasks.map(task => (
          <li key={task._id} className={task.isCompleted ? 'completed' : ''} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            
            <input 
              type="checkbox" 
              checked={task.isCompleted} 
              onChange={() => toggleCompletionStatus(task)} 
            />
            
            {/* Conditional Rendering for Edit Mode */}
            {editingTaskId === task._id ? (
              <div style={{ flex: 1, display: 'flex', gap: '5px' }}>
                <input 
                  type="text" 
                  value={editTitleText} 
                  onChange={(e) => setEditTitleText(e.target.value)} 
                  style={{ flex: 1 }}
                />
                <button onClick={() => saveEditedTitle(task._id)}>Save</button>
                <button onClick={() => setEditingTaskId(null)}>Cancel</button>
              </div>
            ) : (
              <span className="task-title" style={{ flex: 1, textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
                {task.title}
              </span>
            )}

            {/* Only show Edit/Delete buttons if we are NOT currently editing this specific task */}
            {editingTaskId !== task._id && (
               <div className="actions">
                 <button onClick={() => startEditing(task)} style={{ marginRight: '5px' }}>Edit</button>
                 <button className="delete-btn" onClick={() => handleDeleteTask(task._id)}>Delete</button>
               </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;