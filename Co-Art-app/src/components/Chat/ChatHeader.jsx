import React from "react";
import "../../css/Chat/ChatHeader.css";

function ChatHeader({ isDark }) {
  return (
    <div className={`${isDark ? "dark" : ""}header d-flex justify-content-between align-items-center p-3 `}>
      <div className="user-info d-flex align-items-center">
        <div className="user-avatar rounded-circle bg-secondary me-3"></div>
        <div>
          <div className="user-name fw-bold">User name</div>
          <div className="user-status text-muted">Last seen time / online</div>
        </div>
      </div>
      <div className="menu-icon fs-4">☰</div>
    </div>
  );
}

export default ChatHeader;
