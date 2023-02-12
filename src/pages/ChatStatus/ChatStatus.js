import React, { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import ChatInput from '../ChatInput/ChatInput';
import Messages from '../Messages/Messages';
import './ChatStatus.scss';

function ChatStatus() {
  const { userDisplayName } = useContext(ChatContext);

  return (
    <div className='chatStatus'>
      <div className='chatInfo'>
        <span>{userDisplayName}</span>
      </div>
      <Messages />
      <ChatInput />
    </div>
  );
}

export default ChatStatus;
