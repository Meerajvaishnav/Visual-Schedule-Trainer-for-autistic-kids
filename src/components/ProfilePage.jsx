import React from "react";

export default function ProfilePage({ profile, setProfile }) {
  const [name, setName] = React.useState(profile.childName);
  const [newAge, setNewAge] = React.useState(profile.age);
  const [color, setColor] = React.useState(profile.favColor);
  const [cartoon, setCartoon] = React.useState(profile.favCartoon);

  // Sync local state when profile prop changes (Auto-fill)
  React.useEffect(() => {
    setName(profile.childName || "");
    setNewAge(profile.age || "");
    setColor(profile.favColor || "");
    setCartoon(profile.favCartoon || "");
  }, [profile]);

  const saveProfile = async () => {
    const updatedProfile = {
      ...profile,
      childName: name,
      age: newAge,
      favColor: color,
      favCartoon: cartoon
    };

    setProfile(updatedProfile);
    localStorage.setItem("profile", JSON.stringify(updatedProfile));

    if (profile._id) {
      try {
        const res = await fetch(`/api/profiles/${profile._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedProfile),
        });
        if (res.ok) {
          alert("Profile Updated & Synced to Cloud! ✨");
        } else {
          alert("Profile updated locally, but failed to sync.");
        }
      } catch (err) {
        console.error("Sync error:", err);
        alert("Profile updated locally, but backend error occurred.");
      }
    } else {
      alert("Profile Updated! (local only)");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Profile Settings</h2>

      <div style={styles.inputGroup}>
        <input
          style={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          style={styles.input}
          type="number"
          value={newAge}
          onChange={(e) => setNewAge(e.target.value)}
          placeholder="Age"
        />
        <input
          style={styles.input}
          value={color}
          onChange={(e) => setColor(e.target.value)}
          placeholder="Favourite Color"
        />
        <input
          style={styles.input}
          value={cartoon}
          onChange={(e) => setCartoon(e.target.value)}
          placeholder="Favourite Cartoon Character"
        />
      </div>

      <button style={styles.button} onClick={saveProfile}>
        💾 Save Profile
      </button>
    </div>
  );
}

// ---------- Inline CSS ----------
const styles = {
  container: {
    padding: "40px 30px",
    maxWidth: "500px",
    margin: "40px auto",
    borderRadius: "var(--border-radius-lg)",
    background: "var(--card-bg)",
    boxShadow: "var(--shadow-lg)",
    textAlign: "center",
    fontFamily: "var(--font-family)",
    border: "1px solid rgba(255, 255, 255, 0.5)",
  },
  header: {
    fontSize: "2.2rem",
    marginBottom: "30px",
    color: "var(--accent-color)",
    fontWeight: "700",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "30px",
  },
  input: {
    padding: "14px 20px",
    borderRadius: "var(--border-radius-md)",
    border: "2px solid #edeff2",
    fontSize: "16px",
    fontFamily: "inherit",
    outline: "none",
    transition: "all 0.3s ease",
    background: "white",
  },
  button: {
    padding: "16px 30px",
    fontSize: "1.1rem",
    borderRadius: "var(--border-radius-md)",
    border: "none",
    background: "linear-gradient(135deg, #ffb347, #ffcc33)",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    boxShadow: "0 10px 20px rgba(255, 179, 71, 0.2)",
  },
};

