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

  const pastelColor = (color) => {
    return `linear-gradient(
      rgba(255,255,255,0.7),
      rgba(255,255,255,0.7)
    ), ${color}`;
  };

  const defaultTasks = [
  "Brush Teeth 🪥",
  "Eat Breakfast 🍳",
  "Eat Lunch 🍲",
  "Eat Dinner 🍽️",
  "Make Bed 🛏️",
  "Read a my Favorite Book 📖",
  "Do Homework ✏️",
  "Play Outside ⚽",
  "Drink Water 💧",
  "Clean Room 🧹",
  "Get Dressed 👕",
  "Pack Bag 🎒",
  "Wash Hands 🧼",
  "Take a Shower 🚿",
  "Go to Sleep 💤"
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
        <h2>Child Login</h2>

        <input
          type="text"
          placeholder="Child's Name"
          value={childName}
          onChange={(e) => setChildName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <input
          type="text"
          placeholder="Favourite Colour (e.g. lightblue)"
          value={favColor}
          onChange={(e) => setFavColor(e.target.value)}
        />

        <input
          type="text"
          placeholder="Favourite Cartoon Character"
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
          Start My Day 🌟
        </button>
      </div>
    );
  }

  // DASHBOARD
  return (
    <div
      className="container"
      style={{
        background: pastelColor(favColor),
        minHeight: "100vh",
        width: "100vw"
      }}
    >
      <h1 className="dashboard-title">Dashboard</h1>

      {/* Profile Card */}
      <div className="profile-card">
        <h2>👦 {childName}</h2>
        <p>🎂 Age: {age}</p>
        <p>📺 Favourite Cartoon: {favCartoon}</p>
        <p>🎨 Favourite Colour: {favColor}</p>
      </div>

      {/* Add Task */}
      <div className="add-task">
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

      {/* Stars */}
      <div className="stars">⭐ Stars: {stars}</div>

      {/* Visual Timetable */}
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
            </div>
          ))}
      </div>

    <h2 className="section-title">✅ Completed</h2>
    <div className="task-list">
      {tasks
        .map((task, i) => ({ ...task, index: i }))
        .filter((task) => task.done)
        .map((task) => (
          <div key={task.index} className="task done">
            <span>✔ {task.name}</span>
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
