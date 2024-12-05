import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const Profile = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      {user ? (
        <div>
          <h1>{user.name}'s Profile</h1>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
