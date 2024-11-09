import React from "react";
import "../css/Chat/ChatArea.css";

function ChatArea({ isDark }) {
  const messages = [
    { id: 1, sender: "User", text: "Hello, how are you?" },
    { id: 2, sender: "Friend", text: "I'm good, thanks! How about you?" },
    { id: 3, sender: "User", text: "just working on a project. Will join the drawing later" },
    { id: 4, sender: "Friend", text: "I am filling out the moutain" },
    { id: 5, sender: "Friend", text: "Really ? I thought it was a tree" },
    { id: 6, sender: "Friend", text: "Same Same" },

    
    // Add more messages as needed
  ];

  return (
    <div className={`${isDark ? "dark" : ""} chat-area p-3`}>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`message mb-2 p-2 rounded ${
            message.sender === "User" ? "sent  ms-auto" : "received me-auto"
          }`}
        >
          <div className="message-text">{message.text}</div>
        </div>
      ))}
    </div>
  );
}

export default ChatArea;
