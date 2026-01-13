import React, { useState } from "react";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [stars, setStars] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [dragIndex, setDragIndex] = useState(null);

  const addTask = () => {
    if (taskName.trim() === "") return;
    setTasks([...tasks, { name: taskName, done: false }]);
    setTaskName("");
  };

  const completeTask = (i) => {
    const updated = [...tasks];
    if (!updated[i].done) {
      updated[i].done = true;
      setStars(stars + 1);
      sound.play();
    }
    setTasks(updated);
  };

  const onDragStart = (index) => {
    setDragIndex(index);
  };

  const onDrop = (index) => {
    const updated = [...tasks];
    const draggedItem = updated[dragIndex];
    updated.splice(dragIndex, 1);
    updated.splice(index, 0, draggedItem);
    setTasks(updated);
  };

  if (!loggedIn) {
    return (
      <div className="login">
        <h1>🌈 Visual Schedule Trainer</h1>
        <button onClick={() => setLoggedIn(true)}>Login</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Dashboard</h1>

      {/* Add Task */}
      <div className="add-task">
        <input
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Add Routine Task (e.g. Brush Teeth 🪥)"
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Stars */}
      <div className="stars">⭐ Stars: {stars}</div>

      {/* Visual Timetable */}
      <h2>📅 Visual Timetable (Drag & Drop)</h2>
      <div className="task-list">
        {tasks.map((task, i) => (
          <div
            key={i}
            draggable
            onDragStart={() => onDragStart(i)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => onDrop(i)}
            className={`task ${task.done ? "done" : ""}`}
          >
            {task.name}
            <button onClick={() => completeTask(i)}>✔</button>
          </div>
        ))}
      </div>

      {/* Rewards */}
      <div className="reward-section">
        <h2>🎁 Rewards</h2>
        {stars >= 3 && <p>🥉 Bronze Badge Unlocked!</p>}
        {stars >= 5 && <p>🥈 Silver Badge Unlocked!</p>}
        {stars >= 8 && <p>🥇 Gold Badge Unlocked!</p>}
      </div>
    </div>
  );
}
