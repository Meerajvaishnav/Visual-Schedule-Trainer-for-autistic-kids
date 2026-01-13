// src/components/ProfilePage.jsx
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
    <div style={{ padding: "20px" }}>
      <h2>Profile Settings</h2>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input type="number" value={newAge} onChange={e => setNewAge(e.target.value)} placeholder="Age" />
      <input value={color} onChange={e => setColor(e.target.value)} placeholder="Favourite Color" />
      <input value={cartoon} onChange={e => setCartoon(e.target.value)} placeholder="Favourite Cartoon" />
      <button onClick={saveProfile}>Save</button>
    </div>
  );
}
