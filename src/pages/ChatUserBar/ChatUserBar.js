import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function ChatUserBar() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className='chatUser'>
      <span className='userName'>{currentUser?.displayName}</span>
      <img src={currentUser?.photoURL} alt='user img' />
    </div>
  );
}

export default ChatUserBar;
