import React from 'react';

const Profile = ({ profile }) => (
  <div className="profile">
    <h1>{profile.name}</h1>
    <img src={profile.picture.data.url} alt="Profile" />
  </div>
);

export default Profile;
