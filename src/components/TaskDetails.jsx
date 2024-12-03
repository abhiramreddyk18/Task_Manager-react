

import React from 'react';
import { useNavigate } from 'react-router-dom';

const TaskDetails = ({ task }) => {
  const navigate = useNavigate();

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div className="task-details">
      <h2>Task Details</h2>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Due Date: {task.dueDate}</p>
      <p>Status: {task.completed ? 'Completed' : 'Not Completed'}</p>
      <button onClick={() => navigate('/tasks')} className="back-btn">
        Back to List
      </button>
    </div>
  );
};

export default TaskDetails;
