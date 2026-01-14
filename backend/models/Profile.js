import React from "react";
import axios from "axios";

export default function ProfilePage({ profile, setProfile }) {
  const saveProfile = () => {
    axios.post("http://localhost:5000/profile", profile).then(() => alert("Profile saved!"));
  };

  return (
    <div className="profile-page">
      <input
        value={profile.childName}
        onChange={(e) => setProfile({ ...profile, childName: e.target.value })}
        placeholder="Child Name"
      />
      <input
        value={profile.age}
        onChange={(e) => setProfile({ ...profile, age: e.target.value })}
        placeholder="Age"
      />
      <input
        value={profile.favColor}
        onChange={(e) => setProfile({ ...profile, favColor: e.target.value })}
        placeholder="Favorite Color"
      />
      <input
        value={profile.favCartoon}
        onChange={(e) => setProfile({ ...profile, favCartoon: e.target.value })}
        placeholder="Favorite Cartoon"
      />
      <button onClick={saveProfile}>Save Profile</button>
    </div>
  );
}
