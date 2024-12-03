import React, { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/TaskSlice';
import { v4 as uuidv4 } from 'uuid'; 
import {predefinedTasks} from './data';

const TaskForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState(''); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !dueDate) {
      setError('Title and Due Date are required!');
      return;
    }

    if (new Date(dueDate) < new Date()) {
      setError('Due Date cannot be in the past!');
      return;
    }

    const newTask = {
      id: uuidv4(), 
      title,
      description,
      dueDate,
      completed: false,
    };

   
    dispatch(addTask(newTask));

   
    setTitle('');
    setDescription('');
    setDueDate('');
    setError(''); 
  };


  
 

  useEffect(() => {
    
    predefinedTasks.forEach((task) => {
      const taskWithId = { ...task, id: uuidv4() };
      dispatch(addTask(taskWithId)); 
    });
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit} className="task-form">
      {error && <p className="error-message">{error}</p>} 

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
