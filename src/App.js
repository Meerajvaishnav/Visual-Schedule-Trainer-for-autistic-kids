import axios from "axios";
import React, { useState, useEffect } from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";


import ProfilePage from "./components/ProfilePage";
import RewardsPage from "./components/RewardsPage";
import RoutinePage from "./components/RoutinePage";
axios.defaults.baseURL = "http://localhost:5000";


/* ---------------- DEFAULT TASKS ---------------- */
const defaultTasks = [
  { name: "Wake Up 🌅", time: "morning" },
  { name: "Brush Teeth 🪥", time: "morning" },
  { name: "Wash Face 🧼", time: "morning" },
  { name: "Comb Hair 💇‍♂️", time: "morning" },
  { name: "Get Dressed 👕", time: "morning" },
  { name: "Put on Shoes 👟", time: "morning" },
  { name: "Make Bed 🛏️", time: "morning" },
  { name: "Eat Breakfast 🍳", time: "morning" },
  { name: "Do Homework ✏️", time: "afternoon" },
  { name: "Art & Drawing 🎨", time: "afternoon" },
  { name: "Music Time 🎵", time: "afternoon" },
  { name: "Eat Dinner 🍽️", time: "evening" },
  { name: "Take Shower 🛁", time: "evening" },
  { name: "Bedtime 🌙", time: "evening" },
];

/* ---------------- MAIN APP ---------------- */
export default function App() {
  const history = useHistory();

  const [loggedIn, setLoggedIn] = useState(false);
  const [stars, setStars] = useState(0);

  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskTime, setTaskTime] = useState("morning");

  const [profile, setProfile] = useState({
    childName: "",
    age: "",
    favColor: "",
    favCartoon: "",
  });

  /* ---------- LOAD DATA ---------- */
  useEffect(() => {
    axios
      .get("/profile")
      .then((res) => {
        if (res.data && res.data.childName) {
          setProfile(res.data);
          setLoggedIn(true);
        }
      })
      .catch(() => console.log("No profile yet"));

    axios
      .get("/tasks")
      .then((res) => {
        if (res.data.length > 0) {
          setTasks(res.data);
          setStars(res.data.filter((t) => t.done).length);
        } else {
          setTasks(defaultTasks.map((t) => ({ ...t, done: false })));
        }
      })
      .catch(() => {
        setTasks(defaultTasks.map((t) => ({ ...t, done: false })));
      });
  }, []);

  /* ---------- SAVE TASKS ---------- */
  useEffect(() => {
    if (tasks.length > 0) {
      axios.post("/tasks", tasks).catch(() => console.log("Save failed"));
    }
  }, [tasks]);

  /* ---------- TASK FUNCTIONS ---------- */
  const addTask = () => {
    if (!taskName.trim()) return;
    setTasks([...tasks, { name: taskName, time: taskTime, done: false }]);
    setTaskName("");
  };

  const completeTask = (i) => {
    const updated = [...tasks];
    updated[i].done = !updated[i].done;
    setTasks(updated);
    setStars(updated.filter((t) => t.done).length);
  };

  const deleteTask = (i) => {
    const updated = tasks.filter((_, index) => index !== i);
    setTasks(updated);
    setStars(updated.filter((t) => t.done).length);
  };

  /* ---------------- LOGIN SCREEN ---------------- */
  if (!loggedIn) {
    return (
      <div className="login">
        <h1>🌈 Visual Schedule Trainer</h1>

        <input
          placeholder="Your Name"
          value={profile.childName}
          onChange={(e) => setProfile({ ...profile, childName: e.target.value })}
        />
        <input
          placeholder="Age"
          value={profile.age}
          onChange={(e) => setProfile({ ...profile, age: e.target.value })}
        />
        <input
          placeholder="Favorite Color"
          value={profile.favColor}
          onChange={(e) => setProfile({ ...profile, favColor: e.target.value })}
        />
        <input
          placeholder="Favorite Cartoon"
          value={profile.favCartoon}
          onChange={(e) => setProfile({ ...profile, favCartoon: e.target.value })}
        />

        <button
          onClick={() => {
            const { childName, age, favColor, favCartoon } = profile;
            if (!childName || !age || !favColor || !favCartoon) {
              alert("Fill all details");
              return;
            }

            axios.post("/profile", profile).then(() => {
              setLoggedIn(true);
              history.push("/");
            });
          }}
        >
          Start My Day 🌟
        </button>
      </div>
    );
  }

  /* ---------------- MAIN UI ---------------- */
  return (
    <>
      <nav className="menu-bar">
        <div className="menu-left">
          <Link className="dashboard-button" to="/">
            🏠 Dashboard
          </Link>
          <Link className="menu-btn" to="/profile">
            Profile
          </Link>
          <Link className="menu-btn" to="/rewards">
            Rewards
          </Link>
          <Link className="menu-btn" to="/routine">
            Routine
          </Link>
        </div>
        <div className="menu-right">
          ⭐ {stars}
          <button className="logout-btn" onClick={() => setLoggedIn(false)}>
            Logout
          </button>
        </div>
      </nav>

      <Switch>
        <Route exact path="/">
          <Dashboard
            tasks={tasks}
            addTask={addTask}
            taskName={taskName}
            setTaskName={setTaskName}
            taskTime={taskTime}
            setTaskTime={setTaskTime}
            completeTask={completeTask}
            deleteTask={deleteTask}
            childName={profile.childName}
            stars={stars}
          />
        </Route>

        <Route path="/profile">
          <ProfilePage profile={profile} setProfile={setProfile} />
        </Route>

        <Route path="/rewards">
          <RewardsPage stars={stars} favCartoon={profile.favCartoon} />
        </Route>

        <Route path="/routine">
          <RoutinePage tasks={tasks} setTasks={setTasks} />
        </Route>
      </Switch>
    </>
  );
}

/* ---------------- DASHBOARD ---------------- */
function Dashboard({
  tasks,
  taskName,
  setTaskName,
  taskTime,
  setTaskTime,
  addTask,
  completeTask,
  deleteTask,
  childName,
  stars,
}) {
  const pending = tasks.filter((t) => !t.done);
  const completed = tasks.filter((t) => t.done);

  return (
    <div className="container">
      <h1>
        {childName}'s Schedule ⭐ {stars}
      </h1>

      <div className="add-task-global">
        <select
          value={taskName}
          onChange={(e) => {
            const selected = defaultTasks.find((t) => t.name === e.target.value);
            setTaskName(e.target.value);
            if (selected) setTaskTime(selected.time);
          }}
        >
          <option value="">Choose Task</option>
          {defaultTasks.map((t, i) => (
            <option key={i} value={t.name}>
              {t.name}
            </option>
          ))}
        </select>

        <select value={taskTime} onChange={(e) => setTaskTime(e.target.value)}>
          <option value="morning">Morning 🌅</option>
          <option value="afternoon">Afternoon ☀️</option>
          <option value="evening">Evening 🌙</option>
        </select>

        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="task-columns">
        <div className="task-section">
          <h2>📝 To Do</h2>
          {pending.map((t, i) => (
            <div className="task" key={i}>
              <input type="checkbox" checked={false} onChange={() => completeTask(tasks.indexOf(t))} />
              {t.name}
              <button className="delete-task-btn" onClick={() => deleteTask(tasks.indexOf(t))}>
                🗑
              </button>
            </div>
          ))}
        </div>

        <div className="task-section">
          <h2>✅ Done</h2>
          {completed.map((t, i) => (
            <div className="task done" key={i}>
              <input type="checkbox" checked={true} onChange={() => completeTask(tasks.indexOf(t))} />
              {t.name}
              <button className="delete-task-btn" onClick={() => deleteTask(tasks.indexOf(t))}>
                🗑
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
