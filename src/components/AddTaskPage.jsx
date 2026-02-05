import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import "./AddTaskPage.css";
import TaskPreviewCard from "./TaskPreviewCard";

export default function AddTaskPage({ tasks, setTasks, profile, syncToBackend }) {
    const history = useHistory();
    const [taskName, setTaskName] = useState("");
    const [timeSlot, setTimeSlot] = useState("morning");
    const [icon, setIcon] = useState("🍽️");

    const icons = ["🍽️", "🪥", "📚", "🎒", "睡"];

    const handleAddTask = () => {
        if (!taskName.trim()) {
            alert("Please enter a task name");
            return;
        }

        const newTask = {
            name: `${taskName} ${icon}`,
            time: timeSlot,
            done: false,
        };

        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        syncToBackend(profile, updatedTasks, tasks.filter(t => t.done).length);

        alert("Task added successfully! ✨");
        history.push("/");
    };

    return (
        <div className="add-task-page">
            <div className="add-task-card">
                <h2>➕ Add New Routine Task</h2>

                <div className="form-group">
                    <label>Task Name</label>
                    <input
                        type="text"
                        placeholder="e.g. Read a book"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Time Slot</label>
                    <div className="radio-group">
                        <label className={`radio-label ${timeSlot === 'morning' ? 'active' : ''}`}>
                            <input
                                type="radio"
                                name="timeSlot"
                                value="morning"
                                checked={timeSlot === "morning"}
                                onChange={(e) => setTimeSlot(e.target.value)}
                            />
                            🌅 Morning
                        </label>
                        <label className={`radio-label ${timeSlot === 'afternoon' ? 'active' : ''}`}>
                            <input
                                type="radio"
                                name="timeSlot"
                                value="afternoon"
                                checked={timeSlot === "afternoon"}
                                onChange={(e) => setTimeSlot(e.target.value)}
                            />
                            ☀️ Afternoon
                        </label>
                        <label className={`radio-label ${timeSlot === 'evening' ? 'active' : ''}`}>
                            <input
                                type="radio"
                                name="timeSlot"
                                value="evening"
                                checked={timeSlot === "evening"}
                                onChange={(e) => setTimeSlot(e.target.value)}
                            />
                            🌙 Evening
                        </label>
                    </div>
                </div>

                <div className="form-group">
                    <label>Task Icon</label>
                    <select value={icon} onChange={(e) => setIcon(e.target.value)}>
                        {icons.map((emoji) => (
                            <option key={emoji} value={emoji}>
                                {emoji}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="button-group">
                    <button className="cancel-btn" onClick={() => history.push("/")}>
                        Cancel
                    </button>
                    <button className="save-btn" onClick={handleAddTask}>
                        Add Task ✨
                    </button>
                </div>

                <div className="preview-section">
                    <TaskPreviewCard
                        taskName={taskName}
                        timeSlot={timeSlot.charAt(0).toUpperCase() + timeSlot.slice(1)}
                        icon={icon}
                    />
                </div>
            </div>
        </div>
    );
}
