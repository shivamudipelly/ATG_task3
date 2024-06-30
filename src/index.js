import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import './app.css';

const apiUrl = 'https://602e7c2c4410730017c50b9d.mockapi.io/users';

const LoaderAnimation = (props) => {
  return (
    <section style={{ width: props.width }}>
      <span className="loader-123"></span>
    </section>
  );
};

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  console.log(selectedUser);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(apiUrl);
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users. Please try again later.');
      } finally {
        setTimeout(() => setLoading(false), 2000); // Set loading to false after 2 seconds
      }
    };
    fetchUsers();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser({ ...user, imageError: false });
  };

  const handleImageLoad = (e) => {
    e.target.nextSibling.style.display = 'none'; // Hide Font Awesome user icon
    e.target.style.display = 'block'; // Show the original image
  };

  const handleImageError = (e) => {
    e.target.style.display = 'none'; // Hide the original image
    e.target.nextSibling.style.display = 'flex'; // Show Font Awesome user icon
  };

  if (loading) {
    return (
      <div className="container">
        <div className="sidebar">
          <LoaderAnimation />
          <LoaderAnimation />
          <LoaderAnimation />
          <LoaderAnimation />
        </div>
        <div className="details">
          <LoaderAnimation width="400px" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <div>{error}</div>
      </div>
    );
  }

  return (
     <div className="container">
      <div className="sidebar">
        <ul className="user-list">
          {users.length > 0 ? (
            users.map((user) => (
              <li key={user.createdAt} className="user-list-item" onClick={() => handleUserClick(user)}>
                <div className="avatar-container">
                  <img
                    src={user.avatar}
                    alt={user.profile?.firstName || 'User'}
                    className="avatar"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                  />
                  <i className="fas fa-user center"></i>
                </div>
                <span className="text">{`${user.profile?.firstName || 'No Name'} ${user.profile?.lastName || ''}`}</span>
              </li>
            ))
          ) : (
            <div className="center">No data to show</div>
          )}
        </ul>
      </div>
      <div className="details">
        {selectedUser ? (
          <div className="details-content">
            <div className="avatar-container-big">
              <img
                src={selectedUser.avatar}
                alt={selectedUser.profile?.firstName || 'User'}
                className="large-avatar"
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
              <i className="fas fa-user center "></i>
            </div>
            <div className="details-text">
              {selectedUser.profile?.firstName && <div className="info"><strong>Name:</strong> {selectedUser.profile.firstName} {selectedUser.profile.lastName}</div>}
              {selectedUser.profile?.email && <div className="info"><strong>Email:</strong> {selectedUser.profile.email}</div>}
              {selectedUser.profile?.username && <div className="info"><strong>Username:</strong> {selectedUser.profile.username}</div>}
              {selectedUser.jobTitle && <div className="info"><strong>Job:</strong> {selectedUser.jobTitle}</div>}
              {selectedUser.Bio && <div className="info"><strong>Bio:</strong> {selectedUser.Bio}</div>}

            </div>
          </div>
        ) : (
          <h1>Select a user to see details</h1>
        )}
      </div>
    </div>
  )
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
