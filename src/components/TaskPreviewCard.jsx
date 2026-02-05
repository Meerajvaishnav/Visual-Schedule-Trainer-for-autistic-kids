import React, { Component } from "react";

class TaskPreviewCard extends Component {
  render() {
    const { taskName, timeSlot, icon } = this.props;

    if (!taskName) {
      return (
        <div className="preview-card empty">
          ✏️ Start typing to preview your task
        </div>
      );
    }

    return (
      <div className="preview-card">
        <h4>👀 Task Preview</h4>
        <p><strong>Task:</strong> {taskName} {icon}</p>
        <p><strong>Time:</strong> {timeSlot}</p>
      </div>
    );
  }
}

export default TaskPreviewCard;
