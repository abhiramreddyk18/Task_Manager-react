import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/TaskSlice';
import { v4 as uuidv4 } from 'uuid'; // Optionally use uuid for ID generation

const TaskForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState(''); // State for error message

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation for empty fields
    if (!title || !dueDate) {
      setError('Title and Due Date are required!');
      return;
    }

    if (new Date(dueDate) < new Date()) {
      setError('Due Date cannot be in the past!');
      return;
    }

    const newTask = {
      id: uuidv4(), // Using uuid for a unique task ID
      title,
      description,
      dueDate,
      completed: false,
    };

    // Dispatch the action to add the task
    dispatch(addTask(newTask));

    // Clear the form
    setTitle('');
    setDescription('');
    setDueDate('');
    setError(''); // Clear the error message after a successful submit
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      {error && <p className="error-message">{error}</p>} {/* Display error message if exists */}

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
