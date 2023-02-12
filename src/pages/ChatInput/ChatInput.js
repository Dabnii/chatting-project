import React, { useContext, useState } from 'react';
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { ChatContext } from '../../context/ChatContext';
import { db, storage } from '../Firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import './ChatInput.scss';

function ChatInput() {
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);
  const [displayImg, setDisplayImg] = useState(null);

  const { combinedId, currentUserUid, userUid, senderInfo } =
    useContext(ChatContext);

  console.log(currentUserUid);
  console.log(senderInfo);
  console.log(userUid?.uid === userUid);

  const handleText = e => {
    setText(e.target.value);
  };

  const handleImg = e => {
    setImg(e.target.files[0]);
    setDisplayImg(URL.createObjectURL(e.target.files[0]));
  };
  const handleSend = async () => {
    try {
      if (img) {
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, img);
        uploadTask.on(
          error => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
              await updateDoc(doc(db, 'chats', combinedId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUserUid,
                  date: Timestamp.now(),
                  img: downloadURL,
                }),
              });
            });
          }
        );
        console.log('1️⃣');
      } else {
        await updateDoc(doc(db, 'chats', combinedId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUserUid,
            date: Timestamp.now(),
          }),
        });
      }
      console.log('2️⃣');

      await updateDoc(doc(db, 'userChats', currentUserUid), {
        [userUid + '.lastMessage']: {
          text,
        },
        [userUid + '.date']: serverTimestamp(),
      });
      console.log('3️⃣');

      await updateDoc(doc(db, 'userChats', userUid), {
        [userUid + '.lastMessage']: {
          text,
        },
        [userUid + '.date']: serverTimestamp(),
      });
      console.log('4️⃣');
    } catch (error) {
      console.log('Error:', error);
    } finally {
      return () => {
        setText('');
        setImg(null);
        handleSend();
        console.log('done!');
      };
    }
  };

  // const handleSend = async () => {
  //   if (img) {
  //     const storageRef = ref(storage, uuid());
  //     const uploadTask = uploadBytesResumable(storageRef, img);
  //     uploadTask.on(
  //       error => {
  //         console.log(error);
  //       },
  //       () => {
  //         getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
  //           await updateDoc(doc(db, 'chats', combinedId), {
  //             messages: arrayUnion({
  //               id: uuid(),
  //               text,
  //               senderId: currentUserUid,
  //               date: Timestamp.now(),
  //               img: downloadURL,
  //             }),
  //           });
  //         });
  //       }
  //     );
  //   } else {
  //     await updateDoc(doc(db, 'chats', combinedId), {
  //       messages: arrayUnion({
  //         id: uuid(),
  //         text,
  //         senderId: currentUserUid,
  //         date: Timestamp.now(),
  //       }),
  //     });
  //   }

  //   await updateDoc(doc(db, 'userChats', currentUserUid), {
  //     [data.chatId + '.lastMessage']: {
  //       text,
  //     },
  //     [data.chatId + '.date']: serverTimestamp(),
  //   });

  //   await updateDoc(doc(db, 'userChats', data.user.uid), {
  //     [data.chatId + '.lastMessage']: {
  //       text,
  //     },
  //     [data.chatId + '.date']: serverTimestamp(),
  //   });

  //   setText('');
  //   setImg(null);
  // };

  return (
    <div className='chatInput'>
      {img && (
        <div className={`preview ${img == null && 'none'}`}>
          <img src={displayImg} alt='preview' />
          <button className='submitBtn' onClick={handleSend}>
            ↑
          </button>
        </div>
      )}
      <div className='sendMenu'>
        <input
          type='text'
          className='chatBox'
          onChange={handleText}
          value={text}
        ></input>
        <label htmlFor='file'>📎</label>
        <input
          className='fileInput'
          type='file'
          id='file'
          onChange={handleImg}
        ></input>
        <button className='sendMessage' onClick={handleSend}>
          <img src='/images/send.png' alt='' />
          전송
        </button>
      </div>
    </div>
  );
}

export default ChatInput;
