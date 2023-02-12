import React, { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';

import './Messages.scss';

function Messages() {
  const { matchedMessages, senderInfo, userDisplayName } =
    useContext(ChatContext);
  const senderUid = senderInfo.uid;
  const senderProfile = senderInfo.photoURL;

  const chats = matchedMessages?.messages;

  return (
    <div className='messages'>
      {chats !== undefined &&
        chats.map((chat, key) => {
          return (
            <div className='sender' key={key}>
              <div className='userProfile'>
                <img
                  className='profile'
                  src={chat?.senderId === senderUid && senderProfile}
                  alt='profile'
                />
                <p className='id'>
                  {chat?.senderId === senderUid && userDisplayName}
                </p>
              </div>
              <div className='ctxContainer'>
                {chat?.text !== '' ? (
                  <p className='text nullText'>{chat?.text} </p>
                ) : (
                  <p className='nullText '></p>
                )}
                <img className='attached' src={chat?.img} alt='' />
              </div>
            </div>
          );
        })}

      {/* <div className='sender'>
        <div className='userProfile'>
          <img
            className='profile'
            src='/images/plant-pink-cover.jpg'
            alt='profile'
          />
          <p className='id'>ID </p>
        </div>
        <div className='ctxContainer'>
          <p className='text'> HI </p>
          <img className='attached' src='/images/plant-pink-cover.jpg' alt='' />
        </div>
      </div>
      <div className='owner'>
        <div className='userProfile'>
          <img
            className='profile'
            src='/images/plant-pink-cover.jpg'
            alt='profile'
          />
          <p className='id'>ID </p>
        </div>
        <div className='ctxContainer'>
          <p className='text'> HI </p>
          <img className='attached' src='/images/plant-pink-cover.jpg' alt='' />
        </div>
      </div> */}
    </div>
  );
}

export default Messages;
