import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'https://task-35-mongo-db.onrender.com/api/tasks'; 

function App() {
  const [todoList, setTodoList] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [searchText, setSearchText] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [activeEditId, setActiveEditId] = useState(null);
  const [updateText, setUpdateText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getTodoList();
  }, [searchText, currentFilter]);

  const getTodoList = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${API_URL}?search=${searchText}&status=${currentFilter}`);
      setTodoList(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const submitNewItem = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, { title: currentInput });
      setCurrentInput('');
      getTodoList();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add task");
    }
  };

  const switchStatus = async (item) => {
    try {
      await axios.put(`${API_URL}/${item._id}`, { isCompleted: !item.isCompleted });
      getTodoList();
    } catch (err) {
      console.error(err);
    }
  };

  const triggerEdit = (item) => {
    setActiveEditId(item._id);
    setUpdateText(item.title);
  };

  const commitEdit = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}`, { title: updateText });
      setActiveEditId(null);
      getTodoList();
    } catch (err) {
       alert(err.response?.data?.error || "Error updating title");
    }
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      getTodoList();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app-container">
      <h1>My Full-Stack To-Do List</h1>
      
      <div className="controls-section" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Search tasks..." 
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ flex: 1, padding: '8px' }}
        />
        <select value={currentFilter} onChange={(e) => setCurrentFilter(e.target.value)} style={{ padding: '8px' }}>
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <form className="add-task-form" onSubmit={submitNewItem}>
        <input 
          type="text" 
          placeholder="What needs to be done?" 
          value={currentInput} 
          onChange={(e) => setCurrentInput(e.target.value)} 
          required
        />
        <button type="submit">Add Task</button>
      </form>

      {isLoading && <h3 style={{ textAlign: 'center', color: '#666' }}>Loading your tasks... Please wait!</h3>}

      <ul className="task-list">
        {todoList.map(item => (
          <li key={item._id} className={item.isCompleted ? 'completed' : ''} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            
            <input 
              type="checkbox" 
              checked={item.isCompleted} 
              onChange={() => switchStatus(item)} 
            />
            
            {activeEditId === item._id ? (
              <div style={{ flex: 1, display: 'flex', gap: '5px' }}>
                <input 
                  type="text" 
                  value={updateText} 
                  onChange={(e) => setUpdateText(e.target.value)} 
                  style={{ flex: 1 }}
                />
                <button onClick={() => commitEdit(item._id)}>Save</button>
                <button onClick={() => setActiveEditId(null)}>Cancel</button>
              </div>
            ) : (
              <span className="task-title" style={{ flex: 1, textDecoration: item.isCompleted ? 'line-through' : 'none' }}>
                {item.title}
              </span>
            )}

            {activeEditId !== item._id && (
               <div className="actions">
                 <button onClick={() => triggerEdit(item)} style={{ marginRight: '5px' }}>Edit</button>
                 <button className="delete-btn" onClick={() => removeItem(item._id)}>Delete</button>
               </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;