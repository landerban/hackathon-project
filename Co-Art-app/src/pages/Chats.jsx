import React from 'react';
import Split from 'react-split';
import ChatSidebar from '../components/Chat/ChatSidebar';
import ChatArea from '../components/Chat/ChatArea';
import ChatHeader from '../components/Chat/ChatHeader';
import ChatInput from '../components/Chat/ChatInput';
import '../css/Chats.css';

const Chats = ({isDark}) => {
  return (
    <Split
      className="split-container"
      sizes={[30, 70]} // Initial sizes: 30% for sidebar, 70% for main chat
      minSize={200}    // Minimum width of each pane
      expandToMin={false}
      gutterSize={10}  // Width of the gutter/drag handle
      gutterAlign="center"
      snapOffset={0}
      dragInterval={1}
      direction="horizontal" // Horizontal split
      cursor="col-resize"
    >
      <div className="sidebar p-0">
        <ChatSidebar isDark={isDark}/>
      </div>
      <div className="main-chat d-flex flex-column p-0">
        <ChatHeader isDark={isDark}/>
        <ChatArea isDark={isDark}/>
        <ChatInput isDark={isDark}/>
      </div>
    </Split>
  );
};

export default Chats;
