import React from "react";
import "../../css/Chat/ChatSidebar.css";

function ChatSidebar({ isDark }) {
  // Sample data array
  const messages = [
    { name: "Egg", text: "Hello there!" },
    { name: "Chicken", text: "What's up?" },
    { name: "Duck", text: "How are you?" },
    { name: "Swan", text: "Long time no see!" },
    { name: "Owl", text: "Good evening!" },
    { name: "Hawk", text: "Ready for the meeting?" },
    { name: "Parrot", text: "Call me back." },
    { name: "Penguin", text: "Happy weekend!" }
  ];

  return (
    <div className={`${isDark ? "dark" : ""} sidebar p-3`}>
      {messages.map((msg, i) => (
        <div className="message-preview d-flex align-items-center mb-3 p-2 rounded" key={i}>
          <div className="avatar rounded-circle bg-secondary me-3"></div>
          <div className="name me-2">{msg.name}:</div>
          <div className="text-preview">{msg.text}</div>
        </div>
      ))}
    </div>
  );
}

export default ChatSidebar;
