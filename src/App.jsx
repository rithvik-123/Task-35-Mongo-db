import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Point this to your backend server URL
const API_URL = 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch tasks when the component loads
  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      setErrorMessage('Failed to load tasks. Is the backend running?');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddTask(event) {
    event.preventDefault();
    if (newTaskTitle.trim() === '') return;

    try {
      const response = await axios.post(API_URL, {
        title: newTaskTitle,
        isCompleted: false
      });
      // Add the newly created task from the database to our local state
      setTasks([...tasks, response.data]);
      setNewTaskTitle(''); 
    } catch (error) {
      setErrorMessage('Failed to add a new task.');
    }
  }

  async function handleToggleComplete(task) {
    try {
      const response = await axios.put(`${API_URL}/${task._id}`, {
        isCompleted: !task.isCompleted
      });
      
      // Update the UI by mapping through tasks and replacing the updated one
      const updatedTasks = tasks.map(function(t) {
        if (t._id === task._id) {
            return response.data;
        }
        return t;
      });
      setTasks(updatedTasks);
    } catch (error) {
      setErrorMessage('Failed to update the task status.');
    }
  }

  async function handleDeleteTask(taskId) {
    try {
      await axios.delete(`${API_URL}/${taskId}`);
      
      // Remove the deleted task from our local state array
      const remainingTasks = tasks.filter(function(task) {
        return task._id !== taskId;
      });
      setTasks(remainingTasks);
    } catch (error) {
      setErrorMessage('Failed to delete the task.');
    }
  }

  return (
    <div className="app-container">
      <h1>My Full-Stack To-Do List</h1>
      
      {errorMessage && <div className="error-box">{errorMessage}</div>}
      
      <form onSubmit={handleAddTask} className="add-task-form">
        <input 
          type="text" 
          placeholder="What needs to be done?" 
          value={newTaskTitle}
          onChange={function(e) { setNewTaskTitle(e.target.value) }}
        />
        <button type="submit">Add Task</button>
      </form>

      {isLoading ? (
        <p>Loading tasks from database...</p>
      ) : (
        <ul className="task-list">
          {tasks.map(function(task) {
            return (
              <li key={task._id} className={task.isCompleted ? 'completed' : ''}>
                <span 
                  className="task-title" 
                  onClick={function() { handleToggleComplete(task) }}
                >
                  {task.title}
                </span>
                <button 
                  className="delete-btn" 
                  onClick={function() { handleDeleteTask(task._id) }}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default App;