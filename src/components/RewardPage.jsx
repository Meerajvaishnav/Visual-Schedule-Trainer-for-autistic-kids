// src/components/RewardsPage.jsx
import React from "react";

export default function RewardsPage({ stars }) {
  const badges = [
    { name: "Bronze", minStars: 3 },
    { name: "Silver", minStars: 5 },
    { name: "Gold", minStars: 8 },
  ];

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>🎁 Rewards</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
        {badges.map((b, idx) => (
          stars >= b.minStars ? (
            <div key={idx} className="badge">
              {b.name} Badge 🏅
            </div>
          ) : null
        ))}
      </div>
      <p>Total Stars: {stars}</p>
    </div>
  );
}
