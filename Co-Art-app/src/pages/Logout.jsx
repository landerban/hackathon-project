import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Function to handle the logout process
    const logoutUser = async () => {
      try {
        await axios.post(
          'http://localhost:8000/auth/logout/',
          { refresh_token: localStorage.getItem('refresh_token') },
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );

        // Clear tokens and update authentication state
        localStorage.clear();
        console.log("DBEEFE");

        // Set isAuthenticated to false to reflect logged-out state
        setIsAuthenticated(false);

        // Redirect to the login page after successful logout
        navigate('/');
      }catch (error) {
        console.error('Logout failed:', error);
      }
    };

    // Call the logout function
    logoutUser();
  }, []); // Dependencies ensure this effect runs only once

  return <div>Logging out...</div>; // Optional: Provide feedback while logging out
};

export default Logout;
