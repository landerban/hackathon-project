import { useEffect, useState } from "react";
import axios from "axios";
import '../css/User.css'; // Import CSS for styling

export const User = () => {
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [lastPixelTime, setLastPixelTime] = useState('');
  const [userId, setUserId] = useState('');
  const [pixelsCount, setPixelsCount] = useState('');

  useEffect(() => {
    if (localStorage.getItem('access_token') === null) {
      setMessage("You Are Not Logged In. Please Log In.");
    } else {
      (async () => {
        try {
          const { data } = await axios.get(
            'http://localhost:8000/auth/user/',
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
              }
            }
          );

          setUsername(data.username);
          setLastPixelTime(data.last_pixel_time);
          setUserId(data.id);
          setPixelsCount(data.pixels_count);
          setMessage(''); // Clear any previous error message
        } catch (e) {
          setMessage('You are not logged in. Please log in.');
        }
      })();
    }
  }, []);

  return (
    <div className="user-profile-container">
      <h3>User Profile</h3>
      <div className="profile-card">
        {message ? (
          <p className="profile-message">{message}</p>
        ) : (
          <div>
            <p><strong>Username:</strong> {username}</p>
            <p><strong>Last Pixel Time:</strong> {lastPixelTime}</p>
            <p><strong>User ID:</strong> {userId}</p>
            <p><strong>Pixels Count:</strong> {pixelsCount}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
