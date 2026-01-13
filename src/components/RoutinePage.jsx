// src/components/RoutinePage.jsx
import React from "react";

export default function RoutinePage({ tasks, setTasks }) {
  const times = ["morning", "afternoon", "evening"];

  const assignTime = (index, time) => {
    const updated = [...tasks];
    updated[index].time = time;
    setTasks(updated);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🗓 Daily Routine</h2>
      {times.map(time => (
        <div key={time}>
          <h3>{time.charAt(0).toUpperCase() + time.slice(1)}</h3>
          <ul>
            {tasks.filter(t => t.time === time).map((task, i) => (
              <li key={i}>{task.name}</li>
            ))}
          </ul>
        </div>
      ))}
      <p>To assign a time slot, edit tasks in the Dashboard.</p>
    </div>
  );
}
