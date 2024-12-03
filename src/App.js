import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import { addTask, deleteTask, markTask } from './store/TaskSlice';
import './styles.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';

const App = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const selectedTask = useSelector((state) => state.tasks.selectedTask);

  const handleAddTask = (newTask) => {
    dispatch(addTask(newTask));
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const handleMarkTask = (id) => {
    dispatch(markTask(id));
  };

  const handleViewTaskDetails = (id) => {
    const task = tasks.find((task) => task.id === id);
    dispatch({ type: 'tasks/setSelectedTask', payload: task });
  };

  return (
    <Router>
      <div className="app">

        <h1 className="head">Task Management</h1>

        <Routes>
        <Route path="/" element={<Navigate to="/tasks" />} />
          <Route
            exact
            path="/tasks"
            element={
              <>
                <TaskForm addTask={handleAddTask} />
                <TaskList
                  tasks={tasks}
                  deleteTask={handleDeleteTask}
                  markTask={handleMarkTask}
                  viewTaskDetails={handleViewTaskDetails}
                />
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
