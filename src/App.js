import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';
import './styles.css';


const App = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const markTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const viewTaskDetails = (id) => {
    const task = tasks.find(task => task.id === id);
    setSelectedTask(task);
  };

  return (
    <div className="app">
      
    <h1 className='head'>Task Management</h1>
    {selectedTask ? (
      <TaskDetails task={selectedTask} setSelectedTask={setSelectedTask} />
    ) : (
      <>
        <TaskForm addTask={addTask} />
        <TaskList 
          tasks={tasks} 
          deleteTask={deleteTask} 
          markTask={markTask} 
          viewTaskDetails={viewTaskDetails} 
        />
      </>
    )}
  </div>
  
  );
};

export default App;
