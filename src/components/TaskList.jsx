import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteTask, markTask, viewTaskDetails } from '../store/TaskSlice';

const TaskList = ({ tasks }) => {
  const dispatch = useDispatch();
  const [sortOption, setSortOption] = useState('none');

  const sortTasks = (tasks, option) => {
    switch (option) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'notCompleted':
        return tasks.filter(task => !task.completed);
      case 'overdue':
        return tasks.filter(task => new Date(task.dueDate) < new Date() && !task.completed);
      case 'dueDateAsc':
        return [...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      case 'dueDateDesc':
        return [...tasks].sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
      default:
        return tasks;
    }
  };

  const sortedTasks = sortTasks(tasks, sortOption);

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleMark = (taskId) => {
    dispatch(markTask(taskId));
  };

  const handleViewDetails = (taskId) => {
    dispatch(viewTaskDetails(taskId));
  };

  return (
    <div className="app-container">
      <div className="sort-options">
        <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
          <option value="none">Sort By</option>
          <option value="completed">Completed</option>
          <option value="notCompleted">Not Completed</option>
          <option value="overdue">Overdue</option>
          <option value="dueDateAsc">Due Date (Asc)</option>
          <option value="dueDateDesc">Due Date (Desc)</option>
        </select>
      </div>

      <ul className="task-list">
        {sortedTasks.map((task) => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due: {task.dueDate}</p>
            <p className="status">Status: {task.completed ? 'Completed' : 'Not Completed'}</p>
            <div className="button-container">
              <button onClick={() => handleMark(task.id)} className="mark-btn">
                {task.completed ? 'Unmark' : 'Mark'} as Completed
              </button>
              <button onClick={() => handleDelete(task.id)} className="delete-btn">Delete</button>
              <Link
                to={`/tasks/${task.id}`}
                className="view-btn"
                onClick={() => handleViewDetails(task.id)}
              >
                View Details
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
