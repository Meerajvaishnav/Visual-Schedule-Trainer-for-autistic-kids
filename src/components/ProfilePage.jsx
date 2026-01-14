import React from "react";

export default function ProfilePage({ childName, age, favColor, favCartoon, setProfile }) {
  const [name, setName] = React.useState(childName);
  const [newAge, setNewAge] = React.useState(age);
  const [color, setColor] = React.useState(favColor);
  const [cartoon, setCartoon] = React.useState(favCartoon);

  const saveProfile = () => {
    setProfile({ childName: name, age: newAge, favColor: color, favCartoon: cartoon });
    alert("Profile Updated!");
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
    padding: "30px 20px",
    maxWidth: "400px",
    margin: "20px auto",
    borderRadius: "20px",
    background: "linear-gradient(135deg, #a1c4fd, #c2e9fb)", // soft fun gradient
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    textAlign: "center",
    fontFamily: "'Comic Sans MS', cursive, sans-serif",
  },
  header: {
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#ff6f61",
    textShadow: "1px 1px #fff",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "25px",
  },
  input: {
    padding: "12px 15px",
    borderRadius: "12px",
    border: "2px solid #ccc",
    fontSize: "16px",
    outline: "none",
    transition: "border 0.3s, box-shadow 0.3s",
  },
  button: {
    padding: "12px 25px",
    fontSize: "18px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #ffb347, #ffcc33)",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
};

