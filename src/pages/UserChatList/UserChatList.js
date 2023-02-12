import React, { useContext, useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../Firebase';
import './UserChatList.scss';
import { ChatContext } from '../../context/ChatContext';

function UserChatList() {
  const [chats, setChats] = useState([]);
  const [chatListUid, setChatListUid] = useState({});

  const { getSenderId, currentUserUid } = useContext(ChatContext);

  // 현재 로그인한 사용자의 채팅목록 get
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUserUid), doc => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUserUid && getChats();
  }, [currentUserUid]);

  // 클릭된 값의 id 전달 함수
  useEffect(() => {
    const sendID = chatListUid => {
      getSenderId(chatListUid);
    };

    return () => {
      sendID();
    };
  }, [chatListUid, getSenderId]);

  return (
    <div className='userChatList'>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat, key) => (
          <div
            className='chatUser'
            key={key}
            onClick={e => setChatListUid(chat[1]?.userInfo)}
            value={chatListUid}
          >
            <div className='time'>
              <p>{chat[1]?.userInfo?.date}</p>
            </div>
            <div className='chatInfoWrapper'>
              <div className='imgFrame'>
                <img
                  className='userImg'
                  src={
                    chat[1]?.userInfo?.photoURL !== undefined
                      ? chat[1]?.userInfo?.photoURL
                      : 'images/userimg.png'
                  }
                  alt='userImg'
                />
              </div>
              <p className='userName'>
                {chat[1]?.userInfo?.displayName !== undefined
                  ? chat[1]?.userInfo?.displayName
                  : '익명 사용자'}
              </p>
              <p className='latestMessage'>
                {chat[1]?.userInfo?.lastMessage !== undefined
                  ? chat[1]?.userInfo?.lastMessage
                  : '탭하고 확인하기...'}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default UserChatList;
