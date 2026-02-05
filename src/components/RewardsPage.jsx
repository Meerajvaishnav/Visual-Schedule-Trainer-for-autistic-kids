import React from "react";
import "./RewardsPage.css"; // Make sure to create this file or update it

export default function RewardsPage({ stars, favCartoon }) {
  const badges = [
    { name: "Bronze", minStars: 3, color: "#cd7f32" },
    { name: "Silver", minStars: 5, color: "#c0c0c0" },
    { name: "Gold", minStars: 8, color: "#ffd700" },
  ];

  return (
    <div className="rewards-page">
      {/* Big cute congratulatory message */}
      <div className="congrats-message">
        <h1>🎉 Yay, {favCartoon} says Congratulations! 🎉</h1>
        <p>You're doing amazing! Keep earning those stars! 🌟</p>
      </div>

      {/* Badge display */}
      <div className="badge-container">
        {badges.map(
          (b, idx) =>
            stars >= b.minStars && (
              <div
                key={idx}
                className="badge"
                style={{ background: `radial-gradient(circle at top left, ${b.color}, #fff)` }}
              >
                {b.name}🏅
              </div>
            )
        )}
      </div>

      <p className="total-stars">Total Stars: {stars} ⭐</p>
    </div>
  );
}
