import React, { useState } from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";

import ProfilePage from "./components/ProfilePage";
import RewardsPage from "./components/RewardsPage";
import RoutinePage from "./components/RoutinePage";

// ---------------- App Component ----------------
export default function App() {
  const history = useHistory();

  const [loggedIn, setLoggedIn] = useState(false);
  const [stars, setStars] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskTime, setTaskTime] = useState("morning");
  const [childName, setChildName] = useState("");
  const [age, setAge] = useState("");
  const [favColor, setFavColor] = useState("");
  const [favCartoon, setFavCartoon] = useState("");

  const [showDashboard, setShowDashboard] = useState(false);

  // ---------------- DEFAULT TASKS ----------------
  const defaultTasks = [
  // Morning Routine
  { name: "Wake Up 🌅", time: "morning" },
  { name: "Brush Teeth 🪥", time: "morning" },
  { name: "Wash Face 🧼", time: "morning" },
  { name: "Comb Hair 💇‍♂️", time: "morning" },
  { name: "Get Dressed 👕", time: "morning" },
  { name: "Put on Shoes 👟", time: "morning" },
  { name: "Make Bed 🛏️", time: "morning" },
  { name: "Eat Breakfast 🍳", time: "morning" },
  { name: "Take Morning Medicine 💊", time: "morning" },

  // School / Structured Activities
  { name: "Pack School Bag 🎒", time: "morning" },
  { name: "Pack Lunch 🍱", time: "morning" },
  { name: "Go to School 🏫", time: "morning" },
  { name: "Do Homework ✏️", time: "afternoon" },
  { name: "Read a Book 📖", time: "afternoon" },
  { name: "Practice Letters/Numbers 🔤", time: "afternoon" },
  { name: "Art & Drawing 🎨", time: "afternoon" },
  { name: "Music Time 🎵", time: "afternoon" },

  // Afternoon / Breaks
  { name: "Eat Lunch 🍲", time: "afternoon" },
  { name: "Drink Water 💧", time: "afternoon" },
  { name: "Sensory Break 🌈", time: "afternoon" },
  { name: "Quiet Time 🛋️", time: "afternoon" },
  { name: "Play Outside ⚽", time: "afternoon" },
  { name: "Exercise/Stretch 🏃‍♂️", time: "afternoon" },

  // Evening / Family & Chores
  { name: "Eat Dinner 🍽️", time: "evening" },
  { name: "Clean Room 🧹", time: "evening" },
  { name: "Put Toys Away 🧸", time: "evening" },
  { name: "Take Shower 🛁", time: "evening" },
  { name: "Brush Teeth 🪥", time: "evening" },
  { name: "Pack Bag for Next Day 🎒", time: "evening" },

  // Relaxation / Bedtime
  { name: "Story Time 📚", time: "evening" },
  { name: "Calm Breathing 🌬️", time: "evening" },
  { name: "Bedtime 🌙", time: "evening" },

  // Optional Fun / Rewards
  { name: "Sticker Chart ⭐", time: "afternoon" },
  { name: "Play a Game 🎲", time: "afternoon" },
  { name: "Listen to Favorite Song 🎶", time: "afternoon" },
  { name: "Practice Hobby 🧩", time: "afternoon" },
  { name: "Watch Cartoon 📺", time: "evening" },
  { name: "Talk About Feelings 💬", time: "evening" },
];


  const pastelColor = (color) =>
    `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), ${color}`;

  // ---------------- TASK FUNCTIONS ----------------
  const addTask = () => {
    if (!taskName.trim()) return;
    setTasks([...tasks, { name: taskName, done: false, time: taskTime }]);
    setTaskName("");
    setTaskTime("morning"); // reset to default
  };

  const deleteTask = (index) => {
    if (tasks[index].done) setStars((prev) => Math.max(prev - 1, 0));
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const completeTask = (i) => {
    const updated = [...tasks];
    updated[i].done = !updated[i].done;
    setTasks(updated);
    if (updated[i].done) setStars((prev) => prev + 1);
    else setStars((prev) => Math.max(prev - 1, 0));
  };

  // ---------------- LOGIN SCREEN ----------------
  if (!loggedIn) {
    return (
      <div className="login">
        <h1>🌈 Visual Schedule Trainer</h1>

        <input
          placeholder="Your name is?"
          value={childName}
          onChange={(e) => setChildName(e.target.value)}
        />
        <input
          placeholder="How old are you?"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          placeholder="What's your Color?"
          value={favColor}
          onChange={(e) => setFavColor(e.target.value)}
        />
        <input
          placeholder="Who's your Favourite Cartoon Character?"
          value={favCartoon}
          onChange={(e) => setFavCartoon(e.target.value)}
        />

        <button
          onClick={() => {
            if (!childName || !age || !favColor || !favCartoon) {
              alert("Please fill all details");
              return;
            }
            setLoggedIn(true);
            history.push("/");
          }}
        >
          Start My Day 🌟
        </button>
      </div>
    );
  }

  // ---------------- MAIN APP ----------------
  return (
    <>
      {/* NAV BAR */}
      <nav className="menu-bar">
        <div className="menu-left">
          <Link to="/" className="dashboard-button">
            {childName}'s Dashboard
          </Link>
          <Link to="/profile" className="menu-btn">
            Profile
          </Link>
          <Link to="/rewards" className="menu-btn">
            Rewards
          </Link>
          <Link to="/routine" className="menu-btn">
            Routine
          </Link>
        </div>

        <div className="menu-right">
          <span>⭐ {stars}</span>
          <button className="logout-btn" onClick={() => setLoggedIn(false)}>
            Logout
          </button>
        </div>
      </nav>

      <Switch>
        <Route exact path="/">
          <Dashboard
            tasks={tasks}
            taskName={taskName}
            setTaskName={setTaskName}
            taskTime={taskTime}
            setTaskTime={setTaskTime}
            addTask={addTask}
            completeTask={completeTask}
            deleteTask={deleteTask}
            stars={stars}
            childName={childName}
            age={age}
            favColor={favColor}
            favCartoon={favCartoon}
            showDashboard={showDashboard}
            setShowDashboard={setShowDashboard}
            defaultTasks={defaultTasks}
            pastelColor={pastelColor}
          />
        </Route>

        <Route path="/profile">
          <ProfilePage
            childName={childName}
            age={age}
            favColor={favColor}
            favCartoon={favCartoon}
            setProfile={({ childName, age, favColor, favCartoon }) => {
              setChildName(childName);
              setAge(age);
              setFavColor(favColor);
              setFavCartoon(favCartoon);
            }}
          />
        </Route>

        <Route path="/rewards">
          <RewardsPage stars={stars} favCartoon={favCartoon} />
        </Route>

        <Route path="/routine">
          <RoutinePage tasks={tasks} setTasks={setTasks} />
        </Route>
      </Switch>
    </>
  );
}

// ---------------- DASHBOARD ----------------
function Dashboard({
  tasks,
  taskName,
  setTaskName,
  taskTime,
  setTaskTime,
  addTask,
  completeTask,
  deleteTask,
  stars,
  childName,
  age,
  favColor,
  favCartoon,
  showDashboard,
  setShowDashboard,
  defaultTasks,
  pastelColor,
}) {
  const pendingTasks = tasks.filter((t) => !t.done);
  const completedTasks = tasks.filter((t) => t.done);

  return (
    <div
      className="container"
      style={{ background: pastelColor(favColor), minHeight: "100vh" }}
    >
      {/* ---------- Header ---------- */}
      <header className="dashboard-header">
        <div>
          <h1>{childName}'s Schedule</h1>
          <p>⭐ Stars: {stars}</p>
        </div>
        <button
          className="dashboard-toggle"
          onClick={() => setShowDashboard((p) => !p)}
        >
          Child Info
        </button>
      </header>

      {/* ---------- Child Info Dropdown ---------- */}
      {showDashboard && (
        <div className="dashboard-dropdown">
          <p>🎂 Age: {age}</p>
          <p>📺 Cartoon Character: {favCartoon}</p>
          <p>🎨 Favourite Colour: {favColor}</p>
          <p>📝 Total Tasks: {tasks.length}</p>
          <p>✅ Completed: {completedTasks.length}</p>
        </div>
      )}

      {/* ---------- Add Task Section ---------- */}
      <div className="add-task-global">
        <select
          value={taskName}
          onChange={(e) => {
            const selectedTask = defaultTasks.find(
              (t) => t.name === e.target.value
            );
            setTaskName(e.target.value);
            if (selectedTask) setTaskTime(selectedTask.time);
          }}
        >
          <option value="">Choose task</option>
          {defaultTasks.map((t, i) => (
            <option key={i} value={t.name}>
              {t.name}
            </option>
          ))}
        </select>

        <select
          value={taskTime}
          onChange={(e) => setTaskTime(e.target.value)}
        >
          <option value="morning">Morning 🌅</option>
          <option value="afternoon">Afternoon ☀️</option>
          <option value="evening">Evening 🌙</option>
        </select>

        <input
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Or type your own"
        />

        <button onClick={addTask}>Add</button>
      </div>

      {/* ---------- Tasks Columns ---------- */}
      <div className="task-columns">
        {/* Pending Tasks */}
        <div className="task-section pending-tasks">
          <h2>📝 To Do</h2>
          {pendingTasks.length === 0 && <p>All done! 🎉</p>}
          {pendingTasks.map((t, i) => (
            <div key={i} className="task">
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => completeTask(tasks.indexOf(t))}
              />
              <span>{t.name}</span>
              <button onClick={() => deleteTask(tasks.indexOf(t))}>🗑</button>
            </div>
          ))}
        </div>

        {/* Completed Tasks */}
        <div className="task-section completed-tasks">
          <h2>✅ Done</h2>
          {completedTasks.length === 0 && <p>No tasks completed yet.</p>}
          {completedTasks.map((t, i) => (
            <div key={i} className="task done">
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => completeTask(tasks.indexOf(t))}
              />
              <span>{t.name}</span>
              <button onClick={() => deleteTask(tasks.indexOf(t))}>🗑</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
