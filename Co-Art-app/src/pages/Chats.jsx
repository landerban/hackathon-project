import React from 'react';
import Split from 'react-split';
import ChatArea2 from '../components/ChatArea2';
import ChatInput2 from '../components/ChatInput2';
import '../css/Chats.css';

const Chats = ({isDark}) => {
  return (
      <div className="main-chat d-flex flex-column p-0">
        <ChatArea2 isDark={isDark}/>
        <ChatInput2 isDark={isDark}/>
      </div>
  );
};

export default Chats;
