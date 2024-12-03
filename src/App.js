import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';

const App = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const selectedTask = useSelector((state) => state.tasks.selectedTask);

  return (
    <Router>
      <div className="app">
        <h1 className="head">Task Management</h1>
        <Routes>
          <Route path="/" element={<Navigate to="/tasks" />} />
          <Route
            path="/tasks"
            element={
              <>
                <TaskForm />
                <TaskList tasks={tasks} />
              </>
            }
          />
          <Route
            path="/tasks/:id"
            element={
              selectedTask ? (
                <TaskDetails task={selectedTask} />
              ) : (
                <div>Loading...</div>
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
