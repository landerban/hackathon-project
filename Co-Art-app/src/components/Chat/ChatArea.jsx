import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/Chat/ChatArea.css";

function ChatArea({ isDark }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const todayDate = getTodayDate();
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/chat/2024-11-09`
        );
        if (Array.isArray(response.data)) {
          setMessages(response.data);
        } else {
          console.error("Data is not an array:", response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setError("Error fetching messages");
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={`${isDark ? "dark" : ""} chat-area p-3`}>
      {messages.length > 0 ? (
        messages.map((message, index) => (
          <div
            key={index}
            className={`message mb-2 p-2 rounded ${
              message.author_name === "User"
                ? "sent ms-auto"
                : "received me-auto"
            }`}
          >
            <div className="message-text">{message.message}</div>
          </div>
        ))
      ) : (
        <div>No messages</div>
      )}
    </div>
  );
}

export default ChatArea;
