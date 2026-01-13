import React, { useState } from "react";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [stars, setStars] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [dragIndex, setDragIndex] = useState(null);

  const [childName, setChildName] = useState("");
  const [age, setAge] = useState("");
  const [favColor, setFavColor] = useState("");
  const [favCartoon, setFavCartoon] = useState("");

  const [showDashboard, setShowDashboard] = useState(false);

  const pastelColor = (color) => {
    return `linear-gradient(
      rgba(255,255,255,0.7),
      rgba(255,255,255,0.7)
    ), ${color}`;
  };
  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
    if (tasks[index].done) {
      setStars((prev) => Math.max(prev - 1, 0));
    }
  };

  const defaultTasks = [
    "Brush Teeth 🪥",
    "Eat Breakfast 🍳",
    "Eat Lunch 🍲",
    "Eat Dinner 🍽️",
    "Make Bed 🛏️",
    "Read a Book 📖",
    "Do Homework ✏️",
    "Play Outside ⚽",
    "Drink Water 💧",
    "Clean Room 🧹",
  ];

  const addTask = () => {
    if (taskName.trim() === "") return;
    setTasks([...tasks, { name: taskName, done: false }]);
    setTaskName("");
  };
  const completeTask = (i) => {
    const updated = [...tasks];
    updated[i].done = !updated[i].done;
    setTasks(updated);

    if (updated[i].done) {
      setStars((prev) => prev + 1);
      } else {
      setStars((prev) => Math.max(prev - 1, 0));
    }
  };

  const onDragStart = (index) => {
    setDragIndex(index);
  };

  const onDrop = (index) => {
    if (dragIndex === null) return;
    const updated = [...tasks];
    const draggedItem = updated[dragIndex];
    updated.splice(dragIndex, 1);
    updated.splice(index, 0, draggedItem);
    setTasks(updated);
    setDragIndex(null);
  };

  // LOGIN SCREEN
  if (!loggedIn) {
    return (
      <div className="login">
        <h1>🌈 Visual Schedule Trainer</h1>
        <h2>Login to start your fun filled day</h2>

        <input
          type="text"
          placeholder="What is your Name?"
          value={childName}
          onChange={(e) => setChildName(e.target.value)}
        />

        <input
          type="number"
          placeholder="How old are you?"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <input
          type="text"
          placeholder="Your favourite Colour? (except black and white)"
          value={favColor}
          onChange={(e) => setFavColor(e.target.value)}
        />

        <input
          type="text"
          placeholder="Who is your favourite Cartoon Character?"
          value={favCartoon}
          onChange={(e) => setFavCartoon(e.target.value)}
        />

        <button
          onClick={() => {
            if (
              childName.trim() === "" ||
              age === "" ||
              favColor.trim() === "" ||
              favCartoon.trim() === ""
            ) {
              alert("Please fill all details");
              return;
            }
            setLoggedIn(true);
          }}
        >
          Start my Day 🌟
        </button>
      </div>
    );
  }

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.done).length;

  return (
    <div
      className="container"
      style={{
        background: pastelColor(favColor),
        minHeight: "100vh",
        width: "100vw",
        paddingTop: "70px",
      }}
    >
      {/* MENU BAR */}
      <div className="menu-bar">
        <button
          className="dashboard-button"
          style={{ backgroundColor: favColor }}
          onClick={() => setShowDashboard(prev => !prev)}
        >
          {childName}'s Dashboard
        </button>

        <div className="menu-info">
          <span>⭐ Stars: {stars}</span>
          <span>✅ Completed: {completedTasks}</span>
        </div>

        <div className="menu-actions">
          <button onClick={() => setLoggedIn(false)}>Logout</button>
        </div>
      </div>

      {/* DASHBOARD DROPDOWN */}
      {showDashboard && (
        <div className="dashboard-dropdown">
          <h3>Child Details</h3>
          <p>🎂 Age: {age}</p>
          <p>📺 Favourite Cartoon Charater: {favCartoon}</p>
          <p>🎨 Favourite Colour: {favColor}</p>
          <p>⭐ Stars: {stars}</p>
          <p>📝 Total Tasks: {totalTasks}</p>
        </div>
      )}

      <h1>Schedule Trainer</h1>

      {/* Add Task Section (on top of both columns) */}
    <div className="add-task-global">
      <select
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      >
        <option value="">Select a Task</option>
        {defaultTasks.map((task, idx) => (
          <option key={idx} value={task}>
            {task}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Or write your own task"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
    </div>

    {/* Tasks Section */}
    <div className="task-section">
      {/* Tasks Column */}
      <div className="tasks-column">
        <h2 className="section-title">📝 Tasks</h2>

        <div className="task-list">
          {tasks
            .map((task, i) => ({ ...task, index: i }))
            .filter((task) => !task.done)
            .map((task) => (
              <div
                key={task.index}
                draggable
                onDragStart={() => onDragStart(task.index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => onDrop(task.index)}
                className="task"
              >
                <input
                  type="checkbox"
                  onChange={() => completeTask(task.index)}
                />
                <span>{task.name}</span>
                <button
                  className="delete-task-btn"
                  onClick={() => deleteTask(task.index)}
                >
                  🗑️
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* Completed Column */}
      <div className="completed-column">
        <h2 className="section-title">✅ Completed</h2>
        <div className="task-list">
          {tasks
            .map((task, i) => ({ ...task, index: i }))
            .filter((task) => task.done)
            .map((task) => (
              <div key={task.index} className="task done">
                <span>✔ {task.name}</span>
                <button
                  className="delete-task-btn"
                  onClick={() => deleteTask(task.index)}
                >
                  🗑️
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>

      {/* Bottom Row: Rewards */}
      <div className="bottom-section">
        <div className="reward-section">
          <h2>🎁 Rewards</h2>
          {stars >= 3 && <p>🥉 Bronze Badge Unlocked!</p>}
          {stars >= 5 && <p>🥈 Silver Badge Unlocked!</p>}
          {stars >= 8 && <p>🥇 Gold Badge Unlocked!</p>}
        </div>
      </div>
    </div>
  );
}
