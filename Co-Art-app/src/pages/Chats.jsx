import React from 'react';
import Split from 'react-split';
import ChatArea from '../components/Chat/ChatArea';
import ChatInput from '../components/Chat/ChatInput';
import '../css/Chats.css';

const Chats = ({isDark}) => {
  return (
      <div className="main-chat d-flex flex-column p-0">
        <ChatArea isDark={isDark}/>
        <ChatInput isDark={isDark}/>
      </div>
  );
};

export default Chats;
