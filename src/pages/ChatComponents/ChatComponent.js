import React from 'react';
import Search from '../Search/Search';
import UserChatList from '../UserChatList/UserChatList';
import ChatStatus from '../ChatStatus/ChatStatus';
import ChatUserBar from '../ChatUserBar/ChatUserBar';
import './ChatComponent.scss';

function ChatComponent() {
  return (
    <div className='chatComponent'>
      <div className='chatContainer'>
        <aside className='chatLeftMenu'>
          <div className='chatListTop'>
            <ChatUserBar />
          </div>
          <div className='chatListWrapper'>
            <Search />
            <UserChatList />
          </div>
        </aside>
        <div className='chatRoom'>
          <ChatStatus />
        </div>
      </div>
    </div>
  );
}

export default ChatComponent;
