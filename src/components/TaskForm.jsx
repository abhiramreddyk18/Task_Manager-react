import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && dueDate) {
      const newTask = {
        id: Date.now(),
        title,
        description,
        dueDate,
        completed: false,
      };
      addTask(newTask);
      setTitle('');
      setDescription('');
      setDueDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input 
        type="text" 
        placeholder="Task Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        required 
        className="input-field"
      />
      <textarea 
        placeholder="Task Description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        className="textarea-field"
      />
      <input 
        type="date" 
        value={dueDate} 
        onChange={(e) => setDueDate(e.target.value)} 
        required 
        className="input-field"
      />
      <button type="submit" className="submit-btn">Add Task</button>
    </form>
  );
};

export default TaskForm;
