import React from "react";
import "../css/Chat/ChatInput.css";

function ChatInput() {
  return (
    <div className="chat-input d-flex align-items-center p-3 bg-light">
      <input
        type="text"
        className="form-control me-3"
        placeholder="Type a message"
      />
      <div className="icons d-flex gap-3">
        <span className="attachment-icon fs-4">📎</span>
        <span className="camera-icon fs-4">📷</span>
      </div>
    </div>
  );
}

export default ChatInput;
