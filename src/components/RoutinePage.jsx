import React from "react";
import "./RoutinePage.css";

export default function RoutinePage({ tasks }) {
  const times = ["morning", "afternoon", "evening"];

  return (
    <div className="routine-page">
      <h2>🗓 Daily Routine</h2>
      {times.map((time) => (
        <div key={time} className="time-section">
          <h3>{time.charAt(0).toUpperCase() + time.slice(1)}</h3>
          <ul>
            {tasks
              .filter((t) => t.time === time)
              .map((task, i) => (
                <li key={i}>
                  <input type="checkbox" checked={task.done} readOnly /> {task.name}
                </li>
              ))}
          </ul>
        </div>
      ))}
      <p>✨ To assign a time slot, edit tasks in the Dashboard.</p>
    </div>
  );
}
